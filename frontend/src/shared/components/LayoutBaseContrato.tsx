import { Box, Button, Modal, TablePagination, TextField, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, ContractDTOInsert, LayoutBaseContratoProps, ProductDTO } from "../utils/DTOS";
import React, { useEffect, useState } from "react";
import { TableContract } from "./TableContract";
import { generateReport } from "../utils/Report";
import { getClientById } from "../services/clientService"; // Supondo que você tenha este serviço
import { GenericButton } from "./GenericButton";
import { getAllProducts, getProductByContractId, getProductById } from "../services/productService";
import { SearchField } from "./searchField";
import { createContract, getContractByClientId, removeContract } from "../services/contractService";
import Checkbox from "@mui/material/Checkbox";
import { createPDFContracts } from "../services/pdfContract";
import { PreviewReport } from "./PreviewReport";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const LayoutBaseContrato: React.FC<LayoutBaseContratoProps> = ({ id }) => {
    const [client, setClient] = useState<ClientDTO | null>(null);
    const [contracts, setContracts] = useState<ContractDTO[]>([]);
    const [contractsInsert, setContractsInsert] = useState<ContractDTOInsert>();
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productsClient, setProductsClient] = useState<ProductDTO[]>([]);
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [cmdt, setCmdt] = useState<number | 1>(1);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [selectedProduct, setSelectedProduct] = useState<number>(0);
    const [showReport, setShowReport] = useState<boolean>(false);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setCmdt(1);
        setOpen(false);
    }

    const handleShowReport = () => {
        if (!showReport) {
            setShowReport(true);
        } else {
            setShowReport(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            
            if (id >= 0) {
                try {
                    // Busca dados reais do cliente
                    const clientData = await getClientById(id);
                    setClient(clientData);
                    console.log(clientData)
                    const productData = await getAllProducts();
                    productData.filter(p => p.Prod_Valor > 0);
                    setProducts(productData);
                    console.log(productData)
                    const contractData = await getContractByClientId(id);
                    setContracts(Array.isArray(contractData) ? contractData : [contractData]);
                    
                    const contractsArray = Array.isArray(contractData) ? contractData : [contractData];
                    
                    const productPromises = contractsArray.map(contract => getProductByContractId(contract.ID_Contrato));
                    
                    const productsFromContracts = await Promise.all(productPromises);
                    productsFromContracts.forEach(productData => {
                        if (productData != null) {
                            setProductsClient(prevProducts => [...prevProducts, ...(Array.isArray(productData) ? productData : [productData])]);
                        }
                    });
                } catch (err) {
                    console.error("Erro ao buscar dados:", err);
                }
            }
        };
        fetchData();
    }, []); 

    useEffect(() => {
        console.log("Products: ", productsClient)
    }, [productsClient]);

    useEffect(() => {
        console.log("Contracts: ", contracts);
    }, [contracts]);

    useEffect(() => {
        try {
            const fetchDataContInsert = async () => {
                const contractData = await getContractByClientId(id);
                setContracts(Array.isArray(contractData) ? contractData : [contractData]);
                if (contractsInsert && contractsInsert.Cont_ID_Prod !== undefined) {
                const productData = await getProductById(contractsInsert.Cont_ID_Prod);
                if (productData != null) {
                    if (productsClient.map(p => p.ID_Prod).includes(productData.ID_Prod)) {
                        setProductsClient(prevProducts => prevProducts.map(p => p.ID_Prod === productData.ID_Prod ? productData : p));
                    } else {
                        setProductsClient(prevProducts => [...prevProducts, ...(Array.isArray(productData) ? productData : [productData])]);
                    }
                }
                }
            };
            fetchDataContInsert();
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        }
        
    }, [contractsInsert]);


    const createReport = async (client: ClientDTO, contracts: ContractDTO[], productsClient: ProductDTO[]) => {
        try {
            handleShowReport();
            // await createPDFContracts({ PDF_Client_Id: client.id, PDF_Status: 0 });
            // generateReport(client, contracts, productsClient);
        } catch (error) {
            console.error("Erro ao criar PDF:", error);
        }
    }

    const handleAddProduct = (productId: number, cmdt: number) => {
        setProductsClient(currentProducts =>
            currentProducts.map(p => {
                if (p.ID_Prod === productId && p.Prod_Qtde < cmdt && p.Prod_Qtde < p.Prod_Estoque) {
                    const newQuantity = p.Prod_Qtde + 1;
                    // Retorna um NOVO objeto (imutabilidade)
                    return { ...p, Prod_Qtde: newQuantity, Prod_ValorTotal: newQuantity * p.Prod_Valor };
                }
                return p;
            })
        );
    };

    const handleRemoveProduct = (productId: number) => {
        setProductsClient(currentProducts =>
            currentProducts.map(p => {
                if (p.ID_Prod === productId && p.Prod_Qtde > 0) {
                    const newQuantity = p.Prod_Qtde - 1;
                    return { ...p, Prod_Qtde: newQuantity, Prod_ValorTotal: newQuantity * p.Prod_Valor };
                }
                return p;
            })
        );
    };
    
    const handleRemoveContract = (contractId: number, productId: number) => {
        setContracts(currentContracts => currentContracts.filter(c => c.ID_Contrato !== contractId));
        setProductsClient(currentProducts => currentProducts.filter(p => p.ID_Prod !== productId));
        try {
            removeContract(contractId);
        } catch (err) {
            console.error("Erro ao remover contrato:", err);
        }
        // api.delete(`/contratos/${contractId}`);
    };

    const handleInsertContract = (productId: number, cmdt: number) => {
        const newContract: ContractDTOInsert = {
            Cont_ID_Cli: client?.id || 0,
            Cont_ID_Prod: productId,
            Cont_Comodato: cmdt
        };

        setContractsInsert(newContract);
        try {
        createContract(newContract);
        } catch(err) {
            console.error("Erro ao criar contrato:", err);
        }
        handleClose();
    };

    const filteredProduct = products.filter(product =>
        product.Prod_CodProduto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box padding={10}>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Adicionar Novo Produto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} />

                    {/* <TextField variant="filled"  label="Código do Produto" name="codigoProduto" required placeholder="Digite o código do produto" fullWidth sx={{ marginBottom: 2 }}/> */}
                    <SearchField onSearchChange={setSearchTerm} />
                    <Box sx={{ maxHeight: "20vh", overflowY: "scroll", marginTop: 2 }}>
                        {filteredProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <Box key={product.ID_Prod} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #ccc' }}>
                                <Checkbox
                                    checked={product.ID_Prod === selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.checked ? product.ID_Prod : 0)}
                                    sx={{ width: '9%', color: 'grey' }}
                                    color="secondary"
                                />
                                <Typography width={"90%"}>{product.Prod_Nome} || R${product.Prod_Valor}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <TablePagination
                        component="div"
                        count={filteredProduct.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[3, 7, 12]}
                    />
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={2}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"60%"} height={"100%"}>
                            <Typography component="label" htmlFor={`quantity`} variant="h6">
                                Comodato:
                            </Typography>
                            <TextField
                                id={`quantity`}
                                name={`quantity`}
                                variant="outlined"
                                value={cmdt}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setCmdt(isNaN(value) ? 1 : value);
                                }}
                                inputProps = {{ style: { padding: "8px" } }}
                            />
                        </Box>
                        <Box width={"40%"} display={"flex"} justifyContent={"center"} height={"100%"} gap={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleInsertContract(selectedProduct, cmdt)}
                            >
                                <Typography variant="h6" fontSize={16}> Adicionar</Typography>
                            </Button>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                <Typography variant="h6" fontSize={16}>Voltar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Editar Produto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} />
                    <Box sx={{ maxHeight: "20vh", overflowY: "scroll", marginTop: 2 }}>
                        <Typography>Valor do novo comodato:</Typography>
                        <TextField variant="outlined" value={cmdt} onChange={(e) => setCmdt(Number(e.target.value))} />
                    </Box>
                    <TablePagination
                        component="div"
                        count={filteredProduct.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                    />
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={2}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} width={"60%"} height={"100%"}>
                            <Typography component="label" htmlFor={`quantity`} variant="h6">
                                Comodato:
                            </Typography>
                            <TextField
                                id={`quantity`}
                                name={`quantity`}
                                variant="outlined"
                                value={cmdt}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setCmdt(isNaN(value) ? 1 : value);
                                }}
                                inputProps = {{ style: { padding: "8px" } }}
                            />
                        </Box>
                        <Box width={"40%"} display={"flex"} justifyContent={"center"} height={"100%"} gap={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleInsertContract(selectedProduct, cmdt)}
                            >
                                <Typography variant="h6" fontSize={16}> Adicionar</Typography>
                            </Button>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                <Typography variant="h6" fontSize={16}>Voltar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal> */}
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
                        {client?.cli_razaoSocial ? `Contrato de ${client.cli_razaoSocial}` : "Carregando Contrato..."}
            </Typography>
            {!showReport && (
                <Box>
                    <TableContract
                        client={client}
                        contracts={contracts}
                        products={productsClient}
                        onAddProduct={handleAddProduct}    
                        onRemoveProduct={handleRemoveProduct}
                        onRemoveContract={handleRemoveContract}
                    />
                
                    <Box display={"flex"} alignItems="center" justifyContent="center" gap={2} mt={4}>
                        <Button variant="contained" color="primary" sx={{ padding: "15px" }} onClick={handleOpen}>
                            <Typography variant="h6">Adicionar Produto</Typography>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ padding: "15px" }}
                            onClick={() => client && createReport(client, contracts, productsClient)}
                            disabled={!client}
                        >
                            <Typography variant="h6">Prévia Relatório</Typography>
                        </Button>
                        <GenericButton name="Voltar" type="button" link="/visualizar-clientes" />
                    </Box>
                </Box>
            )}
            {showReport && client && (
                <Box>
                    <PreviewReport client={client} contracts={contracts} products={productsClient} />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: "15px" }}
                        onClick={() => client && createReport(client, contracts, productsClient)}
                        disabled={!client}
                    >
                        <Typography variant="h6">Ocultar Relatório</Typography>
                    </Button>
                </Box>
            )}
        </Box>
    );
};
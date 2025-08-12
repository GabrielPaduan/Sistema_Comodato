import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, ContractDTOInsert, LayoutBaseContratoProps, ProductDTO } from "../utils/DTOS";
import React, { useEffect, useState } from "react";
import { TableContract } from "./TableContract";
import { generateReport } from "../utils/Report";
import { getClientById } from "../services/clientService"; // Supondo que você tenha este serviço
import { GenericButton } from "./GenericButton";
import { getAllProducts, getProductByContractId, getProductById } from "../services/productService";
import { SearchField } from "./searchField";
import { createContract, getContractByClientId } from "../services/contractService";
import { api } from "../services";

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
    const [cmdt, setCmdt] = useState<number | 0>(0);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        const fetchData = async () => {
            
            if (id >= 0) {
                try {
                    // Busca dados reais do cliente
                    const clientData = await getClientById(id);
                    setClient(clientData);
                    console.log(clientData)
                    const productData = await getAllProducts();
                    setProducts(productData);
                    console.log(productData)
                    const contractData = await getContractByClientId(id);
                    setContracts(Array.isArray(contractData) ? contractData : [contractData]);
                    for (const contract of Array.isArray(contractData) ? contractData : [contractData]) {
                        const productData = await getProductByContractId(contract.ID_Contrato);
                        if (productData != null) {
                            if (productsClient.map(p => p.ID_Prod).includes(productData.ID_Prod)) {
                                setProductsClient(prevProducts => prevProducts.map(p => p.ID_Prod === productData.ID_Prod ? productData : p));
                            } else {
                                setProductsClient(prevProducts => [...prevProducts, ...(Array.isArray(productData) ? productData : [productData])]);
                            }
                        }
                    }
                } catch (err) {
                    console.error("Erro ao buscar dados:", err);
                }
            }
        };
        fetchData();
    }, [id]); // Executa sempre que o ID mudar

    useEffect(() => {
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
    }, [contractsInsert]);

    useEffect(() => {
        console.log("Products Client: ", productsClient);
    }, [productsClient]);

    // FUNÇÕES DE LÓGICA AGORA VIVEM NO PAI
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
        api.delete(`/contratos/${contractId}`);
    };

    const handleInsertContract = (productId: number, cmdt: number) => {
        const newContract: ContractDTOInsert = {
            Cont_ID_Cli: client?.id || 0,
            Cont_ID_Prod: productId,
            Cont_Comodato: cmdt
        };

        setContractsInsert(newContract);
        createContract(newContract);
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
                        {filteredProduct.map((product) => (
                            <Box key={product.ID_Prod} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #ccc' }}>
                                <Typography width={"50%"}>{product.Prod_Nome} - {product.Prod_Valor}</Typography>
                                <TextField
                                    inputProps={{ min: 0 }}
                                    placeholder="Comodato"
                                    id={`quantity-${product.ID_Prod}`}
                                    name={`quantity-${product.ID_Prod}`}
                                    sx={{ width: '29%' }}
                                    variant="outlined"
                                    type="number"
                                    value={cmdt}
                                    onChange={(e) => setCmdt(Number(e.target.value))}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleInsertContract(product.ID_Prod, cmdt)}
                                    sx={{ width: '19%' }} // Ajuste a largura do botão conforme necessário
                                >
                                    Adicionar
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Modal>
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
                        {client?.cli_razaoSocial ? `Contrato de ${client.cli_razaoSocial}` : "Carregando Contrato..."}
                    </Typography>
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
                    onClick={() => client && generateReport(client, contracts, productsClient)}
                    disabled={!client}
                >
                    <Typography variant="h6">Gerar Relatório</Typography>
                </Button>
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
};
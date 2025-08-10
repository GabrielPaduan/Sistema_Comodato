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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                    // AQUI VOCÊ DEVERIA BUSCAR OS CONTRATOS E PRODUTOS REAIS DO CLIENTE
                    // Por enquanto, usaremos os dados mockados
                    const contractData = await getContractByClientId(id);
                    setContracts(Array.isArray(contractData) ? contractData : [contractData]);
                } catch (err) {
                    console.error("Erro ao buscar dados:", err);
                }
            }
        };
        fetchData();
    }, [id]); // Executa sempre que o ID mudar

    useEffect(() => {
        const fetchData = async () => {
            const contractData = await getContractByClientId(id);
            setContracts(Array.isArray(contractData) ? contractData : [contractData]);
            for (const contract of contracts) {
                const productData = await getProductByContractId(contract.ID_Contrato);
                setProducts(Array.isArray(productData) ? productData : [productData]);
                console.log("Products for contract:", productData);
            }
        };
        fetchData();
    }, [contractsInsert]);

    useEffect(() => {
        console.log("New contracts: ", contracts)
    }, [contracts]);

    // FUNÇÕES DE LÓGICA AGORA VIVEM NO PAI
    const handleAddProduct = (productId: number, cmdt: number) => {
        setProducts(currentProducts =>
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
        setProducts(currentProducts =>
            currentProducts.map(p => {
                if (p.ID_Prod === productId && p.Prod_Qtde > 0) {
                    const newQuantity = p.Prod_Qtde - 1;
                    return { ...p, Prod_Qtde: newQuantity, Prod_ValorTotal: newQuantity * p.Prod_Valor };
                }
                return p;
            })
        );
    };
    
    const handleRemoveContract = (contractId: number) => {
        setContracts(currentContracts => currentContracts.filter(c => c.ID_Contrato !== contractId));
    };

    const handleInsertContract = (productId: number) => {
        const newContract: ContractDTOInsert = {
            Cont_ID_Cli: client?.id || 0,
            Cont_ID_Prod: productId,
            Cont_Comodato: 1
        };

        setContractsInsert(newContract);
        console.log("Inserting contract:", newContract);
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
                    <Box sx={{ maxHeight: "10vh", overflowY: "scroll", marginTop: 2 }}>
                        {filteredProduct.map((product) => (
                            <Box key={product.ID_Prod} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderBottom: '1px solid #ccc' }}>
                                <Typography>{product.Prod_Nome} - {product.Prod_Valor}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleInsertContract(product.ID_Prod)}
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
                products={products}
                onAddProduct={handleAddProduct}    // Passa a função para o filho
                onRemoveProduct={handleRemoveProduct} // Passa a função para o filho
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
                    onClick={() => client && generateReport(client, contracts, products)}
                    disabled={!client}
                >
                    <Typography variant="h6">Gerar Relatório</Typography>
                </Button>
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
};
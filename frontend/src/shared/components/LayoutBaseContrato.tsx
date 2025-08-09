import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, LayoutBaseContratoProps, ProductDTO } from "../utils/DTOS";
import React, { useEffect, useState } from "react";
import { TableContract } from "./TableContract";
import { generateReport } from "../utils/Report";
import { getClientById } from "../services/clientService"; // Supondo que você tenha este serviço
import { GenericButton } from "./GenericButton";
import { getAllProducts } from "../services/productService";

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
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [open, setOpen] = React.useState(false);
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
                    setContracts([
                        { ID_Contrato: 1, Cont_ID_Cli: id, Cont_ID_Prod: 3, Cont_Comodato: 5 },
                        { ID_Contrato: 2, Cont_ID_Cli: id, Cont_ID_Prod: 4, Cont_Comodato: 3 }
                    ]);
                } catch (err) {
                    console.error("Erro ao buscar dados:", err);
                }
            }
        };
        fetchData();
    }, [id]); // Executa sempre que o ID mudar

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

                    <TextField variant="filled" label="Nome do Produto" name="nomeProduto" required placeholder="Digite o nome do produto" fullWidth sx={{ marginBottom: 2, '& .MuiInputBase-input::placeholder': {
                        color: '#000000ff',
                        opacity: 1,
                    }, }}/>
                    <Button>
                        <Typography>Adicionar</Typography>
                    </Button>   
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
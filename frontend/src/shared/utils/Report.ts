import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS"; // Verifique o caminho dos seus DTOs
import logo from '../assets/logo_empresa.jpg' // <-- 1. IMPORTE SUA LOGO AQUI (ex: de uma pasta 'assets')

export const generateReport = (client: ClientDTO, contracts: ContractDTO[], products: ProductDTO[]) => {
    const doc = new jsPDF();
    const margin = 10;
    let y = 0;

    // --- SEÇÃO DO CABEÇALHO (Reescrita) ---
    y = margin;
    doc.setDrawColor(0);
    doc.rect(margin, y, 190, 40, 'D'); // x, y, width, height

    // Coluna da Esquerda do Cabeçalho
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("Responsável:", margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_responsavel, margin + 28, y);

    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text(`${client.cli_typeDoc == 1 ? 'CPF' : 'CNPJ'}:`, margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_doc, margin + 15, y);

    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text("Endereço:", margin + 5, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_end, margin + 22, y);

    // Coluna da Direita do Cabeçalho
    y = margin + 8; // Reset Y para alinhar
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("Razão Social:", 120, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_razaoSocial, 145, y);

    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text("Nome Fantasia:", 120, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_nomeFantasia, 148, y);

    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text("Telefone:", 120, y);
    doc.setFont('helvetica', 'normal');
    const telefone = client.cli_telCelular || client.cli_telFixo || 'N/A';
    doc.text(telefone, 138, y);

    // Pula para depois do cabeçalho
    y = 50 + margin + 10; 

    // --- SEÇÃO DO TÍTULO DA TABELA ---
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('INFORMAÇÕES DO CONTRATO', doc.internal.pageSize.width / 2, y, { align: 'center' });
    y += 10;

    // --- SEÇÃO DA TABELA (Ajustada) ---
    const tableColumn = ["CMDT", "PRODUTOS", "VALOR UNITÁRIO", "QUANTIDADE", "VALOR TOTAL"];
    const tableRows = contracts.map((contract) => {
        const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
        const qtde = product?.Prod_Qtde ?? 0;
        const valor = product?.Prod_Valor ?? 0;
        const valorTotal = qtde * valor;
        return [
            contract.Cont_Comodato,
            product?.Prod_Nome ?? 'Produto não encontrado',
            `R$ ${valor.toFixed(2)}`,
            qtde,
            `R$ ${valorTotal.toFixed(2)}`
        ];
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: y,
        theme: 'striped', // <-- 2. MUDADO PARA 'striped' PARA TER LINHAS ZEBRADAS
        styles: { fontSize: 10, halign: 'center', valign: 'middle' },
        headStyles: { fillColor: [0, 150, 136], textColor: [255, 255, 255], fontStyle: 'bold' },
    });

    // Pega a posição final da tabela para começar o rodapé
    const finalY = (doc as any).lastAutoTable.finalY;

    // --- SEÇÃO DO RODAPÉ (Nova) ---
    y = finalY + 20;

    // 3. Adiciona a logo
    // A variável 'logo' foi importada no topo do arquivo
    doc.addImage(logo, 'PNG', margin + 5, y, 40, 40); // (imagem, tipo, x, y, largura, altura)

    // 4. Calcula o valor total geral
    const valorTotalGeral = contracts.reduce((sum, contract) => {
        const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
        const qtde = product?.Prod_Qtde ?? 0;
        const valor = product?.Prod_Valor ?? 0;
        return sum + (qtde * valor);
    }, 0);

    // Adiciona os textos do rodapé
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data: ${formattedDate}`, 70, y + 5);
    doc.text(`Valor Total: R$ ${valorTotalGeral.toFixed(2)}`, 70, y + 10);
    doc.text("Tiago Cernev Neves | (43) 98488-0539", 70, y + 15);
    doc.text("Orcose | PR | reidooleodistribuidora@gmail.com", 70, y + 20);

    // --- SALVAR O ARQUIVO ---
    doc.save(`relatorio-${client.cli_nomeFantasia.replace(/\s+/g, '-')}.pdf`);
}
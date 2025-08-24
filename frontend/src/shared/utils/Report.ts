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
    doc.rect(margin, y, 190, 50, 'D'); // x, y, width, height

    // Coluna da Esquerda do Cabeçalho

    y = margin + 10; // Reset Y para alinhar
    doc.setFont('helvetica', 'bold');
    doc.text(client.cli_razaoSocial ? client.cli_razaoSocial : "Razão Social não informada!", 25, y+5);

    y += 14;
    doc.setFont('helvetica', 'bold');
    doc.text(client.cli_end ? client.cli_end : "Endereço não informado!", margin + 15, y);

    y += 9;
    doc.setFont('helvetica', 'bold');
    doc.text(client.cli_cidade ? `${client.cli_cidade} ${client.cli_uf}` : "Cidade não informada!", margin + 15, y);

     // Reset Y para alinhar
    doc.setFont('helvetica', 'bold');
    doc.text(client.cli_email ? client.cli_email : "Email não informado!", margin + 15, y + 9);

    doc.addImage(logo, 'PNG', 155, y - 27.5, 40, 40); // (imagem, tipo, x, y, largura, altura)


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

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Data: ${formattedDate}`, 10, y + 5);
    doc.setFontSize(14);
    doc.text(`Valor Total: R$ ${valorTotalGeral.toFixed(2)}`, 100, y + 10);

    doc.setFontSize(12);
    doc.text("Tiago Cernev Neves | (43) 98488-0539", 10, y + 20);
    doc.text("Orcose | PR | reidooleodistribuidora@gmail.com", 10, y + 30);

    // --- SALVAR O ARQUIVO ---
    doc.save(`relatorio-${client.cli_razaoSocial.replace(/\s+/g, '-')}.pdf`);
}
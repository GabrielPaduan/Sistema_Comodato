import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS"; // Verifique se o caminho está correto

// Função principal que gera o relatório
export const generateReport = (client: ClientDTO, contracts: ContractDTO[], products: ProductDTO[]) => {
    const doc = new jsPDF();
    const margin = 10;
    let y = 0; // Começamos a contar a posição y a partir do topo

    // --- SEÇÃO DO CABEÇALHO ---
    y += margin;
    doc.setDrawColor(0);
    doc.rect(10, y, 190, 40, 'D'); // x, y, width, height

    y += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(client.cli_nomeFantasia, 120, y, { align: 'center' });

    y += 11;
    doc.setFontSize(14);
    doc.setFont('times', 'italic');
    doc.text(client.cli_responsavel, 120, y, { align: 'center' });
    
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cli_doc, 120, y, { align: 'center' });
    
    y += 7;
    const telefone = client.cli_telCelular || client.cli_telFixo || 'N/A';
    doc.text(telefone, 120, y, { align: 'center' });
    
    // Pula para depois do cabeçalho
    y = 50 + margin * 2; 

    // --- SEÇÃO DO TÍTULO DA TABELA ---
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('INFORMAÇÕES DO CONTRATO', doc.internal.pageSize.width / 2, y, { align: 'center' });
    y += 10;

    // --- SEÇÃO DA TABELA ---
    const tableColumn = ["CMDT", "PRODUTOS", "VALOR UNITÁRIO", "QUANTIDADE", "VALOR TOTAL"];
    const tableRows: (string | number)[][] = contracts.map((contract) => {
        const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
        return [
            contract.Cont_Comodato,
            product?.Prod_Nome ?? 'Produto não encontrado',
            `R$ ${(product?.Prod_Valor ?? 0).toFixed(2)}`,
            product?.Prod_Qtde ?? 0,
            `R$ ${(product?.Prod_ValorTotal ?? 0).toFixed(2)}`
        ];
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: y,
        margin: { left: margin, right: margin },
        theme: 'grid',
        styles: { fontSize: 10, halign: 'center' },
        headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontStyle: 'bold' },
        didDrawPage: (data) => {
            if (tableRows.length === 0) {
                doc.text('Nenhum item de contrato para exibir.', data.settings.margin.left, y + 10);
            }
        }
    });

    // --- SALVAR O ARQUIVO ---
    doc.save(`relatorio-${client.cli_nomeFantasia.replace(/\s+/g, '-')}.pdf`);
}
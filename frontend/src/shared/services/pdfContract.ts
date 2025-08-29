import { PdfStructCompleteDTO, PdfStructDTO, PdfStructInsertDTO } from "../utils/DTOS";
import api from "./api";

export const getAllPDFContracts = async (): Promise<PdfStructDTO[]> => {
  const response = await api.get('/pdfContratos');
  return response.data; 
};

export const createPDFContracts = async (pdfData: PdfStructInsertDTO): Promise<PdfStructInsertDTO> => {
  const response = await api.post('/pdfContratos', pdfData);
  return response.data;
};

export const updatePdf = async (id: number, pdfData: PdfStructDTO): Promise<PdfStructDTO> => {
  const response = await api.put(`/pdfContratos/${id}`, pdfData);
  return response.data;
};

export const getPdfByClientId = async (clientId: number): Promise<PdfStructDTO | null> => {
   const response = await api.get(`/pdfContratos/client/${clientId}`);
   return response.data;
}

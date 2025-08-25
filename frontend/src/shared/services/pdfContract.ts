import { PdfStructDTO, PdfStructInsertDTO } from "../utils/DTOS";
import api from "./api";

export const getAllPDFContracts = async (): Promise<PdfStructDTO[]> => {
  const response = await api.get('/pdfContratos');
  return response.data; 
};

export const createPDFContracts = async (pdfData: PdfStructInsertDTO): Promise<PdfStructInsertDTO> => {
  const response = await api.post('/pdfContratos', pdfData);
  return response.data;
};

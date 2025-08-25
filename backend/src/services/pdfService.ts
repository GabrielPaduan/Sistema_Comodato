import supabase from "../config/supabase.js";
import type { PdfStructDTO, PdfStructInsertDTO } from "../types/dtos.js";

export const getAllPdfs = async (): Promise<PdfStructDTO[]> => {
  const { data, error } = await supabase.from("ContratosPDF").select("*");
  if (error) throw error;
  return data;
};

export const createPdf = async (pdfData: PdfStructInsertDTO) => {
  const { data, error } = await supabase.from("ContratosPDF").insert(pdfData).select();
  if (error) throw error;
  return data;
};

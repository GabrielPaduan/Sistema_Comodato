import * as pdfService from "../services/pdfService.js"
import express from "express"

export const getPdfs = async (req: express.Request, res: express.Response) => {
  try {
    const pdfs = await pdfService.getAllPdfs();
    res.status(200).json(pdfs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createPdf = async (req: express.Request, res: express.Response) => {
  try {
    const newPdf = await pdfService.createPdf(req.body);
    res.status(201).json(newPdf);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

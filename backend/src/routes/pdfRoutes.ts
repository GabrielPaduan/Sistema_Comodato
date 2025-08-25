import express from "express"
import { createPdf, getPdfs } from "../controllers/pdfController.js";

const router = express.Router()

router.get("/", getPdfs);
router.post("/", createPdf);

export default router;
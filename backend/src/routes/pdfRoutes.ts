import express from "express"
import { createPdf, getPdfByClientId, getPdfs, updatePdf } from "../controllers/pdfController.js";

const router = express.Router()

router.get("/", getPdfs);
router.post("/", createPdf);
router.put("/:id", updatePdf);
router.get("/client/:clientId", getPdfByClientId);

export default router;
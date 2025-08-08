import express from 'express';
import { getAllContracts, createContract } from '../controllers/contractController.js';

const router = express.Router();

router.get('/', getAllContracts);
router.post('/', createContract);
// router.get('/:id', getClientById);
// router.put('/:id', updateClient);
// router.delete('/:id', deleteClient);

export default router;
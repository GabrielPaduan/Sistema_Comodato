import express from 'express';
import { getAllContracts, createContract, getContractByClientId, removeContract, updateContract } from '../controllers/contractController.js';

const router = express.Router();

router.get('/', getAllContracts);
router.post('/', createContract);
router.get('/:id', getContractByClientId);
router.put('/:id/:cmdt', updateContract);
router.delete('/:id', removeContract);

export default router;
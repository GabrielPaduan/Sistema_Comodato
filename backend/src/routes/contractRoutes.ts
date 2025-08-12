import express from 'express';
import { getAllContracts, createContract, getContractByClientId, removeContract } from '../controllers/contractController.js';

const router = express.Router();

router.get('/', getAllContracts);
router.post('/', createContract);
router.get('/:id', getContractByClientId);
// router.put('/:id', updateClient);
router.delete('/:id', removeContract);

export default router;
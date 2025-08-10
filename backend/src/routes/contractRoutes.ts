import express from 'express';
import { getAllContracts, createContract, getContractByClientId } from '../controllers/contractController.js';
import { get } from 'http';

const router = express.Router();

router.get('/', getAllContracts);
router.post('/', createContract);
router.get('/:id', getContractByClientId);
// router.put('/:id', updateClient);
// router.delete('/:id', deleteClient);

export default router;
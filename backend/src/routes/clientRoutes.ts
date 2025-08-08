import express from 'express';
import { getAllClients, createClient } from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);
// router.get('/:id', getClientById);
// router.put('/:id', updateClient);
// router.delete('/:id', deleteClient);

export default router;
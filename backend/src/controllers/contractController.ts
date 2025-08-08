import express from 'express';
import * as contractService from '../services/contractService.js';

export const getAllContracts = async (req: express.Request, res: express.Response) => {
    try {
        const contracts = await contractService.findAllContracts();
        res.status(200).json(contracts);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createContract = async (req: express.Request, res: express.Response) => {
    try {
        const newContract = await contractService.createNewContract(req.body);
        res.status(201).json(newContract);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
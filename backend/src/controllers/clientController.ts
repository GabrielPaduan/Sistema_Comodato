import express from 'express';
import * as clientService from '../services/clientService.js';

export const getAllClients = async (req: express.Request, res: express.Response) => {
    try {
        const clients = await clientService.findAllClients();
        res.status(200).json(clients);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createClient = async (req: express.Request, res: express.Response) => {
    try {
        const newClient = await clientService.createNewClient(req.body);
        res.status(201).json(newClient);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
import express from 'express';
import * as productService from '../services/productService.js';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await productService.findAllProduct();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        const newProduct = await productService.createNewProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
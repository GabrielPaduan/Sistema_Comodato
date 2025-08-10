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

export const getProductByContractId = async (req: express.Request, res: express.Response) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Contract ID is required" });
        }
        const product = await productService.findProductByContractId(Number(req.params.id));
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
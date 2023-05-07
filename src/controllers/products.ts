import { Request, Response } from "express";
import { createProduct, getProduct, getProducts } from "../services/products";

export const createProd = async (req: Request, res: Response) => {
  try {
    res.send(await createProduct(req.body.product));
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    res.send(await getProducts(Number(limit), Number(offset)));
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id, 10) || 0;
    res.send(await getProduct(productId));
  } catch (e) {
    res.status(400).send(e);
  }
};

// Below functions' implementations are left out due to scope limitation
export const updateOneProduct = async (req: Request, res: Response) => {};

export const deleteOneProduct = async (req: Request, res: Response) => {};

export const searchProducts = async (req: Request, res: Response) => {};

import { Request, Response } from "express";
import {
  createCustomer,
  getCustomer,
  getCustomers,
} from "../services/customer";

export const getAllCustomers = async (req: Request, res: Response) => {
  res.send(await getCustomers());
};

export const getOneCustomer = async (req: Request, res: Response) => {
  const customerId = parseInt(req.params.id, 10) || 0;
  res.send(await getCustomer(customerId));
};

export const createNewCustomer = async (req: Request, res: Response) => {
  res.send(await createCustomer(req.body.customer));
};

// Below functions' implementations are left out due to scope limitation
export const updateOneCustomer = async (req: Request, res: Response) => {};

export const deleteOneCustomer = async (req: Request, res: Response) => {};

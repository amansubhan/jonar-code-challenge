import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../services/order";
import { Request, Response } from "express";
import { getCustomer } from "../services/customer";

export const getAllOrders = async (req: Request, res: Response) => {
  res.send(await getOrders());
};

export const getOneOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10) || 0;
  res.send(await getOrder(orderId));
};

export const createNewOrder = async (req: Request, res: Response) => {
  const order = req.body.order;
  try {
    // Guard clauses
    if (!order)
      return res.status(400).send({ error: "Order information is required" });
    if (!order.orderDetail)
      return res.status(400).send({ error: "Order details are required" });
    if (!order.customerId)
      return res.status(400).send({ error: "Customer is required" });

    const customer = await getCustomer(Number(order.customerId));
    if (!customer) return res.status(400).send({ error: "Customer not found" });

    return res.send(await createOrder(order));
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const updateOneOrder = async (req: Request, res: Response) => {
  const order = req.body.order;
  if (!order) res.status(400).send({ error: "order body is required" });
  try {
    res.send(await updateOrder(order.id, order));
  } catch (e) {
    res.status(400).send(e);
  }
};

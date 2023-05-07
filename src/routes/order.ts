import { Router } from "express";
import {
  createNewOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
} from "../controllers/order";

export const router = Router();

router.put("/", createNewOrder);
router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
router.post("/:id", updateOneOrder);

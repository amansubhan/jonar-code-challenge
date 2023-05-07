import { Router } from "express";
import {
  createNewCustomer,
  deleteOneCustomer,
  getAllCustomers,
  getOneCustomer,
  updateOneCustomer,
} from "../controllers/customer";

export const router = Router();

router.get("/", getAllCustomers);
router.get("/:id", getOneCustomer);
router.put("/", createNewCustomer);

// Below routes are left out due to scope limitation
router.put("/", updateOneCustomer);
router.delete("/", deleteOneCustomer);

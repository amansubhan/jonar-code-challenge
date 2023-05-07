import { Router } from "express";
import {
  createProd,
  deleteOneProduct,
  getAllProducts,
  getOneProduct,
  searchProducts,
  updateOneProduct,
} from "../controllers/products";

export const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.put("/", createProd);

// Below routes are left out due to scope limitation
router.post("/", updateOneProduct);
router.delete("/", deleteOneProduct);
router.post("/search", searchProducts);

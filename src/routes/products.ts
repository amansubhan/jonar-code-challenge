import { Router } from "express";
import { getAll } from "../controllers/products";

export const router = Router();

router.get("/", getAll);

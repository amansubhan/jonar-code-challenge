import { Router } from "express";
import { generateToken } from "../middleware/jwt";

export const router = Router();

router.get("/token", generateToken);

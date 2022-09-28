import {Router as expressRouter} from "express";
import authMiddleware from "../middleware/Auth.js";
import CurrencyController from "../controllers/CurrencyController.js";

const router = expressRouter();

// noinspection JSCheckFunctionSignatures
router.get("/", authMiddleware, CurrencyController.index);

export default router;

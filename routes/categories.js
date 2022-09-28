import {Router as expressRouter} from "express";
import authMiddleware from "../middleware/Auth.js";
import CategoryController from "../controllers/CategoryController.js";

const router = expressRouter();

// noinspection JSCheckFunctionSignatures
router.get("/", authMiddleware, CategoryController.index);

export default router;

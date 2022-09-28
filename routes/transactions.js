// noinspection JSCheckFunctionSignatures

import {Router as expressRouter} from "express";

const router = expressRouter();
import Transaction from "../models/Transaction.js"
import mongoose from "mongoose";
import TransactionController from "../controllers/TransactionController.js";
import authMiddleware from "../middleware/Auth.js";
import CreateTransactionRequest from "../requests/CreateTransactionRequest.js";
import validated from "../utils/validated.js";
import showTransactionRequest from "../requests/ShowTransactionRequest.js";

router.get("/", authMiddleware, TransactionController.index);

router.post("/create", [authMiddleware, CreateTransactionRequest], TransactionController.store);

router.get("/:transactionID", [showTransactionRequest, authMiddleware], TransactionController.show);

// Update
router.put("/:transactionID", [showTransactionRequest, authMiddleware], CreateTransactionRequest, TransactionController.update);

// Delete
router.delete("/:transactionID", [showTransactionRequest, authMiddleware], TransactionController.destroy);

export default router;

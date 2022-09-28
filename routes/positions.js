// noinspection JSCheckFunctionSignatures

import {Router as expressRouter} from "express";

const router = expressRouter();
import Transaction from "../models/Transaction.js"
import mongoose from "mongoose";
import PositionController from "../controllers/PositionController.js";
import authMiddleware from "../middleware/Auth.js";
import CreatePositionRequest from "../requests/CreatePositionRequest.js";
import validated from "../utils/validated.js";

router.get("/", authMiddleware, PositionController.index);

router.post("/create", authMiddleware, CreatePositionRequest, PositionController.store);

router.get("/:positionID", authMiddleware, PositionController.show);

// Update
router.put("/:positionID", authMiddleware, CreatePositionRequest, PositionController.update);

// Delete
router.delete("/:positionID", authMiddleware, PositionController.destroy);

export default router;

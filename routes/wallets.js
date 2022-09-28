import WalletController from "../controllers/WalletController.js";
import {Router as expressRouter} from "express";
import authMiddleware from "../middleware/Auth.js";
import ShowWalletRequest from "../requests/ShowWalletRequest.js";

const router = expressRouter();

// noinspection JSCheckFunctionSignatures
router.get("/", authMiddleware, WalletController.index);

// noinspection JSCheckFunctionSignatures
router.get("/:walletID", [authMiddleware, ShowWalletRequest], WalletController.show);

// noinspection JSCheckFunctionSignatures
router.post("/create", authMiddleware, WalletController.create);

// noinspection JSCheckFunctionSignatures
router.get("/:walletID/transactions", authMiddleware, WalletController.transactions);

// noinspection JSCheckFunctionSignatures
router.get("/:walletID/positions", authMiddleware, WalletController.positions);

// noinspection JSCheckFunctionSignatures
router.patch("/:walletID", authMiddleware, WalletController.update);

// noinspection JSCheckFunctionSignatures
router.delete("/:walletID", authMiddleware, WalletController.destroy);

export default router;

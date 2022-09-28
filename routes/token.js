import {Router as expressRouter} from "express";
import TokenController from "../controllers/TokenController.js";
import RefreshTokenRequest from "../requests/RefreshTokenRequest.js";

const router = expressRouter();

router.post("/refresh", RefreshTokenRequest, TokenController.generateToken);
router.get("/validate", TokenController.validateToken);

export default router;

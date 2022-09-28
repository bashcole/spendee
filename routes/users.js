import {Router as expressRouter} from "express";
import UserController from "../controllers/UserController.js";
import UserRegisterRequest from "../requests/UserRegisterRequest.js";
import UserLoginRequest from "../requests/UserLoginRequest.js";
import UserDeleteRequest from "../requests/UserDeleteRequest.js";
import authMiddleware from "../middleware/Auth.js";

const router = expressRouter();

// noinspection JSCheckFunctionSignatures
router.post("/login", UserLoginRequest, UserController.login);

// noinspection JSCheckFunctionSignatures
router.post("/register", UserRegisterRequest, UserController.register);

// noinspection JSCheckFunctionSignatures
router.delete("/:userID", [authMiddleware, UserDeleteRequest], UserController.destroy);

export default router;
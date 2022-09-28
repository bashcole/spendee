import {Router as expressRouter} from "express";
import SeedController from "../controllers/SeedController.js";
import SeedRequest from "../requests/SeedRequest.js";

const router = expressRouter();

router.post("/reset", SeedRequest, SeedController.reset);

export default router;

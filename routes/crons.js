import {Router as expressRouter} from "express";
import CronController from "../controllers/CronController.js";
import CronRequest from "../requests/CronRequest.js";

const router = expressRouter();

router.get("/sync-crypto-rates", CronRequest, CronController.syncCryptoExchangeRates);
router.get("/sync-fiat-rates", CronRequest, CronController.syncFiatExchangeRates);
router.get("/sync-stock-rates", CronRequest, CronController.syncStockRates);
router.get("/sync-portfolio", CronRequest, CronController.syncPortfolio);

export default router;

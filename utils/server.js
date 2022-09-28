import express from "express";
import cors from "cors";
import donenv from "dotenv";
import seedRoute from "../routes/seed.js";
import cronRoute from "../routes/crons.js";
import walletRoute from "../routes/wallets.js";
import categoryRoute from "../routes/categories.js";
import currencyRoute from "../routes/currencies.js";
import positionRoute from "../routes/positions.js";
import transactionRoute from "../routes/transactions.js";
import tokenRoute from "../routes/token.js";
import userRoute from "../routes/users.js";
import notFound from "../middleware/NotFound.js";
import errorHandler from "../middleware/ErrorHandler.js";

const app = express();
app.use(cors());

donenv.config();
app.use(express.json());
app.set('trust proxy', true)

// noinspection JSCheckFunctionSignatures
app.use("/api/cron", cronRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/seed", seedRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/wallets", walletRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/categories", categoryRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/currencies", currencyRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/transactions", transactionRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/positions", positionRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/users", userRoute);

// noinspection JSCheckFunctionSignatures
app.use("/api/token", tokenRoute);

app.get('/', (req, res) => {
    res.json({'message': 'API is working'})
})

app.use(notFound)
app.use(errorHandler)

const server = app.listen(process.env.PORT || 5001, () => {
    console.log("Backend started...");
});

server.on('close', function() {
    console.log(' Stopping ...');
});

export default server
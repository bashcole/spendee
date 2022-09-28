// @desc    Create a new access token using the refresh token
// @route   POST /api/token/refresh
// @access  Public
import asyncHandler from "express-async-handler";
import Currency from "../models/Currency.js";
import axios from "axios";
import Position from "../models/Position.js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
import {getCoinByID} from "../services/coingecko.js";
import {getCurrencyByCode} from "../services/currency_api.js";
import {getPriceHistoryByTicker} from "../services/alphavantage.js";

const syncPortfolio = asyncHandler(async (req, res) => {

    try {
        const positions = await Position.find()
        for (const position of positions) {
            const currency = await Currency.findOne({ticker: position.currency})
            if (currency) {
                const usdValue = currency.rates.filter(item => item.ticker === "USD")[0]["value"]
                const bgnValue = currency.rates.filter(item => item.ticker === "BGN")[0]["value"]

                console.log(`${position.units} * ${usdValue}`)
                await Position.updateOne({_id: position._id}, {
                    amount: {
                        currency: "USD",
                        value: position.units * usdValue * 100
                    },
                    otherAmount: {
                        currency: "BGN",
                        value: position.units * bgnValue * 100
                    }
                })
            }
        }

        const wallets = await Wallet.find({type: "portfolio"})
        for (const wallet of wallets) {
            let aggregate = await Position.aggregate([
                {
                    $match: {
                        walletID: mongoose.Types.ObjectId(wallet._id)
                    }
                },
                {
                    $group: {
                        _id: null,
                        "USD": {
                            "$sum": "$amount.value"
                        },
                        "BGN": {
                            "$sum": "$otherAmount.value"
                        }
                    }
                },
                {
                    $project: {
                        USD: 1, BGN: 1, _id: 0
                    }
                }
            ])

            if (aggregate.length === 0) {
                aggregate = [{
                    "USD": 0,
                    "BGN": 0
                }
                ]
            }

            const statistics = aggregate[0]
            const result = await Wallet.updateOne({_id: wallet._id}, {
                balance: statistics.USD,
                "otherCurrency.balance": statistics.BGN
            })

        }

        res.json({code: 200, message: 'Successfully syncing of portfolio'})
    } catch (e) {
        res.json({
            "message": e.message
        })
    }

})

const syncCryptoExchangeRates = asyncHandler(async (req, res) => {
    try {
        const usd = await Currency.findOne({ticker: "USD"}, {_id: 0, rates: {$elemMatch: {ticker: "BGN"}}})

        const cryptoCurrencies = await Currency.find({type: "crypto"})
        for (const currency of cryptoCurrencies) {
            const data = await getCoinByID(currency.coin_id)
            const usdRate = data["market_data"]["current_price"]["usd"]
            const result = await Currency.updateOne({_id: currency._id}, {
                rates: [
                    {
                        ticker: "USD",
                        value: usdRate
                    },
                    {
                        ticker: "BGN",
                        value: usdRate * usd["rates"][0]["value"]
                    }
                ]
            })
        }
        res.json({code: 200, message: 'Successfully syncing of crypto exchange rates'})
    } catch (e) {
        res.json({
            "message": e.message
        })
    }
})

const syncFiatExchangeRates = asyncHandler(async (req, res) => {
    try {
        const fiatCurrencies = await Currency.find({type: "fiat"})
        for (const currency of fiatCurrencies) {
            const data = await getCurrencyByCode(currency.ticker)
            const rates = data[currency.ticker.toLowerCase()]
            const result = []
            if (typeof data["date"] !== "string") {
                break;
            }
            for (const [ticker, value] of Object.entries(rates)) {
                result.push({
                    ticker: ticker.toUpperCase(),
                    value
                })
            }

            await Currency.updateOne({_id: currency._id}, {
                rates: result
            })
        }

        res.json({code: 200, message: 'Successfully syncing of fiat exchange rates'})
    } catch (e) {
        res.json({
            "message": e.message
        })
    }
})

const syncStockRates = asyncHandler(async (req, res) => {
    try {
        const fiatCurrencies = await Currency.find({type: "stock"})
        const usd = await Currency.findOne({ticker: "USD"}, {_id: 0, rates: {$elemMatch: {ticker: "BGN"}}})

        for (const currency of fiatCurrencies) {
            const data = await getPriceHistoryByTicker(currency.ticker)

            if (typeof data["Meta Data"]["3. Last Refreshed"] !== "string") {
                break;
            }
            const lastRefreshed = data['Meta Data']['3. Last Refreshed']
            const interval = data['Meta Data']['4. Interval']
            const rate = data[`Time Series (${interval})`][lastRefreshed]['4. close']

            const result = await Currency.updateOne({_id: currency._id}, {
                rates: [
                    {
                        ticker: "USD",
                        value: rate
                    },
                    {
                        ticker: "BGN",
                        value: rate * usd["rates"][0]["value"]
                    }
                ]
            })

        }

        res.json({code: 200, message: 'Successfully syncing of stock rates'})
    } catch (e) {
        res.json({
            "message": e.message
        })
    }
})

export default {
    syncFiatExchangeRates,
    syncCryptoExchangeRates,
    syncStockRates,
    syncPortfolio
}
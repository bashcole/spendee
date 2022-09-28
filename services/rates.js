import axios from "axios"
import Currency from "../models/Currency.js";
import connectDB from "../config/database.js";
import dotenv from "dotenv";

dotenv.config()

connectDB().then(r => console.log(r))

export const parse = async () => {

    try {
        // const fiatCurrencies = await Currency.find({type: "fiat", ticker: "BGN"})
        const fiatCurrencies = await Currency.find({type: "fiat"})
        for (const currency of fiatCurrencies) {
            const {data} = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.ticker.toLowerCase()}.json`)

            const result = await Currency.updateOne({_id: currency._id}, {
                rates: data[currency.ticker.toLowerCase()]
            })

        }
        console.log('Fiat Exchange rates synced'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(`${e}`.red.inverse)
        process.exit(1)
    }
}

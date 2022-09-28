import axios from "axios";
import donenv from "dotenv";

donenv.config();

export const getPriceHistoryByTicker = async (symbol) => {
    const {data} = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol.toLowerCase()}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
    return data
}
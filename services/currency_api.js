import axios from "axios";

export const getCurrencyByCode = async (code) => {
    const {data} = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${code.toLowerCase()}.json`)
    return data
}
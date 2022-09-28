import axios from "axios";

export const getCoinByID = async (id) => {
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    return data
}
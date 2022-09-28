import {expect} from "chai"
import {getCoinByID} from "../../../services/coingecko.js";

describe('When requesting `bitcoin` info from CoinGecko', () => {

    it('Then USD rate should be a number', async () => {
        const info = await getCoinByID('bitcoin')
        const usdRate = info["market_data"]["current_price"]["usd"]
        expect(usdRate).to.be.a('number');
    })
})
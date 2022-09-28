import {expect} from "chai"
import {getCurrencyByCode} from "../../../services/currency_api.js";

describe('When requesting `BGN` info from Currency-Api', () => {

    it('Then USD rate should be a number', async () => {
        const info = await getCurrencyByCode('eur')
        const usdRate = info["eur"]["usd"]
        expect(usdRate).to.be.a('number');
    })
})
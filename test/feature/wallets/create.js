import {expect} from "chai"
import Wallet from "../../../models/Wallet.js";
import walletService from "../../../services/wallet.js";
import {CreateTestUser, CreateTestWallet} from "../../../utils/test_service.js";

describe('When create a wallet with 100 BGN initial balance', () => {

    it('Then the balance should be 100 BGN', async () => {

        const user = await CreateTestUser()
        const wallet = await walletService.store({
            name: "Wallet",
            currency: "BGN",
            balance: 100
        }, user)

        const findWallet = await Wallet.findById(wallet._id)
        expect(findWallet.balance).to.equal(100);
    })
})

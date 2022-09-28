// noinspection DuplicatedCode

import {expect} from "chai"
import Wallet from "../../../models/Wallet.js";
import {CreateTestUser, CreateTestWallet} from "../../../utils/test_service.js";
import walletService from "../../../services/wallet.js";

describe('Given a wallet with name "Test wallet"', () => {

    describe('When editing the same wallet to have a name "Second wallet"', () => {

        it('Then the wallet name should be "Second wallet"', async () => {

            const user = await CreateTestUser()
            const wallet = await CreateTestWallet(user, 250)

            await walletService.update(wallet._id, user._id, {
                name: "Second wallet"
            })

            const findWallet = await Wallet.findById(wallet._id)
            expect(findWallet.name).to.equal("Second wallet");

        })
    })
})
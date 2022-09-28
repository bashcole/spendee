import User from "../../../models/User.js";
import {expect} from "chai"
import Wallet from "../../../models/Wallet.js";
import transactionService from "../../../services/transaction.js";
import {
    CreateTestCurrency,
    CreateTestUser,
    CreateTestWallet,
    CreateTestWalletOther
} from "../../../utils/test_service.js";

describe('Given a wallets with 50 BGN balance', () => {

    describe('And creating a new transaction of type `expense` with 1000 BGN', () => {

        it('Then the wallets balance should be -150 BGN', async () => {

            const user = await CreateTestUser()
            const wallet = await CreateTestWallet(user, 50)

            await transactionService.store(user, {
                amount: 1000,
                note: "Note...",
                currency: "BGN",
                walletID: wallet._id.toString(),
                createdAt: new Date(),
                category: {
                    id: "6273a1b78d8262e2fd1fc8f5",
                    type: "expense",
                    name: "Food",
                    hex: "#444",
                    icon: "https://icon.com/food.svg"
                }
            })

            const findWallet = await Wallet.findById(wallet._id)
            expect(findWallet.balance).to.equal(-950);
        })
    })
})


describe('Given a wallets with 650 BGN balance', () => {

    describe('And creating a new transaction of type `income` with 420 BGN', () => {

        it('Then the wallets balance should be 1070 BGN', async () => {

            const user = await CreateTestUser()
            const wallet = await CreateTestWallet(user, 650)

            await transactionService.store(user, {
                amount: 420,
                note: "Note...",
                currency: "BGN",
                walletID: wallet._id.toString(),
                createdAt: new Date(),
                category: {
                    id: "6273a1b78d8262e2fd1fc8f5",
                    type: "income",
                    name: "Food",
                    hex: "#444",
                    icon: "https://icon.com/food.svg"
                }
            })

            const findWallet = await Wallet.findById(wallet._id)
            expect(findWallet.balance).to.equal(1070);
        })
    })
})


describe('Given a wallets with 50 USD and 100 BGN balance', () => {

    describe('And creating a new transaction of type `income` with 420 USD', () => {

        it('Then the wallets balance should be 470 USD and 940 BGN', async () => {

            const currency = await CreateTestCurrency({
                ticker: "USD",
                type: "fiat",
                name: "United States dollar",
                symbol: "$",
                symbolPosition: "left",
                rates: [
                    {
                        ticker: "BGN",
                        value: 2
                    }
                ]
            })

            const user = await CreateTestUser()
            const wallet = await CreateTestWalletOther(user, 50, 100, "USD")

            await transactionService.store(user, {
                amount: 420,
                note: "Note...",
                currency: "USD",
                walletID: wallet._id.toString(),
                createdAt: new Date(),
                category: {
                    id: "6273a1b78d8262e2fd1fc8f5",
                    type: "income",
                    name: "Food",
                    hex: "#444",
                    icon: "https://icon.com/food.svg"
                },
                otherCurrency: {
                    currency: "BGN",
                    rate: 2
                }
            })

            const findWallet = await Wallet.findById(wallet._id)
            expect(findWallet.balance).to.equal(470);
            expect(findWallet.otherCurrency.balance).to.equal(940);
        })
    })
})

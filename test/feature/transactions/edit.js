// noinspection DuplicatedCode

import {expect} from "chai"
import Wallet from "../../../models/Wallet.js";
import transactionService from "../../../services/transaction.js";
import {CreateTestUser, CreateTestWallet} from "../../../utils/test_service.js";
import Transaction from "../../../models/Transaction.js";

describe('Editing expense -> income transaction\n\r', () => {

    describe('Given a wallets with 250 BGN balance', () => {

        describe('And creating a new transaction of type `expense` with 100 BGN', () => {

            describe('When editing the same transaction to be of type `income` with 140 BGN', () => {

                it('Then the wallets balance should be 390 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 250)

                    const transaction = await transactionService.store(user, {
                        amount: 100,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(150);

                    await transactionService.update(transaction._id, user, {
                        amount: 140,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(390);
                })
            })
        })
    })

    describe('Given a wallets with 80 BGN balance', () => {

        describe('And creating a new transaction of type `expense` with 300 BGN', () => {

            describe('When editing the same transaction to be of type `income` with 440 BGN', () => {

                it('Then the wallets balance should be 530 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 80)

                    const transaction = await transactionService.store(user, {
                        amount: 300,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(-220);

                    await transactionService.update(transaction._id, user, {
                        amount: 440,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(520);

                })
            })
        })
    })
})

describe('Editing income -> expense transaction\n\r', () => {

    describe('Given a wallets with 250 BGN balance', () => {

        describe('And creating a new transaction of type `income` with 100 BGN', () => {

            describe('When editing the same transaction to be of type `expense` with 1040 BGN', () => {

                it('Then the wallets balance should be -790 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 250)

                    const transaction = await transactionService.store(user, {
                        amount: 100,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(350);

                    await transactionService.update(transaction._id, user, {
                        amount: 1040,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(-790);
                })
            })
        })
    })

    describe('Given a wallets with 350 BGN balance', () => {

        describe('And creating a new transaction of type `income` with 1000 BGN', () => {

            describe('When editing the same transaction to be of type `expense` with 300 BGN', () => {

                it('Then the wallets balance should be 50 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 350)

                    const transaction = await transactionService.store(user, {
                        amount: 1000,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(1350);

                    await transactionService.update(transaction._id, user, {
                        amount: 300,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(50);
                })
            })
        })
    })

})

describe('Editing expense -> expense transaction\n\r', () => {

    describe('Given a wallets with 250 BGN balance', () => {

        describe('And creating a new transaction of type `expense` with 1000 BGN', () => {

            describe('When editing the same transaction to be of type `expense` with 100 BGN', () => {

                it('Then the wallets balance should be -150 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 250)

                    const transaction = await transactionService.store(user, {
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(-750);

                    await transactionService.update(transaction._id, user, {
                        amount: 100,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(150);
                })
            })
        })
    })

    describe('Given a wallets with 350 BGN balance', () => {

        describe('And creating a new transaction of type `expense` with 100 BGN', () => {

            describe('When editing the same transaction to be of type `expense` with 300 BGN', () => {

                it('Then the wallets balance should be 50 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 350)

                    const transaction = await transactionService.store(user, {
                        amount: 100,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(250);

                    await transactionService.update(transaction._id, user, {
                        amount: 300,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(50);
                })
            })
        })
    })

})

describe('Editing income -> income transaction\n\r', () => {

    describe('Given a wallets with 650 BGN balance', () => {

        describe('And creating a new transaction of type `income` with 100 BGN', () => {

            describe('When editing the same transaction to be of type `income` with 340 BGN', () => {

                it('Then the wallets balance should be 990 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 650)

                    const transaction = await transactionService.store(user, {
                        amount: 100,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(750);

                    await transactionService.update(transaction._id, user, {
                        amount: 340,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(990);
                })
            })
        })
    })

    describe('Given a wallets with 150 BGN balance', () => {

        describe('And creating a new transaction of type `income` with 1000 BGN', () => {

            describe('When editing the same transaction to be of type `income` with 300 BGN', () => {

                it('Then the wallets balance should be 450 BGN', async () => {

                    const user = await CreateTestUser()
                    const wallet = await CreateTestWallet(user, 150)

                    const transaction = await transactionService.store(user, {
                        amount: 1000,
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

                    const findWalletPreEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPreEdit.balance).to.equal(1150);

                    await transactionService.update(transaction._id, user, {
                        amount: 300,
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

                    const findWalletPostEdit = await Wallet.findById(wallet._id)
                    expect(findWalletPostEdit.balance).to.equal(450);
                })
            })
        })
    })

})
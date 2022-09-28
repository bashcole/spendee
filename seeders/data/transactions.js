import dotenv from "dotenv"

dotenv.config()

export default [{
    "amount": 690000,
    "currency": "BGN",
    "walletID": "6273af17db9b0ff00d1b3051",
    "userID": "6273a0733d3f7b2af9320b24",
    "note": "Money money money",
    "category": {
        "type": "income",
        "name": "Lottery",
        "id": "6273a1b7fc756e7f8669c5a2",
        "hex": "#71c643",
        "icon": `${process.env.FRONTEND_URL}/img/icons/money.svg`
    },
    "createdAt": "2022-08-01T08:48:50.000Z"
},{
    "amount": 372300,
    "currency": "BGN",
    "walletID": "6273af17e3e50dfafa2f2940",
    "userID": "6273a0733d3f7b2af9320b24",
    "note": "Shopping",
    "category": {
        "type": "expense",
        "name": "Food",
        "id": "6273a1b7e6330d4afc010683",
        "hex": "#b47b55",
        "icon": `${process.env.FRONTEND_URL}/img/icons/grocery.svg`
    },
    "createdAt": "2022-08-01T08:08:58.000Z"
},{
    "amount": 800000,
    "currency": "USD",
    "walletID": "6273af17e3e50dfafa2f2949",
    "userID": "6273a0733d3f7b2af9320b24",
    "note": "London",
    "category": {
        "type": "expense",
        "name": "Trip",
        "id": "6273a1b7e6330d4afc010683",
        "hex": "#47a7e6",
        "icon": `${process.env.FRONTEND_URL}/img/icons/plane.svg`
    },
    "createdAt": "2022-08-01T08:08:58.000Z",
    "otherCurrency": {"amount": 1569020.8, "currency": "BGN", "rate": 1.961276}
}]
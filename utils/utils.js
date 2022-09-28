// https://timleland.com/money-in-javascript/

/*
* Always store dollars in whole cents and display in dollars
* Use money javascript libraries to help with other currencies.
* Avoid .toFixed(2); because of rounding issues
*/

export const formatDollarsToCents = (value) => {
    value = (value + '').replace(/[^\d.-]/g, '');
    if (value && value.includes('.')) {
        value = value.substring(0, value.indexOf('.') + 3);
    }

    return value ? Math.round(parseFloat(value) * 100) : 0;
}

export const formatCentsToDollars = (value) => {
    value = (value + '').replace(/[^\d.-]/g, '');
    value = parseFloat(value);
    return value ? value / 100 : 0;
}

export const dateTimeToJsDate = (dateTime) => {
    let dateTimeParts= dateTime.split(/[- :]/);
    dateTimeParts[1]--;

    return new Date(...dateTimeParts);
}

export const sqlToJsDate = (date) => {
    const parts = date.split(" ");
    const datePart = parts[0].split("-");
    const timePart = parts[1].split(":");

    const year = datePart[0];
    const month = datePart[1] - 1;
    const day = datePart[2];

    const hour = timePart[0];
    const minute = timePart[1];
    const second = timePart[2];

    return new Date(year,month,day,hour,minute,second);

}

export const calculateAmountChange = (prev, current) => {
    if (prev.category.type === "expense") {

        if (current.category.type === "expense") {
            return prev.amount - current.amount
        }
        return prev.amount + current.amount
    }

    if (prev.category.type === "income") {
        if (current.category.type === "expense") {
            return -(current.amount + prev.amount)
        }

        return current.amount - prev.amount
    }
}

export const defaultCategories = (userID) => {
    return [{
        "userID": userID,
        "type": "income",
        "name": "Заплата",
        "hex": "#71c643",
        "icon": "/img/icons/money.svg",
        "sort": 1
    },{
        "userID": userID,
        "type": "income",
        "name": "Подаръци",
        "hex": "#f5534b",
        "icon": "/img/icons/gift.svg",
        "sort": 2
    },{
        "userID": userID,
        "type": "income",
        "name": "Extra",
        "hex": "#ffa200",
        "icon": "/img/icons/shopping.svg",
        "sort": 3
    },{
        "userID": userID,
        "type": "income",
        "name": "Заем",
        "hex": "#e06476",
        "icon": "/img/icons/loan.svg",
        "sort": 4
    },{
        "userID": userID,
        "type": "income",
        "name": "Майчинство",
        "hex": "#f964a0",
        "icon": "/icons/parental_leave.svg",
        "sort": 5
    },{
        "userID": userID,
        "type": "income",
        "name": "Други",
        "hex": "#67686c",
        "icon": "/img/icons/other.svg",
        "sort": 6
    },{
        "userID": userID,
        "type": "expense",
        "name": "Храна",
        "hex": "#b47b55",
        "icon": "/icons/grocery.svg",
        "sort": 1
    },{
        "userID": userID,
        "type": "expense",
        "name": "Пазаруване",
        "hex": "#5dc6ad",
        "icon": "/icons/shopping.svg",
        "sort": 2
    },{
        "userID": userID,
        "type": "expense",
        "name": "Сметки",
        "hex": "#71c643",
        "icon": "/icons/money.svg",
        "sort": 3
    },{
        "userID": userID,
        "type": "expense",
        "name": "Наем",
        "hex": "#71c643",
        "icon": "/icons/rent.svg",
        "sort": 4
    },{
        "userID": userID,
        "type": "expense",
        "name": "Заведения",
        "hex": "#f963a0",
        "icon": "/icons/food.svg",
        "sort": 5
    },{
        "userID": userID,
        "type": "expense",
        "name": "Забавления",
        "hex": "#ffa801",
        "icon": "/img/icons/entertainment.svg",
        "sort": 6
    },{
        "userID": userID,
        "type": "expense",
        "name": "Транспорт",
        "hex": "#61708c",
        "icon": "/img/icons/transport.svg",
        "sort": 7
    },{
        "userID": userID,
        "type": "expense",
        "name": "Подаръци",
        "hex": "#f5534b",
        "icon": "/img/icons/gift.svg",
        "sort": 8
    },{
        "userID": userID,
        "type": "expense",
        "name": "Пътешествия",
        "hex": "#47a7e6",
        "icon": "/img/icons/plane.svg",
        "sort": 9
    },{
        "userID": userID,
        "type": "expense",
        "name": "Хотели",
        "hex": "#e26beb",
        "icon": "/img/icons/acommodation.svg",
        "sort": 10
    },{
        "userID": userID,
        "type": "expense",
        "name": "Спорт",
        "hex": "#47a7e6",
        "icon": "/img/icons/gym.svg",
        "sort": 11
    },{
        "userID": userID,
        "type": "expense",
        "name": "Здраве",
        "hex": "#e56274",
        "icon": "/img/icons/healthcare.svg",
        "sort": 12
    },{
        "userID": userID,
        "type": "expense",
        "name": "Кола",
        "hex": "#e56274",
        "icon": "/img/icons/car.svg",
        "sort": 12
    },{
        "userID": userID,
        "type": "expense",
        "name": "Семейство",
        "hex": "#60cfcb",
        "icon": "/img/icons/personal.svg",
        "sort": 13
    },{
        "userID": userID,
        "type": "expense",
        "name": "Обучение",
        "hex": "#3a75ad",
        "icon": "/img/icons/education.svg",
        "sort": 14
    },{
        "userID": userID,
        "type": "expense",
        "name": "iTunes",
        "hex": "#71c643",
        "icon": "/img/icons/itunes.svg",
        "sort": 15
    },{
        "userID": userID,
        "type": "expense",
        "name": "Приравняване",
        "hex": "#f5534b",
        "icon": "/img/icons/wallet.svg",
        "sort": 16
    },{
        "userID": userID,
        "type": "expense",
        "name": "Други",
        "hex": "#67686c",
        "icon": "/img/icons/other.svg",
        "sort": 17
    }]
}
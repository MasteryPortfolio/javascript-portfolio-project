async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        resultElement.innerText = `${amount} ${fromCurrency} is ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultElement.innerText = 'Unable to retrieve currency data.';
    }
}

// Itinerary Functionality
class Item {
    constructor(title) {
        this.title = title;
    }
}

const itinerary = {
    items: [],

    updateList: function (title) {
        const item = new Item(title);
        this.items.push(item);
        console.log(`${item.title} has been added to the itinerary.`);
    }
}

function addItem() {
    const title = prompt('Enter itinerary item');
    console.log(title);
    itinerary.updateList(title);
    console.log(itinerary.items);
}


//document.querySelector('#addItemBtn').addEventListener('click', addItem);
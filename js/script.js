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
const addItemBtn = document.getElementById('addItemBtn');
const addItemField = document.getElementById('itemToAdd');
const itineraryList = document.getElementById('itineraryList');

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
        console.log(this.items);
    },

    rebuildList: function () {
        for (let i = 0; i < this.items.length; i++) {
            const title = this.items[i].title;
            console.log(title);
            addItem(title);
        }
    },

}


function emptyList() {
    while (itineraryList.lastChild) {
        itineraryList.removeChild(itineraryList.lastChild);
    }
    itinerary.rebuildList();
}

function deleteItem(event) {
    const itemTitle = event.currentTarget.previousElementSibling.textContent;
    for (let item of itinerary.items) {
        try {
            if (itemTitle === item.title) {
                const index = itinerary.items.indexOf(item);
                itinerary.items.splice(index, 1);
                console.log(itinerary.items);
                emptyList();
            }
        } catch (e) {
            console.error(e);
        }
    }
}

function clickToAdd() {
    title = addItemField.value;
    itinerary.updateList(title);
    addItem(title);
    addItemField.value = '';
}

function addItem(title) {

    const newItem = document.createElement('li');
    const newItemText = document.createElement('span');
    const deleteBtn = document.createElement('button');

    newItem.draggable = true;
    newItem.className = 'list-item';
    itineraryList.appendChild(newItem);

    newItemText.textContent = title;
    newItem.appendChild(newItemText);

    deleteBtn.textContent = 'x';
    deleteBtn.className = 'btn-delete';
    deleteBtn.title = 'Remove item';
    newItem.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteItem);
}

addItemBtn.addEventListener('click', clickToAdd);


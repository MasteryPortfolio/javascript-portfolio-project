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
    newItem.addEventListener('dragstart', drag);

    newItemText.textContent = title;
    newItem.appendChild(newItemText);

    deleteBtn.textContent = 'x';
    deleteBtn.className = 'btn-delete';
    deleteBtn.title = 'Remove item';
    newItem.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteItem);
}




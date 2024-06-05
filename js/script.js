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
const sortableList = document.getElementById('sortableList');

function addItem(title) {
    const newItem = document.createElement('li');
    const newItemText = document.createElement('span');
    const deleteBtn = document.createElement('button');

    newItem.draggable = true;
    newItem.className = 'list-item form-control my-3';
    newItem.id = Math.floor(Math.random() * 1000);
    sortableList.appendChild(newItem);

    newItemText.textContent = title;
    newItem.appendChild(newItemText);

    deleteBtn.textContent = 'x';
    deleteBtn.className = 'btn-delete';
    deleteBtn.title = 'Remove item';
    deleteBtn.addEventListener('click', deleteItem);
    newItem.appendChild(deleteBtn);
}

function clickToAdd() {
    title = addItemField.value;
    // itinerary.updateList(title);
    addItem(title);
    addItemField.value = '';
}

function deleteItem(event) {
    const item = event.currentTarget.parentElement;
    sortableList.removeChild(item);
}

let draggedItem = null;

sortableList.addEventListener("dragstart", (event) => {
    draggedItem = event.target;
    setTimeout(() => {
        event.target.style.opacity = 0;
    }, 0);
});

sortableList.addEventListener("dragend", (event) => {
    setTimeout(() => {
        event.target.style.opacity = 1;
        draggedItem = null;
    }, 0);
});

sortableList.addEventListener("dragover", (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(sortableList, event.clientY);
    if (afterElement == null) {
        sortableList.appendChild(draggedItem);
    } else {
        sortableList.insertBefore(draggedItem, afterElement);
    }
});

const getDragAfterElement = (container, y) => {
    const draggableElements = [
        ...container.querySelectorAll("li:not(.dragging)")
    ];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return {
                    offset: offset,
                    element: child
                };
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY
        }
    ).element;
};

addItemBtn.addEventListener('click', clickToAdd);

addItemField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        clickToAdd();
    }
});

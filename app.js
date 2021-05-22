const inputItem = document.querySelector('#input-item');
const addForm = document.querySelector('#add-form');
const editForm = document.querySelector('#edit-form');
const ul = document.querySelector('.list-collection');
const submit = document.querySelector('.submit');
const editItem = document.querySelector('.edit-item');
const clear = document.querySelector('.clear');

// stores grocery array
let grocery;
// stores parsed grocery array
let items;
let flag = 0;

// event listeners
window.addEventListener('DOMContentLoaded', display);
addForm.addEventListener('submit', addToStorage);
ul.addEventListener('click', remove_edit);
clear.addEventListener('click', removeAll);

// To display the list items into the DOM from local storage
function display() {
    ul.innerHTML = null;

    // To show the groecery list deleted msg if items are present in the local storage else unshow
    if ((JSON.parse(localStorage.getItem("grocery"))) === null || (JSON.parse(localStorage.getItem("grocery"))).length === 0) {
        clear.classList.add('unshow');
        return
    }
    else {
        clear.classList.remove('unshow');

        // To retrive item from local storage and send to add() function
        let arr = JSON.parse(localStorage.getItem("grocery"));
        arr.forEach(function (item) {
            add(item);
        });
    }

};

// To add items into the local storage
function addToStorage(e) {

    //If the input value is not empty
    if (inputItem.value != "") {

        // If grocery array is null, create an array and add items into it
        if (JSON.parse(localStorage.getItem("grocery")) === null) {
            grocery = [];
            grocery.push(inputItem.value.charAt(0).toUpperCase() + inputItem.value.slice(1));
            groceryJson = JSON.stringify(grocery);
            localStorage.setItem("grocery", groceryJson);

            // To display add-item alert msg
            alert("add-item");
        }
        // If grocery array is not null, add items into it
        else {
            // to check if the inputItem.value is present in the grocery array
            if (checkItemIsPresent(inputItem.value) !== true) {
                let arr = JSON.parse(localStorage.getItem("grocery"));
                arr.push(inputItem.value.charAt(0).toUpperCase() + inputItem.value.slice(1));
                groceryJson = JSON.stringify(arr);
                localStorage.setItem("grocery", groceryJson);

                // To display add-item alert msg
                alert("add-item");
            }
            else {
                // To display item-present alert msg
                alert("item-present");
            }
        }

        // To clear the input field after the value is added
        inputItem.value = "";

    }
    // If the input value is empty
    else if (inputItem.value === "") {

        // To display empty alert msg
        alert("empty");
    }

    // To display the updated list items into the DOM
    display();
    e.preventDefault();
}

// To add Item into the DOM by creating li and i elements and appending it to the ul
function add(item) {
    const li = document.createElement('li');
    li.classList.add('item-collection');
    li.textContent = item;

    const i1 = document.createElement('i');
    i1.classList = 'far fa-edit';

    const i2 = document.createElement('i');
    i2.classList = 'fas fa-trash';

    const span = document.createElement('span');

    span.appendChild(i1);
    span.appendChild(i2);
    li.appendChild(span);

    ul.appendChild(li);
}

// To remove and edit items from grocery array in the local storage
function remove_edit(e) {

    // If user select trash icon
    if (e.target.classList.contains('fa-trash')) {
        let val = e.target.parentElement.parentElement.textContent;

        // Retrive and parse the grocery array into items array
        items = JSON.parse(localStorage.getItem("grocery"));
        items.forEach(function (item, index) {
            if (item === val) {
                // if selected value that is to be removed matches the item from the grocery array
                items.splice(index, 1);
                localStorage.setItem("grocery", JSON.stringify(items));

                if ((JSON.parse(localStorage.getItem("grocery"))).length !== 0) {
                    // To display the removed msg 
                    alert("removed");
                }
                else {
                    removeAll();
                    // To display removed all alert msg
                    alert("removed-all");
                }

                // To display the updated list items into the DOM
                display();
            }
        });
    }

    // If user select edit icon
    if (e.target.classList.contains('fa-edit')) {

        // Toggle the editform and addForm
        editForm.classList.add('show');
        addForm.classList.add('unshow');

        // Retrive and parse the grocery array into items array
        let val = e.target.parentElement.parentElement.textContent;
        items = JSON.parse(localStorage.getItem("grocery"));
        editItem.value = val;
        editForm.addEventListener('submit', function (e) {
            
            // to check if the editItem.value is present in the grocery array
            if (checkItemIsPresent(editItem.value) !== true) {
                items.forEach(function (item, index) {
                    if (item === val) {
                        // if selected value that is to be removed matches the item from the grocery array
                        items.splice(index, 1, editItem.value.charAt(0).toUpperCase() + editItem.value.slice(1));
                        localStorage.setItem("grocery", JSON.stringify(items));

                        // Toggle the editForm and addForm
                        editForm.classList.remove('show');
                        addForm.classList.remove('unshow');

                        // To display the editted msg
                        alert("editted");

                        // To display the updated list items into the DOM
                        display();
                    }
                })
            }
            else {
                // To display item-present alert msg
                alert("item-present");
            }
            e.preventDefault();

        });
    }
}

// To remove all the grocery items from local storage
function removeAll() {
    localStorage.removeItem("grocery");

    // To display removed all alert msg
    alert("removed-all");

    // To display the updated list items into the DOM
    display();
}

// Alert Box
function alert(cssClass) {
    document.querySelector('.' + cssClass).classList.add('show');
    setTimeout(function () {
        document.querySelector('.' + cssClass).classList.remove('show');
    }, 1000)
}

// Check if item is present in the grocery array
function checkItemIsPresent(value) {
    value = (value.charAt(0).toUpperCase() + value.slice(1));

    let arr = JSON.parse(localStorage.getItem("grocery"));
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
}
const inputItem = document.querySelector('#input-item');
const addForm = document.querySelector('#add-form');
const editForm = document.querySelector('#edit-form');
const ul = document.querySelector('.list-collection');
const submit = document.querySelector('.submit');
const editItem = document.querySelector('.edit-item');

let items;
let grocery;

window.addEventListener('DOMContentLoaded', display);
addForm.addEventListener('submit', addToStorage);
ul.addEventListener('click', remove_edit);


function display() {
    ul.innerHTML = null;
    let arr = JSON.parse(localStorage.getItem("grocery"));
    arr.forEach(function (item) {
        add(item);
    });

};

function addToStorage(e) {
    if (inputItem.value != "") {
        if (JSON.parse(localStorage.getItem("grocery")) === null) {
            grocery = [];
            grocery.push(inputItem.value.charAt(0).toUpperCase() + inputItem.value.slice(1));
            groceryJson = JSON.stringify(grocery);
            localStorage.setItem("grocery", groceryJson);
        }
        else {
            let arr = JSON.parse(localStorage.getItem("grocery"));
            arr.push(inputItem.value.charAt(0).toUpperCase() + inputItem.value.slice(1));
            groceryJson = JSON.stringify(arr);
            localStorage.setItem("grocery", groceryJson);
        }
        inputItem.value = "";

        document.querySelector('.add-item').classList.add('show');
        setTimeout(function () {
            document.querySelector('.add-item').classList.remove('show');
        }, 1000)
    }

    else if (inputItem.value === "") {
        document.querySelector('.empty').classList.add('show');
        setTimeout(function () {
            document.querySelector('.empty').classList.remove('show');
        }, 1000)
    }

    display();
    e.preventDefault();
}

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

function remove_edit(e) {

    if (e.target.classList.contains('fa-trash')) {
        let val = e.target.parentElement.parentElement.textContent;

        items = JSON.parse(localStorage.getItem("grocery"));
        items.forEach(function (item, index) {
            if (item === val) {
                items.splice(index, 1);
                localStorage.setItem("grocery", JSON.stringify(items));

                document.querySelector('.removed').classList.add('show');
                setTimeout(function () {
                    document.querySelector('.removed').classList.remove('show');
                }, 1000)
                display();
            }
        });
    }

    if (e.target.classList.contains('fa-edit')) {

        editForm.classList.add('show');
        addForm.classList.add('unshow');

        let val = e.target.parentElement.parentElement.textContent;
        items = JSON.parse(localStorage.getItem("grocery"));
        editItem.value = val;
        editForm.addEventListener('submit', function (e) {
            items.forEach(function (item, index) {
                if (item === val) {
                    items.splice(index, 1, editItem.value.charAt(0).toUpperCase() + editItem.value.slice(1));
                    localStorage.setItem("grocery", JSON.stringify(items));

                    editForm.classList.remove('show');
                    addForm.classList.remove('unshow');


                    document.querySelector('.editted').classList.add('show');
                    setTimeout(function () {
                        document.querySelector('.editted').classList.remove('show');
                    }, 1000)

                    display();
                }
            })
            e.preventDefault();

        });
    }
}

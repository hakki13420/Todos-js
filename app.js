let items=[]

const templateTodo = document.querySelector('#todo-template').content;
const content = document.querySelector('.content')
const fragment = document.createDocumentFragment();

const input = document.querySelector('form input')


document.querySelector('form').addEventListener('submit', (e) => {    
    e.preventDefault();
    if (validation()) {
        const index = items.findIndex((el) => el === input.value);
        
        if(index === -1) {
            items.push(input.value)
            storeElements();
            displayElements();
        } else {
            document.querySelector('.alert').classList.remove('d-none');
            closeAlert();
        }
    }
})

function validation() {
    const reg = /^[a-zA-Z0-9]/;
    return reg.test(input.value.trim());
}

function addElement(input) {
    const node = templateTodo.firstElementChild.cloneNode(true);
    node.querySelector('.item-name').textContent = input;
    node.querySelector('button').dataset.item = input;
    node.querySelector('button').addEventListener('click', () => {
        removeElement(node.querySelector('button').dataset.item)
    })
    fragment.appendChild(node);
    content.appendChild(fragment)
}

//close alert div
function closeAlert() {
    setTimeout(() => {
        document.querySelector('.alert').classList.add('d-none');
    }, 1000);
}

//remove element
function removeElement(item) {    
    const index = items.indexOf(item)
    items.splice(index, 1);    
    storeElements();
    displayElements();
}


//display element from array
function displayElements()
{
    content.textContent=""
    items.forEach(el => addElement(el))
}
function storeElements() {
    localStorage.setItem('items',JSON.stringify(items))
}


//auto run function
(function () {
    if (localStorage.getItem('items')) {        
        items = JSON.parse(localStorage.getItem('items'))
        console.log(items)
        displayElements()
    } else {
        items=[]
    }
})()
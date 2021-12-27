const items=[]

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
            addElement();
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

function addElement() {
    const node = templateTodo.firstElementChild.cloneNode(true);
    node.querySelector('.item-name').textContent = input.value;
    node.querySelector('button').dataset.item = input.value;
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
    console.log(items);
    const index = items.indexOf(item)
    items.splice(index, 1)
    console.log(items);
}
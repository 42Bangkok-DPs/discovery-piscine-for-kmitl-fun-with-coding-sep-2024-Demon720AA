const list = document.getElementById("ft_list")
let TodoList = []

function createTodo(text) {
    const element = document.createElement('div')
    element.classList.add('todo')
    element.innerHTML = '<p>' + text + '</p>' + '<button onclick="remove(' + "'" + text + "'" + ')">Delete</button>'
    return element;
}

function render() {
    list.innerHTML = ''
    for (let index = 0; index < TodoList.length; index++) {
        const element = TodoList[index];
        list.innerHTML += createTodo(element).outerHTML
    }
    document.cookie = JSON.stringify(TodoList)
}

function newTodo() {
    let name = prompt("Name the todo.")
    if (name.length > 0) {
        TodoList.unshift(name)
        render()
    }
}

function remove(text) {
    let yes = confirm('Are you sure to remove.')
    if (yes) {
        TodoList = TodoList.filter((a) => a != text)
        render()
    }
}

window.onload = function () {
    let save = document.cookie;
    if (save.length > 0) {
        TodoList = JSON.parse(save)
        render()
    }
}
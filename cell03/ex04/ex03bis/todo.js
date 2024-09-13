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



$(document).ready(function () {
    // const list = document.getElementById("ft_list");
    const $list = $('#ft_list');
    let TodoList = [];

    let save = getCookie('todoList');
    if (save) {
        TodoList = JSON.parse(save);
        render();
    }

    function addTask(taskText) {
        // const taskDiv = document.createElement("div");
        // taskDiv.className = "task";
        // taskDiv.textContent = taskText;
        const $taskDiv = $('<div></div>').addClass('task').text(taskText);

        // taskDiv.addEventListener("click", function() {
        $taskDiv.on("click", function() {
            const confirmDelete = confirm("Do you really want to remove this TO DO?");
            if (confirmDelete) {
                removeTask(taskText);
            }
        });

        return $taskDiv;
    }

    function render() {
        // list.innerHTML = '';
        $list.empty();
        for (let index = 0; index < TodoList.length; index++) {
            const $taskDiv = addTask(TodoList[index]);
            // list.append(taskDiv);
            $list.append($taskDiv);
        }
        saveTasks();
    }

    function saveTasks() {
        document.cookie = "todoList=" + JSON.stringify(TodoList) + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // document.getElementById("new").addEventListener("click", function() {
    $('#new').on('click', function () {
        let name = prompt("Enter your TO DO:");
        if (name) {
            TodoList.unshift(name);
            render();
        }
    });

    function removeTask(taskText) {
        TodoList = TodoList.filter(task => task !== taskText);
        render();
    }
})
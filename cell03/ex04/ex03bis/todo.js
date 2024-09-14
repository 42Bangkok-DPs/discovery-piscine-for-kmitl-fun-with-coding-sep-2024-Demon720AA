$(document).ready(function () {
    // const list = document.getElementById("ft_list");
    const $list = $('#ft_list');
    let TodoList = [];

    let save = getCookie('todoList');
    if (save) {
        TodoList = JSON.parse(decodeURIComponent(save));
        render();
    }

    function addTask(taskText) {
        const $taskDiv = $('<div></div>').addClass('task').text(taskText);
        $taskDiv.on("click", function() {
            const confirmDelete = confirm("Do you really want to remove this TO DO?");
            if (confirmDelete) {
                removeTask(taskText);
            }
        });

        return $taskDiv;
    }

    function render() {
        $list.empty();
        for (let index = 0; index < TodoList.length; index++) {
            const $taskDiv = addTask(TodoList[index]);
            $list.append($taskDiv);
        }
        saveTasks();
    }

    function saveTasks() {
        document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(TodoList)) + "; path=/";
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
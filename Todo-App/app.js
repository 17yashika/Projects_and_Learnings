// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');;

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    // Append li to div
    todoDiv.appendChild(newTodo);
    //Add todo to LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // Check MARK button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Check TRASH button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to List
    todoList.appendChild(todoDiv);
    // Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // DELETE todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        //Wait till the animation is completed
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
        //todo.remove();
    }
    // CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    // console.log(todos);    
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
//local Storage
function saveLocalTodos(todo) {
    //Check  --- if already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    //Check  --- if already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo-item");
        // Append li to div
        todoDiv.appendChild(newTodo);
        // Check MARK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // Check TRASH button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
   //Check  --- if already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
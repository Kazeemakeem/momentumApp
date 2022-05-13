const todoForm = document.querySelector('#todo-form');
const addButton = document.querySelector('#add');
const todoInput = document.querySelector('#task');
const todoDate = document.querySelector('#date');
const todoTime = document.querySelector('#time');
const todoEditForm = document.querySelector('#todo-edit');
const todoList = document.querySelector('#todo-list');

let toDos = [];

todoInput.maxLength = 25;

function renderTodo(todoDetails, event){


    const ul = document.createElement('ul');
    const taskLi = document.createElement('li');
    const dateLi = document.createElement('li')
    const timeLi = document.createElement('li')
    const deleteButton = document.createElement('button')
    const editButton = document.createElement('button')

    editButton.textContent ="✒️"
    deleteButton.textContent = "❌";
    addButton.textContent = "Add"
    dateLi.textContent = todoDetails.date;
    timeLi.textContent = todoDetails.time;
    //timeLi.setAttribute('data-time', 'timeElement')
    taskLi.textContent = todoDetails.task;
    ul.id = todoDetails.id;

    ul.appendChild(dateLi);
    ul.appendChild(timeLi);
    ul.appendChild(taskLi);
    ul.appendChild(editButton);
    ul.appendChild(deleteButton);
    todoList.appendChild(ul);

    deleteButton.addEventListener("click", deleteTodo)//
    editButton.addEventListener("click", handleEditData)//
      
}

function handleTodoSubmit(event){

    event.preventDefault();

    const indx = Math.floor(Math.random()*Date.now())

    const todoDetails = {};
    todoDetails.id = indx;
    todoDetails.date = todoDate.value;
    todoDetails.time = todoTime.value;
    todoDetails.task = todoInput.value;
    todoDate.value = todoDate.placeholder;
    todoTime.value = todoTime.placeholder;
    todoInput.value = " ";

    toDos.push(todoDetails)
    saveTodo(toDos);

    renderTodo(todoDetails)
}

const editTodoInput = document.querySelector('#task-edit');
const editTodoDate = document.querySelector('#date-edit');
const editTodoTime = document.querySelector('#time-edit');
const saveButton = document.querySelector('#save');
const myTodos = JSON.parse(localStorage.getItem('toDosKey'))

let renderedTodoEdit;
function handleEditData(event){
    const myTodos = JSON.parse(localStorage.getItem('toDosKey'))
    renderedTodoEdit = event.target.parentElement;
    //console.log(parseInt(renderedTodoEdit.id))
    //console.log(myTodos[0].id)
    const todoToEdit = toDos.find(todo => todo.id === parseInt(renderedTodoEdit.id))

    //console.log(todoToEdit)

    todoEditForm.classList.remove('hidden');
  
    saveButton.addEventListener("click", updtTodo.bind(null, todoToEdit))// or null as first parameter since there is 'this keyword in handleeditdata
    
}

function updtTodo(todoToEdit, event){
    let todoEdited = {...todoToEdit}
    event.target.parentElement.remove();
    todoEditForm.classList.add('hidden')
    todoEdited.task = editTodoInput.value;
    todoEdited.date = editTodoDate.value;
    todoEdited.time = editTodoTime.value;
    let myTodos = JSON.parse(localStorage.getItem('toDosKey'))
    let newObj = myTodos.reduce(function(acc, val){
        acc[val.id] = val;
        return acc;
    },{})

    newObj[todoEdited.id] = todoEdited;
    //delete newObj[todoToEdit.id]

    const updtdSavdTodo = Object.values(newObj);
    localStorage.removeItem('toDosKey');
    
    // console.log(localStorage.getItem("toDosKey"));
    saveTodo(updtdSavdTodo);
    // console.log(JSON.parse(localStorage.getItem("toDosKey")));
    reloadTodos()
}

function deleteTodo(event){
    const listToRemove = event.target.parentElement;
    listToRemove.remove();
    toDos = toDos.filter((todo) => todo.id !== parseInt(listToRemove.id))
    //console.log(parseInt(listToRemove.id))
    //console.log(toDos[0].id)
    //console.log(toDos)
    todoEditForm.classList.add('hidden')
}

function saveTodo(toDos){
    localStorage.setItem("toDosKey", JSON.stringify(toDos))
}

addButton.addEventListener("click", handleTodoSubmit);//

reloadTodos();

function reloadTodos(){
    const savedTodos = localStorage.getItem("toDosKey")

    //console.log(savedTodos);

    if(savedTodos !== null){
        const parsedTodos = JSON.parse(savedTodos);
        parsedTodos.forEach(renderTodo)
    }
}




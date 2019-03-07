const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clrBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}
//to make sure that the tasks that are displayed on local storage are displayed upon refresh
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    //same code as dynamically adding the items 
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    });
}
function addTask(e){
    //for better ux - ensure that the user enters something for the task
    if(taskInput.value === ''){
        alert('Add a task');
    }
    //creating li, adding class to the li, then the text node and appending it to the li
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //creating link element that is on the same line as the added task-->for deleting
    const link = document.createElement('a');
    //secondary-content class name is for the materialized css for putting it to the right
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //appending the link to the li
    li.appendChild(link);
    //appending the newly created li to the ul
    taskList.appendChild(li);
    //clearing the input in the textbox
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = ''; 

    e.preventDefault();
}
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    console.log(e.target.parentElement.parentElement.value);
    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    //can use the .forEach b/c of the querySelectorAll which returns a node list
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        //text is the parameter that is passed by the user to compare to list items collected by .firsChild in iterration forEach 
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}
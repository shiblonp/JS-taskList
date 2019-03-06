const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clrBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
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
    taskInput.value = ''; 

    e.preventDefault();
}
function removeTask(e){
    console.log(e.target.parentElement.parentElement.value);
    if (e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}
function clearTasks(e){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}
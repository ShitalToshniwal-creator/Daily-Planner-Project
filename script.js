const taskInputEl = document.getElementById("taskInput");
const addTaskButtonEl = document.getElementById("addTaskButton");
const taskListEl = document.getElementById("taskList");

let taskArray = getTasksFromLocalStorage();
    
function getTasksFromLocalStorage(){
   return JSON.parse(localStorage.getItem("tasks")) || [];
}
function updateTasksInLocalStorage(){
    return localStorage.setItem("tasks", JSON.stringify(taskArray));
}
function createTask(taskText){
    return {text: taskText,completed:false};
}
function deleteTask(index){
    taskArray.splice(index,1);
    updateTasksInLocalStorage();
}

function createTaskElement(taskObj) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener("change", function () {
      taskObj.completed = checkbox.checked;
      taskTextElement.classList.toggle("completed", taskObj.completed);
      updateTasksInLocalStorage();
    });
  
    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("taskText");
    taskTextElement.textContent = taskObj.text;
    taskTextElement.classList.toggle("completed", taskObj.completed);
  
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", function () {
      deleteTask(taskObj);
      renderTasks();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(removeButton);
  
    return taskItem;
  }
  function renderTasks(){
    taskListEl.innerHTML=" ";
    for(let i = 0; i<taskArray.length; i++){
        const taskElement=createTaskElement(taskArray[i]); 
        taskListEl.appendChild(taskElement);       //check this // 
       }

}

addTaskButtonEl.addEventListener("click", function () {
    const taskText = taskInputEl.value;  // check this //
    if (taskText === "") {
        return;
    }
    const newTask = createTask(taskText);
    taskArray.push(newTask);
    updateTasksInLocalStorage();
    renderTasks();

    taskInputEl.value = "";
});
renderTasks();


    //  taskItem.innerText=taskObj.text;
        // taskListEl.add("taskItem") 
        
    //}
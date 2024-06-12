let taskCount = 0;
let hasDisplayed = false;

function viewTasks()
{
  let keys = Object.keys(localStorage);
  let taskKeys = keys.filter(key => key.startsWith("task"));

  let allTasks = {};

  taskKeys.forEach(key =>{
    allTasks[key] = JSON.parse(localStorage.getItem(key));
  })

  showTasks(allTasks);
}

function showTasks(allTasks)
{

if(!hasDisplayed)
{
   let allValues = Object.values(allTasks);

   allValues.forEach(value =>{
    
    //  Elements to be added 
    let taskElement = document.createElement("div");
    let titleElement = document.createElement("h4");
    let dateElement = document.createElement("h6");
    let timeElement = document.createElement("h6");
    let updateButtonElement = document.createElement("button");
    let deleteButtonElement = document.createElement("button");
    let checkBox = document.createElement("input");
    checkBox.type = 'checkbox';

    let parentElement = document.getElementById('all-tasks');
    parentElement.style.overflowY = "scroll";
    parentElement.appendChild(taskElement);

    // Styling Task cards 
    taskElement.style.display = "flex";
    taskElement.style.alignItems = "center";
    taskElement.style.justifyContent = "space-around";
    taskElement.style.borderRadius = "10px";
    taskElement.style.width = "90%";
    taskElement.style.height = "20%";
    taskElement.style.margin = "5%";
    taskElement.style.backgroundColor = "white";

    // Styling Buttons
    updateButtonElement.style.width = "15%";
    updateButtonElement.style.height = "40%";
    updateButtonElement.style.backgroundColor = "rgb(66, 66, 66)";
    updateButtonElement.style.border = "none";
    updateButtonElement.style.borderRadius = "10px";
    updateButtonElement.style.color = "white";
    updateButtonElement.style.cursor = "pointer";


    deleteButtonElement.style.width = "15%";
    deleteButtonElement.style.height = "40%";
    deleteButtonElement.style.backgroundColor = "rgb(66, 66, 66)";
    deleteButtonElement.style.border = "none";
    deleteButtonElement.style.borderRadius = "10px";
    deleteButtonElement.style.color = "white";
    deleteButtonElement.style.cursor = "pointer";

    
    // Styling Check Box
    checkBox.style.width = "15%";
    checkBox.style.height = "40%";

    // Adding Content in Created Elements
    titleElement.textContent = value.Title;
    dateElement.textContent = value.Date;
    timeElement.textContent = value.Time;
    deleteButtonElement.textContent = "Delete";
    updateButtonElement.textContent = "Update";

    // Inserting Elements in Task Card
    taskElement.appendChild(checkBox)
    taskElement.appendChild(titleElement)
    taskElement.appendChild(dateElement)
    taskElement.appendChild(timeElement)
    taskElement.appendChild(updateButtonElement)
    taskElement.appendChild(deleteButtonElement)

   })
}
  
hasDisplayed = true;

}

function toggleView(e)
{
    let addTaskButton = document.getElementById("add-task");
    let viewTasksButton = document.getElementById("view-tasks");
    let allTasksDiv = document.getElementById("all-tasks");
    let form = document.getElementById("add-task-form");
    let buttonID = e.target.id;

    if(buttonID === "add-task")
    {
       addTaskButton.style.backgroundColor = "white";
       viewTasksButton.style.backgroundColor = "#D5FF98";
       allTasksDiv.style.display = "none";
       form.style.display = "flex";
    }  
    else
    {
       addTaskButton.style.backgroundColor = "#D5FF98";
       viewTasksButton.style.backgroundColor = "white";
       allTasksDiv.style.display = "block";
       form.style.display = "none";
       viewTasks();
    }
}

function addTask()
{
    let title = document.querySelector("#input1").value;
    let date = document.querySelector("#input2").value;
    let time = document.querySelector("#input3").value;

    let task = {
        Title : title,
        Date  : date,
        Time  : time
    }

    let taskObj = JSON.stringify(task);

    const keys = Object.keys(localStorage);
    let highestKeyNumber = validateKeys(keys);

    if(highestKeyNumber != 0)
    {
        highestKeyNumber++
        taskCount = highestKeyNumber;
    }
    else
    {
        taskCount++;
    }
    
    localStorage.setItem("task" + taskCount , taskObj);
}

function validateKeys(keys)
{
    const taskKeys = keys.filter(key => key.startsWith("task"));

    let highestKeyNumber = findHighestTaskKey(taskKeys);
   
    return highestKeyNumber;
}

function findHighestTaskKey(taskKeys) 
{
    let highestKeyNumber = 0;

    taskKeys.forEach(key => {

        const keyNumber = parseInt(key.replace("task", ""));

            if (keyNumber > highestKeyNumber) 
            {
                highestKeyNumber = keyNumber;
            }
    });

    return highestKeyNumber;
}

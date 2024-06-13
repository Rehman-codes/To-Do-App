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
    createElements(value);
   })
}
  
hasDisplayed = true;

}

function createElements(value)
{
 //  Elements to be added 
 let taskElement = document.createElement("div");
 let titleElement = document.createElement("h4");
 let dateElement = document.createElement("h5");
 let timeElement = document.createElement("h6");

 let updateButtonElement = document.createElement("button");
 let updateImageElement = document.createElement("img");
 updateImageElement.src = "edit.png";
 updateImageElement.alt = "Edit";
 updateButtonElement.appendChild(updateImageElement);

 let deleteButtonElement = document.createElement("button");
 let deleteImageElement = document.createElement("img");
 deleteImageElement.src = "delete.png";
 deleteImageElement.alt = "Delete";
 deleteButtonElement.appendChild(deleteImageElement);

 let statusButton = document.createElement("button");

 styleElements(updateButtonElement,deleteButtonElement,statusButton,taskElement,deleteImageElement,updateImageElement);
 addContent(titleElement,dateElement,timeElement,deleteButtonElement,updateButtonElement,taskElement,value,statusButton);
 insertElements(taskElement,titleElement,dateElement,timeElement,updateButtonElement,deleteButtonElement,statusButton);

}

function styleElements(updateButtonElement, deleteButtonElement, statusButton, taskElement,deleteImageElement,updateImageElement)
{
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
 updateButtonElement.style.width = "8%";
 updateButtonElement.style.height = "60%";
 updateButtonElement.style.backgroundColor = "rgb(66, 66, 66)";
 updateButtonElement.style.border = "none";
 updateButtonElement.style.borderRadius = "10px";
 updateButtonElement.style.color = "white";
 updateButtonElement.style.cursor = "pointer";


 deleteButtonElement.style.width = "8%";
 deleteButtonElement.style.height = "60%";
 deleteButtonElement.style.backgroundColor = "rgb(66, 66, 66)";
 deleteButtonElement.style.border = "none";
 deleteButtonElement.style.borderRadius = "10px";
 deleteButtonElement.style.color = "white";
 deleteButtonElement.style.cursor = "pointer";

 
 // Styling Status Button 
 statusButton.style.width = "25%";
 statusButton.style.height = "40%";
 statusButton.style.backgroundColor = "#F8ED62";
 statusButton.style.border = "none";
 statusButton.style.borderRadius = "10px";

 // Styling delete img
 deleteImageElement.style.height = "50%";
 deleteImageElement.style.width = "50%";

 // Styling delete img
 updateImageElement.style.height = "50%";
 updateImageElement.style.width = "50%";

}

function addContent(titleElement,dateElement,timeElement,deleteButtonElement,updateButtonElement,taskElement,value,statusButton)
{
     titleElement.textContent = value.Title;
     dateElement.textContent = value.Date;
     timeElement.textContent = value.Time;

     let targetValue = JSON.stringify(value);
     let allKeys = Object.keys(localStorage);


     fetchTaskCompletionStatus(allKeys,targetValue,value,statusButton);
     attachDeleteTask(allKeys,targetValue,deleteButtonElement,taskElement);
     updateTaskCompletionStatus(allKeys,targetValue,value,statusButton);
     attachUpdateTask(allKeys,targetValue,value,updateButtonElement,taskElement); 
}

function fetchTaskCompletionStatus(allKeys,targetValue,value,statusButton)
{
    allKeys.forEach(key =>{

        if(localStorage.getItem(key) === targetValue)
        {
            if(value.status === true)
            {
                statusButton.textContent = "Done";
                statusButton.style.backgroundColor = "#3F704D";
                statusButton.style.color = "white";
            }
            else
            {
                statusButton.textContent = "Pending";
                statusButton.style.backgroundColor = "#F8ED62";
                statusButton.style.color = "black";
            }
        }
     })
}

function attachDeleteTask(allKeys,targetValue,deleteButtonElement,taskElement)
{
    allKeys.forEach(key =>{

        if(localStorage.getItem(key) === targetValue)
        {
            deleteButtonElement.onclick = function() {
              localStorage.removeItem(key);
              taskElement.remove();
           };
        }
     })
}

function updateTaskCompletionStatus(allKeys,targetValue,value,statusButton)
{
    allKeys.forEach(key =>{

        if(localStorage.getItem(key) === targetValue)
        {
            statusButton.onclick = function() {

                if(statusButton.textContent === "Pending")
                {
                    statusButton.textContent = "Done";
                    statusButton.style.backgroundColor = "#3F704D";
                    statusButton.style.color = "white";
                    value.status = true;
                    let updatedWithStatus = JSON.stringify(value);
                    localStorage.setItem(key,updatedWithStatus);
                }
                else
                {
                    statusButton.textContent = "Pending";
                    statusButton.style.backgroundColor = "#F8ED62";
                    statusButton.style.color = "black";
                    value.status = false;
                    let updatedWithStatus = JSON.stringify(value);
                    localStorage.setItem(key,updatedWithStatus);
                }
           };
        }
     })
}

function attachUpdateTask(allKeys,targetValue,value,updateButtonElement,taskElement)
{
    allKeys.forEach(key =>{

        if(localStorage.getItem(key) === targetValue)
        {
            updateButtonElement.onclick = function() {

                let newHeading = prompt("Enter new title for the task:", value.Title);
                if (newHeading !== null) 
                {
                    let headingElement = taskElement.querySelector("h4");
                    if (headingElement) 
                    {
                        headingElement.textContent = newHeading;

                           let storedObject = JSON.parse(localStorage.getItem(key));
                           storedObject.Title = newHeading;
                           let updatedObj = JSON.stringify(storedObject);
                           localStorage.setItem(key ,updatedObj)
                        
                    }
                }


                let newDate = prompt("Enter new date for the task:", value.Date);
                if (newDate !== null) 
                {
                    let dateElement = taskElement.querySelector("h5");
                    if (dateElement) 
                    {
                        dateElement.textContent = newDate;

                       
                               let storedObject = JSON.parse(localStorage.getItem(key));
                               storedObject.Date = newDate;
                               let updatedObj = JSON.stringify(storedObject);
                               localStorage.setItem(key ,updatedObj)
                        
                    }
                }


                let newTime = prompt("Enter new time for the task:", value.Time);
                if (newTime !== null) 
                {
                    let timeElement = taskElement.querySelector("h6");
                    if (timeElement) 
                    {
                        timeElement.textContent = newTime;

                       
                               let storedObject = JSON.parse(localStorage.getItem(key));
                               storedObject.Time = newTime;
                               let updatedObj = JSON.stringify(storedObject);
                               localStorage.setItem(key ,updatedObj)
                            
                    }
                }
           };
        }
     })
}

function insertElements(taskElement,titleElement,dateElement,timeElement,updateButtonElement,deleteButtonElement,statusButton)
{
    let parentElement = document.getElementById('all-tasks');
    parentElement.style.overflowY = "scroll";
    parentElement.appendChild(taskElement);

    // Inserting Elements in Task Card
    taskElement.appendChild(statusButton)
    taskElement.appendChild(titleElement)
    taskElement.appendChild(dateElement)
    taskElement.appendChild(timeElement)
    taskElement.appendChild(updateButtonElement)
    taskElement.appendChild(deleteButtonElement)
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

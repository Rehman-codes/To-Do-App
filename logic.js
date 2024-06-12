let taskCount = 0;


function viewTasks()
{
  
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

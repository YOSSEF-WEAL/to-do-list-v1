// Call input fields
let input = document.querySelector(".input");
// Call input button submit
let submit = document.querySelector(".add");
// Call input button submit
let DeletAll = document.querySelector(".DeleetAll");
// Call input div tasks
let taskcDiv = document.querySelector(".tasks");

// Empty Array To Store The Tacks
let arrayOfTasks = [];

// Check if theres Tasks in local storage
if (localStorage.getItem("tasks"))
{
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local storage
getDataFromLocalStora();

// Add Tasck
submit.onclick = function ()
{
    if (input.value !== "")
    {
        addTaskToArray(input.value); // Add Task To Array Tasks
        input.value = ""; // Empty Input Field
    }
};

// Click On task Element
taskcDiv.addEventListener("click", (e) =>
{
    // Delete Button
    if (e.target.classList.contains("del"))
    {
        // remove task from local storege
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remov Elemnt From page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task"))
    {
        // Toggle completed for the task
        toggleStartasWith(e.target.getAttribute("data-id"));
        // Toggel Done class
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText)
{
    // Tack Data
    const task = {
        id: Date.now(),
        titel: taskText,
        completed: false,
    };
    // Push Tasck To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addeElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLoclStorageFrom(arrayOfTasks);
}

function addeElementsToPageFrom(arrayOfTasks)
{
    // Empty Tasks Div
    taskcDiv.innerHTML = "";
    // Looping on arrayOfTasks
    arrayOfTasks.forEach((task) =>
    {
        // Create min Div
        let div = document.createElement("div");
        div.className = "task";
        // Check if task id done
        if (task.completed)
        {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.titel));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        taskcDiv.appendChild(div);
    });
}



function addDataToLoclStorageFrom(arrayOfTasks)
{
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStora()
{
    let data = window.localStorage.getItem("tasks");
    if (data)
    {
        let tasks = JSON.parse(data);
        addeElementsToPageFrom(tasks);
    }
}
function deleteTaskWith(taskId)
{
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLoclStorageFrom(arrayOfTasks);
}

function toggleStartasWith(taskId)
{
    for (let i = 0; i < arrayOfTasks.length; i++)
    {
        if (arrayOfTasks[i].id == taskId)
        {
            arrayOfTasks[i].completed == false
                ? (arrayOfTasks[i].completed = true)
                : arrayOfTasks[i].completed == false;
            addDataToLoclStorageFrom(arrayOfTasks);
        }
    }
}



DeletAll.onclick = function ()
{
    localStorage.removeItem("tasks");
    taskcDiv.innerHTML = "";
    arrayOfTasks = [];
};


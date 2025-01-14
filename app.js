// Call input fields
let input = document.querySelector(".input");
// Call input button submit
let submit = document.querySelector(".add");
// Call input button submit
let DeletAll = document.querySelector(".DeleetAll");
// Call input div tasks
let taskcDiv = document.querySelector(".tasks");
// // btn done the task
// const btnDon = document.querySelector('.done');
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
    arrayOfTasks.forEach((task, id) =>
    {
        taskcDiv.insertAdjacentHTML('afterbegin', `
            <div class="task taskId-${id + 1}" data-id="${task.id}">
                <p class="textOfTask">${task.titel}</p>
                <div class="action d-inline-flex gap-1 align-items-center">
                    <span class="done"><i class="fa-solid fa-check"></i></span>
                    <span class="del"><i class="fa-solid fa-minus"></i></span>
                </div>
            </div>
        `);

        // Get the last added task and its delete button
        const SpanDel = taskcDiv.firstElementChild.querySelector('.del');

        // Add event listener to the delete button
        SpanDel.addEventListener('click', function ()
        {
            // Get the task element and its data-id
            const taskElement = this.closest('.task');
            const taskId = parseInt(taskElement.getAttribute('data-id'));

            // Remove the task from the DOM
            taskElement.remove();

            // Remove the task from arrayOfTasks and localStorage
            deleteTaskWith(taskId);
        });

        //     // btn done the task
        const btnDon = document.querySelector('.done');
        btnDon.addEventListener('click', function ()
        {
            const taskElement = this.closest('.task');
            taskElement.classList.add('done');
        })


    });
}

function deleteTaskWith(taskId)
{
    arrayOfTasks = arrayOfTasks.filter((task) => task.id !== taskId);
    addDataToLoclStorageFrom(arrayOfTasks);
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
        arrayOfTasks = JSON.parse(data);
        addeElementsToPageFrom(arrayOfTasks);
    }
}

function toggleStartasWith(taskId)
{
    for (let i = 0; i < arrayOfTasks.length; i++)
    {
        if (arrayOfTasks[i].id == taskId)
        {
            arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
            addDataToLoclStorageFrom(arrayOfTasks);
        }
    }
}


document.addEventListener('DOMContentLoaded', getDataFromLocalStora);


DeletAll.onclick = function ()
{
    localStorage.removeItem("tasks");
    taskcDiv.innerHTML = "";
    arrayOfTasks = [];
};


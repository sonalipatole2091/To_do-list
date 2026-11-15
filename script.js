

    // ========================================
// Interactive To-Do List
// JavaScript Fundamentals - Week 3-4
// ========================================


// Get HTML elements using DOM

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");


// Store tasks in an array

let tasks = [];


// ========================================
// ADD TASK
// ========================================

function addTask() {

    const taskText = taskInput.value.trim();


    // Check empty input

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Clear input

    taskInput.value = "";


    // Display tasks

    displayTasks();

}


// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    // Clear previous list

    taskList.innerHTML = "";


    // Check if there are no tasks

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create HTML for every task

    tasks.forEach((task) => {

        // Create list item

        const li = document.createElement("li");

        li.className = "task-item";


        // Add completed class

        if (task.completed) {

            li.classList.add("completed");

        }


        // Create task text

        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.innerText = task.text;


        // Create Edit button

        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.innerText = "Edit";


        // Create Delete button

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.innerText = "Delete";


        // ========================================
        // COMPLETE TASK
        // ========================================

        taskText.addEventListener("click", function () {

            task.completed = !task.completed;

            displayTasks();

        });


        // ========================================
        // EDIT TASK
        // ========================================

        editButton.addEventListener("click", function () {

            const newTask = prompt(
                "Update your task:",
                task.text
            );


            if (
                newTask !== null &&
                newTask.trim() !== ""
            ) {

                task.text = newTask.trim();

                displayTasks();

            }

        });


        // ========================================
        // DELETE TASK
        // ========================================

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );


            if (confirmDelete) {

                tasks = tasks.filter(function (item) {

                    return item.id !== task.id;

                });


                displayTasks();

            }

        });


        // Add elements to list item

        li.appendChild(taskText);

        li.appendChild(editButton);

        li.appendChild(deleteButton);


        // Add list item to task list

        taskList.appendChild(li);

    });


    // Update task counter

    updateTaskCount();

}


// ========================================
// UPDATE TASK COUNT
// ========================================

function updateTaskCount() {

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;


    taskCount.innerText =
        `${totalTasks} tasks | ${completedTasks} completed`;

}


// ========================================
// CLEAR ALL TASKS
// ========================================

function clearAllTasks() {

    if (tasks.length === 0) {

        return;

    }


    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );


    if (confirmClear) {

        tasks = [];

        displayTasks();

    }

}


// ========================================
// BUTTON EVENTS
// ========================================

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAllTasks);


// ========================================
// ENTER KEY SUPPORT
// ========================================

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ========================================
// INITIAL DISPLAY
// ========================================

displayTasks();
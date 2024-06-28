document.addEventListener("DOMContentLoaded", function () {
    let addTaskBtn = document.getElementById("addTaskBtn");
    let input = document.getElementById("input");
    let taskBox = document.getElementById("task-box");

    // Function to save tasks to local storage
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll(".task-wrapper").forEach(taskWrapper => {
            tasks.push({
                text: taskWrapper.querySelector("p").innerText,
                completed: taskWrapper.querySelector("p").style.textDecoration === "line-through"
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(task => {
                addTask(task.text, task.completed);
            });
        }
    }

    // Function to add a new task
    function addTask(taskText, completed = false) {
        let taskWrapper = document.createElement("div");
        taskWrapper.classList.add("task-wrapper", "d-flex", "justify-content-between", "align-items-center", "mb-2","w-100");

        let paragraph = document.createElement("p");
        paragraph.innerText = taskText;
        paragraph.classList.add("paragraph", "mb-0");
        if (completed) {
            paragraph.style.textDecoration = "line-through";
        }

        let buttonsDiv = document.createElement("div");

        let delbtn = document.createElement("button");
        delbtn.innerText = "Delete";
        delbtn.classList.add("btn", "btn-danger", "ml-2");

        let editbtn = document.createElement("button");
        editbtn.innerText = "Edit";
        editbtn.classList.add("btn", "btn-warning", "ml-2");

        buttonsDiv.appendChild(editbtn);
        buttonsDiv.appendChild(delbtn);
        taskWrapper.appendChild(paragraph);
        taskWrapper.appendChild(buttonsDiv);
        taskBox.appendChild(taskWrapper);

        input.value = "";

        paragraph.addEventListener("click", function () {
            paragraph.style.textDecoration = paragraph.style.textDecoration === "line-through" ? "none" : "line-through";
            saveTasks();
        });

        delbtn.addEventListener("click", function () {
            taskBox.removeChild(taskWrapper);
            saveTasks();
        });

        editbtn.addEventListener("click", function () {
            let newTask = prompt("Edit your task:", paragraph.innerText);
            if (newTask) {
                paragraph.innerText = newTask;
                saveTasks();
            }
        });

        saveTasks();
    }

    addTaskBtn.addEventListener("click", function () {
        if (input.value.trim() === "") {
            alert("Please enter a task");
            return;
        }
        addTask(input.value);
    });

    // Load tasks from local storage when the page loads
    loadTasks();
});

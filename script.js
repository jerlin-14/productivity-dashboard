// ======================
// CLOCK
// ======================

function updateClock() {
    const now = new Date();

    document.getElementById("clock").innerText =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();


// ======================
// TASK MANAGER
// ======================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask() {

    const input =
        document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    saveTasks();

    input.value = "";

    displayTasks(tasks);
}

function displayTasks(taskArray) {

    const list =
        document.getElementById("taskList");

    list.innerHTML = "";

    taskArray.forEach((task, index) => {

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span
                class="${task.completed ? 'completed' : ''}"
                onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks(tasks);
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks(tasks);
}

function filterTasks(type) {

    if (type === "all") {
        displayTasks(tasks);
    }

    if (type === "completed") {
        displayTasks(
            tasks.filter(
                task => task.completed
            )
        );
    }

    if (type === "pending") {
        displayTasks(
            tasks.filter(
                task => !task.completed
            )
        );
    }
}


// ======================
// TASK STATISTICS
// ======================

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    document.getElementById(
        "totalTasks"
    ).innerText = total;

    document.getElementById(
        "completedTasks"
    ).innerText = completed;

    document.getElementById(
        "pendingTasks"
    ).innerText = pending;
}


// ======================
// DARK MODE
// ======================

const themeBtn =
    document.getElementById(
        "theme-btn"
    );

if (
    localStorage.getItem("theme")
    === "dark"
) {
    document.body.classList.add(
        "dark-mode"
    );
}

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {
            localStorage.setItem(
                "theme",
                "dark"
            );
        } else {
            localStorage.setItem(
                "theme",
                "light"
            );
        }
    }
);


// ======================
// STOPWATCH
// ======================

let seconds = 0;
let timer;

function updateStopwatch() {

    let hrs =
        Math.floor(seconds / 3600);

    let mins =
        Math.floor(
            (seconds % 3600) / 60
        );

    let secs =
        seconds % 60;

    document.getElementById(
        "stopwatch"
    ).innerText =
        `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startStopwatch() {

    clearInterval(timer);

    timer = setInterval(() => {

        seconds++;

        updateStopwatch();

    }, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {

    clearInterval(timer);

    seconds = 0;

    updateStopwatch();
}


// ======================
// INITIAL LOAD
// ======================

displayTasks(tasks);
updateStats();
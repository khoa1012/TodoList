let app = document.getElementById("app");
app.classList.add("appWrap");
console.log(app);
//title
let title = document.createElement("h1");
title.classList.add("title");
title.textContent = "WELCOME TO THIS TODOLIST";

app.append(title);
//task input
let taskInput = document.createElement("div");
taskInput.setAttribute("id", "taskInput");
let idCount = 1;
let task = document.createElement("input");
task.setAttribute("type", "text");
task.setAttribute("id", "task");
let addTask = document.createElement("button");
addTask.textContent = "Add";
taskInput.append(task, addTask);
app.append(taskInput);
addTask.classList.add("btn");
//list body
let listBody = document.createElement("ul");
listBody.setAttribute("id", "listBody");
app.append(listBody);
//list of btn
let listBtn = document.createElement("div");
listBtn.setAttribute("id", "listBtn");

let resetTasks = document.createElement("button");
let saveTasks = document.createElement("button");
let loadTasks = document.createElement("button");
let taskStorage = [];
resetTasks.textContent = "Reset";
saveTasks.textContent = "Save";
loadTasks.textContent = "Load";
resetTasks.classList.add("btn", "resetBtn");
saveTasks.classList.add("btn", "saveBtn");
loadTasks.classList.add("btn", "loadBtn");
listBtn.append(resetTasks, saveTasks, loadTasks);
app.append(listBtn);

addTask.addEventListener("click", () => {
  addTaskAct();
});
resetTasks.addEventListener("click", () => {
  listBody.innerHTML = "";
  taskStorage = [];
});

saveTasks.addEventListener("click", () => {
  localStorage.setItem("todo", JSON.stringify(taskStorage));
});
loadTasks.addEventListener("click", () => {
  taskStorage = JSON.parse(localStorage.getItem("todo"));

  listBody.innerHTML = "";
  displayTasks();
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTaskAct();
  }
});
//funciton
function displayTasks() {
  listBody.innerHTML = "";
  
  if (taskStorage) {
    taskStorage.forEach((e) => {
      createNewTask(e);
    });
  }
}

function addTaskAct() {
  if (task.value !== "") {
    taskStorage.push({ id: idCount, value: task.value, checked: false });
    idCount++;
    displayTasks();
    task.value = "";
  }
}
function createNewTask(item) {
  let newTask = document.createElement("li");
  newTask.classList.add("tasks");
  newTask.textContent = `${item.value}`;
  newTask.setAttribute("id", item.id);

  let taskBtn = document.createElement("div");
  taskBtn.classList.add("taskBtn");
  let taskChecker = document.createElement("input");
  taskChecker.type = "checkbox";
  taskChecker.classList.add("checker");
  taskChecker.addEventListener("click", (e) => {
    newTask.classList.toggle("done");
    const li = e.target.closest("li");
    const id = Number(li.id);
    taskStorage.forEach((e) => {
      if (e.id === id) {
        e.checked = e.checked === false ? true : false;
      }
    });
  });
  if (item.checked === true) {
    taskChecker.checked = true;
    newTask.classList.add("done");
  }

  let removeTask = document.createElement("button");
  removeTask.classList.add("icon", "btn");
  removeTask.innerHTML = `<i class="fa-solid fa-x"></i>`;

  removeTask.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    console.log(li);
    const id = Number(li.id);
    taskStorage = taskStorage.filter((task) => task.id !== id);
    console.log(taskStorage);
    displayTasks();
  });
  taskBtn.append(taskChecker, removeTask);
  newTask.append(taskBtn);
  listBody.append(newTask);
}

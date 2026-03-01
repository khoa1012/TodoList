const app = document.getElementById("app");
app.classList.add("appWrap");
console.log(app);
//title
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "WELCOME TO THIS TODOLIST";

app.append(title);
//task input
const taskInput = document.createElement("div");
taskInput.setAttribute("id", "taskInput");
let idCount = 1;
const task = document.createElement("input");
task.setAttribute("type", "text");
task.setAttribute("id", "task");
task.setAttribute("placeholder","Click Add or press Enter")
const addTask = document.createElement("button");
addTask.textContent = "Add";
//const search = document.createElement("button");
//search.textContent = "Search";
taskInput.append(task, addTask);
app.append(taskInput);
addTask.classList.add("btn");
//search.classList.add("btn", "searchBtn");
//searching
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Type here to search");
searchInput.classList.add("inputText", "searchInput");
app.append(searchInput);

searchInput.addEventListener("input", (e) => {
  const find = e.target.value.toLowerCase();
  if (e.target.value === "") {
    displayTasks(taskStorage);
  } else {
    let newTaskStorage = taskStorage.filter((item) => 
      item.value.toLowerCase().includes(find)
    );
    
    displayTasks(newTaskStorage);
  }
});
//list body
const listBody = document.createElement("ul");
listBody.setAttribute("id", "listBody");
app.append(listBody);
//list of btn
const listBtn = document.createElement("div");
listBtn.setAttribute("id", "listBtn");

const resetTasks = document.createElement("button");
const saveTasks = document.createElement("button");
const loadTasks = document.createElement("button");
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
  displayTasks(taskStorage);
});
task.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTaskAct();
  }
});
//funciton
function displayTasks(Storage) {
  listBody.innerHTML = "";

  if (Storage) {
    Storage.forEach((e) => {
      createNewTask(e);
    });
  }
}

function addTaskAct() {
  if (task.value !== "") {
    taskStorage.push({ id: idCount, value: task.value, checked: false });
    idCount++;
    displayTasks(taskStorage);
    task.value = "";
  }
}
listBody.addEventListener("click", (e) => {
  console.log("target", e.target);
  const trigger = e.target.closest("button.removeTask");

  console.log("target", e.target);
  if (trigger) {
    const li = e.target.closest("li");
    const id = Number(li.id);
    console.log(li);
    taskStorage = taskStorage.filter((task) => task.id !== id);
    console.log(taskStorage);
  }
  const secondTrigger = e.target.closest("input.taskChecker");
  console.log("target", e.target);
  if (secondTrigger) {
    const li = e.target.closest("li");
    const id = Number(li.id);
    li.classList.toggle("done"); //use Li right here instead of newTask because newTask is the last <li> that has been created, not the li that has been triggered
    console.log("go into here first");
    taskStorage.forEach((e) => {
      console.log("go into here");
      if (e.id === id) {
        e.checked = e.checked === false ? true : false;
      }
    });
  }
  displayTasks(taskStorage);
});
function createNewTask(item) {
  const newTask = document.createElement("li");
  newTask.classList.add("tasks");
  newTask.textContent = `${item.value}`;
  newTask.setAttribute("id", item.id);

  const taskBtn = document.createElement("div");
  taskBtn.classList.add("taskBtn");
  const taskChecker = document.createElement("input");
  taskChecker.type = "checkbox";
  taskChecker.classList.add("checker", "taskChecker");
  if (item.checked === true) {
    taskChecker.checked = true;
    newTask.classList.add("done");
  }

  const removeTask = document.createElement("button");
  removeTask.classList.add("icon", "btn", "removeTask");
  removeTask.innerHTML = `<i class="fa-solid fa-x"></i>`;

  taskBtn.append(taskChecker, removeTask);
  newTask.append(taskBtn);
  listBody.append(newTask);
}

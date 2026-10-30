 const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-task");

// Add a new task
addButton.addEventListener("click", function () {
const text = taskInput.value.trim();

if (text === "") {
    return;
}

const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = text;
span.dataset.taskText = text;

const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.dataset.action = "edit";

li.append(span, editButton);
taskList.append(li);

taskInput.value = "";

});

// Event delegation for Edit button clicks
taskList.addEventListener("click", function (event) {
if (event.target.dataset.action !== "edit") {
return;
}

const li = event.target.parentElement;
const span = li.querySelector("span");

if (!span) {
    return;
}

const input = document.createElement("input");
input.type = "text";
input.value = span.textContent;
input.dataset.action = "save";

span.remove();
event.target.before(input);

input.focus();

});

// Event delegation for saving with Enter
taskList.addEventListener("keydown", function (event) {
if (event.key !== "Enter") {
return;
}

if (event.target.dataset.action !== "save") {
    return;
}

const input = event.target;
const newText = input.value.trim();

if (newText === "") {
    input.focus();
    return;
}

const li = input.parentElement;

const span = document.createElement("span");
span.textContent = newText;
span.dataset.taskText = newText;

input.remove();

const editButton = li.querySelector('[data-action="edit"]');
li.insertBefore(span, editButton);

});
// Add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});
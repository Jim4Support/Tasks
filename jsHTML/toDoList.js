const tasks = document.getElementById('tasks');
const showTasksButtonElement = document.getElementById('showTasks');
const buttonAddTask = document.getElementById('submit-task');


let switcher = false;

/*buttonAddTask.onsubmit = () => {
    if (inputTextArea.value === ' ' || inputTextArea.value.length === 0) {
        errorInput.innerText = 'Please, enter a task title'
        inputTextArea.focus();
        return false;
    } else {
        errorInput.innerText = '';
        createTask();
        inputTextArea.value = '';
        inputTextArea.focus();
        inputDescArea.value = '';
    }
}*/

showTasksButtonElement.onclick = () => {
    switcher = !switcher;
    renderTask();
}

function hideTasks(id, done) {
    const tasksElement = document.getElementById(id);
    tasksElement.classList.toggle('hiddenTask', done);
}

function correctDate(dueDate) {
    if (dueDate) {
        const noZeroDay = new Date(dueDate).getDate();
        const day = noZeroDay.toString().length === 1 ? (0 + noZeroDay.toString()) : noZeroDay;
        const noZeroMonth = new Date(dueDate).getMonth() + 1;
        const month = noZeroMonth.toString().length === 1 ? (0 + noZeroMonth.toString()) : noZeroMonth;
        const year = new Date(dueDate).getFullYear();
        return `${day}.${month}.${year}`;
    } else return '~no date~';
}

function renderTask() {
    tasks.innerHTML = '';
    data.forEach(generateTasks);
}

function overdue(dueDate) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now > dueDate;
}

function deleteTask(event) {
    const target = event.target.parentElement.parentElement;
    target.remove();
    const deleteParentId = target.id;
    const task = data.find(t => t.id === +deleteParentId);
    data.splice(data.indexOf(task), 1);
}

function doneSwitcher(event) {
    const target = event.target.parentElement;
    const checkboxParentId = event.target.parentElement.parentElement.parentElement.id;
    const task = data.find(t => t.id === +checkboxParentId);
    if (task.done) {
        task.done = !task.done;
        target.style.textDecoration = "none";
    } else {
        task.done = !task.done;
        target.style.textDecoration = "line-through";
    }
    renderTask();
}

class Task {
    constructor(id, dueDate, done, name, description) {
        if (typeof name === 'object') {
            Object.assign(this, name);
        } else {
            this.id = id;
            this.dueDate = dueDate;
            this.done = done;
            this.name = name;
            this.description = description;
        }
    }

    toString() {
        return `${this.id} ${this.dueDate} ${this.done} ${this.name} ${this.description}`;
    }
}

let data = [
    new Task (1, new Date('2022-08-28'), false, 'hometask', null),
    new Task (2, new Date('2022-08-29'), false, 'officetask', 'make office work'),
    new Task (3, new Date('2022-08-28'), true, 'shopping', 'buy vegetables'),
    new Task (4, null, true, 'walk', 'go for a walk'),
    new Task (5, new Date('2022-08-26'), false, 'CSS Figma', 'to do adaptive mobile first'),
];

function generateTasks(fields) {
    const {dueDate, done, name, description} = fields;
    const textDecoration = done ? 'line-through' : 'none';
    const dateColor = (overdue(dueDate) && !done) ? 'red' : '';
    tasks.innerHTML += `
    <div id="${fields.id}" class="tasksElement">
        <div class="date" style="color: ${dateColor}">
        ${correctDate(dueDate)}
        </div>
        <div class="doneNameDesc">
    <label style="text-decoration:${textDecoration}"><input onclick="doneSwitcher(event)" type="checkbox" name="checkfield" id="isDone" ${done ? 'checked' : ''}>
    <strong>${name}</strong></label>
    </div>
    <p class="desc">${description ? description : '~no description~'} <br>
    </p>
    <span class="delete">
    <button onclick="deleteTask(event)">delete</button>
    </span>
    <hr>
    </div>`
    if (!switcher) {
        hideTasks(fields.id, done);
    } else {
        hideTasks(fields.id, false);
    }
}

renderTask();

const tasksForm = document.forms['task-input'];
tasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(tasksForm);
    const task = new Task (Object.fromEntries(formData.entries()));
    console.log(task)
    data.push(task);
    generateTasks(task);
    tasksForm.reset();
})

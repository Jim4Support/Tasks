function getTasks() {
    return fetch('http://localhost:4000/tasks').then(response => response.json());
}

function addTask(task) {
    return fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
        .catch(error)
}

function removeTask(id) {
    return fetch('http://localhost:4000/tasks/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

function updateTask(task) {
    return fetch('http://localhost:4000/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

const tasks = document.getElementById('tasks');
const showTasksButtonElement = document.getElementById('showTasks');
const inputTask = document.getElementsByName('name');
const inputDesc = document.getElementsByName('description');
const inputDate = document.getElementsByName('dueDate');
const errorInput = document.getElementById('errorInput');
const tasksForm = document.forms['task-input'];

const inc = (init = 0) => () => ++init
const genId = inc();

let switcher = false;

class Task {
    constructor(id, dueDate, done, name, description) {
        if (typeof name === 'object') {
            Object.assign(this, name);
        } else {
            this.id = genId();
            this.dueDate = dueDate || null;
            this.done = done || false;
            this.name = name;
            this.description = description || null;
        }
    }

    toString() {
        return `${this.id} ${this.dueDate} ${this.done} ${this.name} ${this.description}`;
    }
}

let data = [
    new Task(1, new Date('2022-08-29'), false, 'hometask', null),
    new Task(2, new Date('2022-08-30'), false, 'officetask', 'make office work'),
    new Task(3, new Date('2022-08-29'), true, 'shopping', 'buy vegetables'),
    new Task(4, null, true, 'walk', 'go for a walk'),
    new Task(5, new Date('2022-08-26'), false, 'CSS Figma', 'to do adaptive mobile first'),
];

function error() {
    tasks.innerText = 'Something went wrong';
}

tasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputTask[0].value.trim() === null || inputTask[0].value.trim() === '') {
        errorInput.innerText = 'Please, enter a task';
    } else {
        errorInput.innerText = '';
        const formData = new FormData(tasksForm);
        const formTask = Object.fromEntries(formData.entries());
        data.push(new Task(data.id, onPushDate(inputDate[0].value), false, inputTask[0].value, inputDesc[0].value.trim()));
        addTask(formTask).then(generateTasks)
            .then(_ => tasksForm.reset())
        renderTask();
    }
});

showTasksButtonElement.onclick = () => {
    switcher = !switcher;
    renderTask();
}

function onPushDate(dueDate) {
    if (dueDate) {
        const day = new Date(dueDate).getDate();
        const month = new Date(dueDate).getMonth();
        const year = new Date(dueDate).getFullYear();
        return new Date(year, month, day);
    } else return null;
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
    if (dueDate !== null) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now > dueDate;
    }
}

function deleteTask(event) {
    const target = event.target.parentElement.parentElement;
    target.remove();
    const deleteParentId = target.id;
    const taskIndex = data.findIndex(t => t.id === +deleteParentId);
    data.splice(taskIndex, 1);
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

function generateTasks(fields) {
    const {dueDate, done, name, description} = fields;
    const textDecoration = done ? 'line-through' : 'none';
    const dateColor = (overdue(dueDate) && !done) ? 'red' : '';
    const backColor = (overdue(dueDate) && !done) ? 'red' : done ? 'green' : 'grey';
    tasks.innerHTML += ` <div id="${fields.id}" class="tasksElement"> <hr class="hr" size="5px" style="background-color: ${backColor}">
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
    </div>`
    if (!switcher) {
        hideTasks(fields.id, done);
    } else {
        hideTasks(fields.id, false);
    }
}

renderTask();

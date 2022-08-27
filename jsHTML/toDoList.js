const tasks = document.getElementById('tasks');
const showTasksButtonElement = document.getElementById('showTasks');
let switcher = false;

showTasksButtonElement.onclick = () => {
    switcher = !switcher;
    renderTask();
}

function correctDate(dueDate) {
    if (dueDate) {
        const day = new Date(dueDate).getDate();
        const noZeroMonth = new Date(dueDate).getMonth() + 1;
        const month = noZeroMonth.toString().length === 1 ? (0 + noZeroMonth.toString()) : noZeroMonth;
        const year = new Date(dueDate).getFullYear();
        return `${day}.${month}.${year}`;
    } else return '~no date~';
}

function renderTask(){
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

let data = [
    {id: 1, dueDate: new Date('2022-08-27'), done: false, name: 'hometask', description: null},
    {id: 2, dueDate: new Date('2022-08-28'), done: false, name: 'officetask', description: 'make office work'},
    {id: 3, dueDate: new Date('2022-08-27'), done: true, name: 'shopping', description: 'buy vegetables'},
    {id: 4, dueDate: null, done: true, name: 'walk', description: 'go for a walk'},
    {id: 5, dueDate: new Date('2022-08-26'), done: false, name: 'CSS Figma', description: 'to do adaptive mobile first'}
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
    if (!switcher){
    hideTasks(fields.id, done);
    } else {
        hideTasks(fields.id, false);
    }
}
function hideTasks(id, done) {
    const tasksElement = document.getElementById(id);
    tasksElement.classList.toggle('hiddenTask', done);
}
renderTask();
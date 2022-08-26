let data = [
    {id: 1, dueDate: new Date('2022-08-26'), done: false, name: 'hometask', description: ''},
    {id: 2, dueDate: new Date('2022-08-27'), done: false, name: 'officetask', description: 'make office work'},
    {id: 3, dueDate: new Date('2022-08-26'), done: true, name: 'shopping', description: 'buy vegetables'},
    {id: 4, dueDate: new Date(''), done: true, name: 'walk', description: 'go for a walk'},
    {id: 5, dueDate: new Date('2022-08-25'), done: false, name: 'CSS Figma', description: 'to do adaptive mobile first'}
];

const tasks = document.querySelector('div');

function overdue(dueDate) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const fullDate = `${day}.${month}.${year}`;
    console.log(fullDate);
    return now < dueDate ? true : false;
}
console.log(overdue(new Date('2022-08-25')));


class isCheck {
    constructor(check) {
        if (check.checked) {
            this.done = check.checked;
        } else {
            this.done = check.checked;
        }
    }
}

const generateTasks = (id, dueDate, done, name, description) => {
    const day = new Date(dueDate).getDate();
    const month = new Date(dueDate).getMonth() + 1;
    const year = new Date(dueDate).getFullYear();
    const fullDate = `${day}.${month}.${year}`
    return `
    <div class="todo-item">
        <div class="date">
        ${fullDate}
        </div>
        <div class="checkAndName">
    <label><input type="checkbox" name="checkfield" id="isDone" ${done ? 'checked' : ''}><strong>${name}</strong></label>
    </div>
    <p class="desc">${description}<hr></p>
    </div>`
}

const taskHTML = data.map(task => {
    return generateTasks(task.id, task.dueDate, task.done, task.name, task.description);
}).join('');

tasks.innerHTML = taskHTML;

console.log(tasks);

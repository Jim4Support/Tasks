let data = [
    {id: 1, dueDate: '23.08.22', done: false, name: 'hometask', description: 'make homework'},
    {id: 2, dueDate: '24.08.22', done: false, name: 'officetask', description: 'make office work'},
    {id: 3, dueDate: '22.08.22', done: false, name: 'shopping', description: 'buy vegetables'},
    {id: 4, dueDate: '23.08.22', done: false, name: 'walk', description: 'go for a walk'},
    {id: 5, dueDate: '21.08.22', done: false, name: 'CSS Figma', description: 'to do adaptive mobile first'}
];
const getList = document.getElementById('toDoList')
function allTasks(task) {
    const {dueDate, done, name, description} = task;
    getList.innerHTML += `<div><p id="date">${dueDate}</p> <div id="name">${done} <strong>${name}</strong></div> <span>${description}</span></div>`
}
data.forEach(allTasks);

function findById(id) {
    let findId = data.find(f => f.id === id)
    findId = findId.done !== true;
}
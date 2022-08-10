const express = require('express');
const app = express();

function logRequest({method, url}, res, next) { // middleware проміжний код, який виконується до того, як почне виконувати основний код
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);

const inc = (init = 0) => () => ++init
const genListId = inc();
const lists = [
    {id: genListId(), name: 'Today'},
    {id: genListId(), name: 'Tomorrow'},
    ];

const createToDoList = data => {
    return {
        id: genListId(),
        name: data.name,
        tasks: [],
    }
}

app.get('/lists', (req, res) => res.json(lists)); //curl localhost:3000/lists
app.get('/lists/:listId', (req, res) => {
    const listId = parseInt(req.params.listId);
    if (!listId) {
        res.status(404).json({error: 'Task not found'});
        return;
    }
    const list = lists.find(l => l.id === listId);
    if (!list) {
        res.status(404).json({error: 'Task not found'});
        return;
    }
    res.json(list);
});

app.get('/lists/:listId/tasks', (req, res) => {
    const listId = parseInt(req.params.listId);
    if (!listId) {
        res.status(404).json({error: 'Task not found'});
        return;
    }
    const listOfTasks = listId ? tasks.filter(t => t.listId === listId) : tasks;
    res.json(listOfTasks);
    if (!listOfTasks) {
        res.status(404).json({error: 'Task not found'});
        return;
    }
});

app.post('/lists', (req, res) => { //curl localhost:3000/lists -d '{ "name": "Posted" }' -H "Content-Type: application/json"
    let task = createToDoList(req.body);
    lists.push(task);
    res.json(task);
});

app.delete('/lists/:listId', (req, res) => { //curl -X DELETE localhost:3000/lists/3
    const listId = parseInt(req.params.listId);
    const task = lists.find(l => l.id === listId);
    if (task) {
        lists.forEach((el) => {
            if (el.id === listId) {
                lists.splice(lists.indexOf(el), 1);
            }
        });
        res.json(lists);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});
app.put('/lists/:listId', (req, res) => { //curl -X PUT localhost:3000/lists/3 -d '{"name": "Changed" }' -H "Content-Type: application/json"
    const taskId = parseInt(req.params.listId);
    const task = lists.find(l => l.id === taskId);
    if (task) {
        lists.forEach(el => {
            if (el.id === taskId) {
                lists.splice(lists.indexOf(el), 1, req.body);
            }
        });
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

app.patch('/lists/:listId', (req, res) => { //curl -X PATCH localhost:3000/lists/3 -d '{"name": "Changed" }' -H "Content-Type: application/json"
    const listId = parseInt(req.params.listId);
    const task = lists.find(l => l.id === listId);
    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});
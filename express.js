const express = require('express');
const app = express();

function logRequest({method, url}, res, next) { // middleware проміжний код, який виконується до того, як почне виконувати основний код
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);
const inc = (init = 0) => () => ++init
const genId = inc();
const tasks = [
    {id: genId(), name: 'Get task'},
    {id: genId(), name: 'Create task'},
];
const createTask = data => {
    return {
        id: genId(),
        name: data.name,
        done: false,
    }
}
app.get('/tasks', (req, res) => res.json(tasks)) //curl localhost:3000/tasks

app.post('/tasks', (req, res) => { //curl localhost:3000/tasks -d '{ "name": "Generate ID" }' -H "Content-Type: application/json"
    let task = createTask(req.body);
    tasks.push(task);
    res.json(task);
});

app.patch('/tasks/:id', (req, res) => { //curl -X PATCH localhost:3000/tasks/3 -d '{"name": "Changed" }' -H "Content-Type: application/json"
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        Object.assign(task, req.body);
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
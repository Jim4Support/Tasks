const express = require('express');
const client = require('./dbclient');
const app = express();

function logRequest({method, url}, res, next) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    next();
}

app.use(express.json());
app.use(logRequest);

const tasks = [
    {name: 'Get task'},
];
const createTask = data => {
    return {
        name: data.name,
        done: false,
    }
}
app.get('/tasks', (req, res) => {
    client.query('SELECT * FROM items', (error, result) => {//curl localhost:3000/tasks
        if (error) {
            throw error;
        } else {
            res.json(result.rows);
        }
    })
});
    
app.post('/tasks', (req, res) => { //curl localhost:3000/tasks -d '{ "name": "Generate ID" }' -H "Content-Type: application/json"
    client.query('SELECT * FROM items', id, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.json(result.rows);
        }
    })
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

export default app;

import {createTask, getTasks, getSingleTask, updateTask, putTask, deleteTask} from "../models/tasks_model.js";
import Router from 'express';
export const router = new Router();

router.post('/tasks', create);
router.get('/tasks', get);
router.get('/tasks/:id', getSingle);
router.patch('/tasks/:id', update);
router.put('/tasks/:id', put);
router.delete('/tasks/:id', del);


function create(req, res, next) { // curl localhost:4000/tasks -d '{"name": "created task", "done": false, "dueDate": "2022-10-12", "description": "some desc", "listId": 1}' -H "Content-Type: application/json"
    const {done, name, dueDate, listId, description} = req.body;
    createTask(done, name, new Date(dueDate), listId, description).then(t => res.status(201).json(t))
        .catch(next)
}
function get(req, res, next) { // curl localhost:4000/tasks
    getTasks().then(t => res.json(t))
        .catch(next)
}

function getSingle(req, res, next) { // curl localhost:4000/tasks/2
    const id = req.params.id;
    getSingleTask(id)
        .then(t => t ? res.json(t) : res.sendStatus(404))
        .catch(next)
}
function update(req, res, next) { // curl -X PATCH localhost:4000/tasks/14 -d '{"name": "Changed", "done": true, "dueDate": "2022-08-13", "listId": 2, "description": "changed" }' -H "Content-Type: application/json"
    const id = req.params.id;
    getSingleTask(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({done, name, dueDate, listId, description}) => updateTask(id, done, name, new Date(dueDate), listId, description))
        .then(t => res.json(t))
        .catch(next)
}
function put(req, res, next) { // curl -X PUT localhost:4000/tasks/14 -d '{"name": "put changed", "dueDate": "2022-08-14", "listId": 1, "description": "already put" }' -H "Content-Type: application/json"
    const id = req.params.id;
    const done = req.body.done;
    const name = req.body.name || null;
    const dueDate = req.body.dueDate || null;
    const listId = req.body.listId || null;
    const description = req.body.description || null;
    putTask(id, done, name, dueDate, listId, description).then(t => res.json(t))
        .catch(next)
}
function del(req, res, next) { // curl -X DELETE localhost:4000/tasks/14
    const id = req.params.id;
    let data;
    getSingleTask(id).then(d => data = d);
    deleteTask(id).then(() => res.json(data))
        .catch(next)
}

/*
    (false, 'to do a hometask', '2022-08-12', 3, 'learn english'),
    (false, 'go to the cafe on a corner', '2022-08-13', 1, 'drink some, eat some'),
    (true, 'listen lecture', '2022-08-11', 2, 'listen lecture profile subject'),
    (false, 'to do office duties', '2022-08-13', 2, 'make the table in excel'),
    (false,'go for a walk', '2022-08-12', 1, 'walk on the street of red lights'),
    (true, 'learn two subjects', '2022-08-12', 3, 'learn history and math');*/

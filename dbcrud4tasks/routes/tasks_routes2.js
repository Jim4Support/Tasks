import {createTask, getTasks, getTodayTasks, getSingleTask, updateTask, putTask, deleteTask} from "../models/tasks_model.js";
import Router from 'express';
export const router = new Router();

router.post('/tasks', create);
router.get('/tasks', get);
router.get('/tasks/:id', getSingle);
router.patch('/tasks/:id', update);
router.put('/tasks/:id', put);
router.delete('/tasks/:id', del);
router.get('/dashboard', getToday);

function getToday(req, res, next) { // curl localhost:4000/dashboard
    getTodayTasks().then(t => res.json(t))
        .catch(next)
}

function create(req, res, next) { // curl localhost:4000/tasks -d '{"title": "loading", "done": false, "due_date": "2022-10-11", "desc": "some text", "list_id": 5}' -H "Content-Type: application/json"
    const {done, title, due_date} = req.body;
    createTask(done, title, due_date).then(t => res.status(201).json(t))
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
function update(req, res, next) { // curl -X PATCH localhost:4000/tasks/2 -d '{"title": "Changed" }' -H "Content-Type: application/json"
    const id = req.params.id;
    getSingleTask(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({id, done, title, due_date}) => updateTask(id, done, title, due_date))
        .then(t => res.json(t))
       .catch(next)
}
function put(req, res, next) { // curl -X PUT localhost:4000/tasks/1 -d '{"title": "Changed", "due_date": "2022-05-05" }' -H "Content-Type: application/json"
    const id = req.params.id;
    const done = req.body.done || false;
    const title = req.body.title || 'text';
    const due_date = req.body.due_date || '2022-01-01'
    putTask(id, done, title, due_date).then(t => res.json(t))
        .catch(next)
}
function del(req, res, next) { // curl -X DELETE localhost:4000/tasks/3
    const id = req.params.id;
    deleteTask(id).then(t => res.json(t))
        .catch(next)
}

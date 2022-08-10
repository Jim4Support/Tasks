import {createTask, getTasks, getSingleTask, updateTask, putTask, deleteTask} from "../models/tasks_model.js";
import Router from 'express';
import express from 'express';
export const router = new Router();

router.use(express.json());

router.post('/tasks', create);
router.get('/tasks', get);
router.get('/tasks/:id', getSingle);
router.patch('/tasks/:id', update);
router.put('/tasks/:id', put);
router.delete('/tasks/:id', del);

function create(req, res) { // curl localhost:4000/tasks -d '{"title": "created", "done": true, "due_date": "2022-10-10"}' -H "Content-Type: application/json"
    const {done, title, due_date} = req.body;
    createTask(done, title, due_date).then(t => res.status(201).json(t))
        .catch(() => res.sendStatus(500))
}
function get(req, res) { // curl localhost:4000/tasks
    getTasks().then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function getSingle(req, res) { // curl localhost:4000/tasks/2
    const id = req.params.id;
    getSingleTask(id).then(t => t ? res.json(t) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}
function update(req, res) { // curl -X PATCH localhost:4000/tasks/2 -d '{"title": "Changed" }' -H "Content-Type: application/json"
    const id = req.params.id;
    getSingleTask(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({id, done, title, due_date}) => updateTask(id, done, title, due_date))
        .then(t => res.json(t))
       .catch(() => res.sendStatus(500))
}
function put(req, res) { // curl -X PUT localhost:4000/tasks/1 -d '{"title": "Changed", "due_date": "2022-05-05" }' -H "Content-Type: application/json"
    const id = req.params.id;
    const done = req.body.done || false;
    const title = req.body.title || 'text';
    const due_date = req.body.due_date || '2022-01-01'
    putTask(id, done, title, due_date).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function del(req, res) { // curl -X DELETE localhost:4000/tasks/3
    const id = req.params.id;
    deleteTask(id).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
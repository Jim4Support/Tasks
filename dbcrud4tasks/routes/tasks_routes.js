import {createTask, getTasks, getSingleTask, updateTask, putTask, deleteTask} from "../controllers/tasks_controllers.js";
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

function create(req, res) {
    const {title, done} = req.body;
    createTask(title, done).then(t => res.status(201).json(t))
        .catch(() => res.sendStatus(500))
}
function get(req, res) {
    getTasks().then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function getSingle(req, res) {
    const id = req.params.id;
    getSingleTask(id).then(t => t ? res.json(t) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}
function update(req, res) {
    const id = req.params.id;
    getSingleTask(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({id, done, title, due_date}) => updateTask(id, done, title, due_date))
        .then(t => res.json(t))
       .catch(() => res.sendStatus(500))
}
function put(req, res) {
    const id = req.params.id;
    const done = req.body.done;
    const title = req.body.title;
    const due_date = req.body.dataset;
    putTask(id, done, title, due_date).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function del(req, res) {
    const id = req.params.id;
    deleteTask(id).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
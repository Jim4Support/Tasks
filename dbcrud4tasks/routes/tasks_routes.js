import {createTask,getTasks,getSingleTask,updateTask,deleteTask} from "../controllers/tasks_controllers";
import {Router} from "express";
import express from "express";
export const router = new Router();

router.use(express.json());
router.post('/tasks', create)
router.get('/tasks', getTasks)
router.get('/tasks/:id', getSingleTask)
router.put('/tasks', updateTask)
router.delete('/tasks/:id', deleteTask)

function create(req, res) {
    const {title, done} = req.body;
    createTask(title, done).catch(() => res.status(500))
        .then(t => res.status(200).json(t))
}
function get(req, res) {
    const {title, done} = req.body;
    createTask(title, done).catch(() => res.status(500))
        .then(t => res.status(200).json(t))
}
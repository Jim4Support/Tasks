import {createLists, getLists, getSingleList, updateLists, putLists, deleteLists} from "../models/lists_model2.js";
import Router from 'express';
import {getTodayTasks} from "../models/tasks_model.js";
export const router = new Router();

router.get('/lists', get);
router.get('/lists/:id', getSingle);
router.get('/dashboard', getToday);

function getToday(req, res, next) { // curl localhost:4000/dashboard
    getTodayTasks().then(t => res.json(t))
        .catch(next)
}
function get(req, res, next) { // curl localhost:4000/lists
    getLists().then(t => res.json(t))
        .catch(next)
}
function getSingle(req, res, next) { // curl localhost:4000/lists/2
    const id = req.params.id;
    getSingleList(id).then(t => t ? res.json(t) : res.sendStatus(404))
        .catch(next)
}

import {getTodayCount, getTodayTasks, notDoneTasks, listUndoneTasks, allTasks} from "../models/lists_model2.js";
import Router from 'express';
export const routerList = new Router();

routerList.get('/dashboard', getToday);
routerList.get('/collections/today', todayTasks);
routerList.get('/lists/:listId/tasks', undoneTasks);

function getToday(req, res, next) { // curl localhost:4000/dashboard
    Promise.all([getTodayCount(), notDoneTasks()])
        .then(t => res.json({'Today count': t[0], 'Name list': t[1]}))
        .catch(next)
}
function todayTasks(req, res, next) { // curl localhost:4000/collections/today
    getTodayTasks().then(t => res.json(t))
        .catch(next)
}
function undoneTasks(req, res, next) { // curl localhost:4000/lists/:listId/tasks
    const all = req.query.all || false;
    const listId = req.params.listId;
    if (all) {
        allTasks(listId).then(t => res.json(t))
            .catch(next)
    } else {
        listUndoneTasks(listId).then(t => res.json(t))
            .catch(next)
    }
}
import {getTodayCount, getTodayTasks, notDoneTasks, listUndoneTasks} from "../models/lists_model2.js";
import Router from 'express';
export const routerList = new Router();

routerList.get('/dashboard', getToday);
routerList.get('/collections/today', todayTasks);
routerList.get('/lists/:listId/tasks', undoneTasks);

function getToday(req, res, next) { // curl localhost:4000/dashboard
    Promise.all([getTodayCount(), notDoneTasks()])
        .then(t => res.json({'Today count': +t[0][0].count, 'Name list': t[1].map((el)=>{
            return {name: el.name,
                id: el.id,
                undone: parseInt(el.undone)
            }
            })}))
        .catch(next)
}
function todayTasks(req, res, next) { // curl localhost:4000/collections/today
    getTodayTasks().then(t => res.json(t.map(el => {
        return {
            title: el.title,
            item_id: el.item_id,
            done: el.done,
            date: el.due_date,
            list: {list_name: el.list, list_id: el.list_id}
        }
    })))
        .catch(next)
}
function undoneTasks(req, res, next) { // curl localhost:4000/lists/3/tasks
    const all = req.query.all || null;
    const listId = req.params.listId;
        listUndoneTasks(listId, all).then(t => res.json(t))
            .catch(next)
}
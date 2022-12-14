// SQL
import {getTodayCount, getTodayTasks, notDoneTasks, listUndoneTasks} from "../models/lists_model2.js";
import Router from 'express';
export const routerList = new Router();

routerList.get('/dashboard', getToday);
routerList.get('/collections/today', todayTasks);
routerList.get('/lists/:listId/tasks', undoneTasks);

function getToday(req, res, next) { // curl localhost:4000/dashboard
    Promise.all([getTodayCount(), notDoneTasks()])
        .then(t => res.json({'Today count': +t[0].count, 'Name list': t[1].map((el)=>{
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
            name: el.name,
            itemId: el.id,
            done: el.done,
            date: el.dueDate,
            list: {listName: el.lists, listId: el.listId}
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
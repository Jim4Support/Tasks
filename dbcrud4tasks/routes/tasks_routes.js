// SQL
import {createTask, getTasks, getSingleTask, updateTask, putTask, deleteTask} from "../models/tasks_model.js";
import Router from 'express';
export const router = new Router();

router.post('/tasks', create);
router.get('/tasks', get);
router.get('/tasks/:id', getSingle);
router.patch('/tasks/:id', update);
router.put('/tasks/:id', put);
router.delete('/tasks/:id', del);


function create(req, res, next) { // curl localhost:4000/tasks -d '{"title": "created task", "done": false, "due_date": "2022-10-12", "description": "some desc", "list_id": 1}' -H "Content-Type: application/json"
    const {done, title, due_date, list_id, description} = req.body;
    createTask(done, title, due_date, list_id, description).then(t => res.status(201).json(t))
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
function update(req, res, next) { // curl -X PATCH localhost:4000/tasks/14 -d '{"title": "Changed", "done": true, "due_date": "2022-08-13", "list_id": 2, "description": "changed" }' -H "Content-Type: application/json"
    const id = req.params.id;
    getSingleTask(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({id, done, title, due_date, list_id, description}) => updateTask(id, done, title, due_date, list_id, description))
        .then(t => res.json(t))
        .catch(next)
}
function put(req, res, next) { // curl -X PUT localhost:4000/tasks/14 -d '{"title": "put changed", "due_date": "2022-08-14", "list_id": 1, "description": "already put" }' -H "Content-Type: application/json"
    const id = req.params.id;
    const done = req.body.done || false;
    const title = req.body.title;
    const due_date = req.body.due_date || null;
    const list_id = req.body.list_id;
    const description = req.body.description;
    putTask(id, done, title, due_date, list_id, description).then(t => res.json(t))
        .catch(next)
}
function del(req, res, next) { // curl -X DELETE localhost:4000/tasks/14
    const id = req.params.id;
    deleteTask(id).then(t => res.json(t))
        .catch(next)
}

/*
    (false, 'to do a hometask', '2022-08-12', 3, 'learn english'),
    (false, 'go to the cafe on a corner', '2022-08-13', 1, 'drink some, eat some'),
    (true, 'listen lecture', '2022-08-11', 2, 'listen lecture profile subject'),
    (false, 'to do office duties', '2022-08-13', 2, 'make the table in excel'),
    (false,'go for a walk', '2022-08-12', 1, 'walk on the street of red lights'),
    (true, 'learn two subjects', '2022-08-12', 3, 'learn history and math');*/

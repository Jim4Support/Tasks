import {createLists, getLists, getSingleList, updateLists, putLists, deleteLists} from "../models/lists_model";
import Router from 'express';
export const router = new Router();

router.post('/lists', create);
router.get('/lists', get);
router.get('/lists/:id', getSingle);
router.patch('/lists/:id', update);
router.put('/lists/:id', put);
router.delete('/lists/:id', del);

function create(req, res) { // curl localhost:4000/lists -d '{"title": "created", "done": true, "due_date": "2022-10-10"}' -H "Content-Type: application/json"
    const {done, title, due_date} = req.body;
    createLists(done, title, due_date).then(t => res.status(201).json(t))
        .catch(() => res.sendStatus(500))
}
function get(req, res) { // curl localhost:4000/lists
    getLists().then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function getSingle(req, res) { // curl localhost:4000/lists/2
    const id = req.params.id;
    getSingleList(id).then(t => t ? res.json(t) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}
function update(req, res) { // curl -X PATCH localhost:4000/lists/2 -d '{"title": "Changed" }' -H "Content-Type: application/json"
    const id = req.params.id;
    getSingleList(id).then(oldTask => Object.assign(oldTask, req.body))
        .then(({id, done, title, due_date}) => updateLists(id, done, title, due_date))
        .then(t => res.json(t))
       .catch(() => res.sendStatus(500))
}
function put(req, res) { // curl -X PUT localhost:4000/lists/1 -d '{"title": "Changed", "due_date": "2022-05-05" }' -H "Content-Type: application/json"
    const id = req.params.id;
    const done = req.body.done || false;
    const title = req.body.title || 'text';
    const due_date = req.body.due_date || '2022-01-01'
    putLists(id, done, title, due_date).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}
function del(req, res) { // curl -X DELETE localhost:4000/lists/3
    const id = req.params.id;
    delete(id).then(t => res.json(t))
        .catch(() => res.sendStatus(500))
}

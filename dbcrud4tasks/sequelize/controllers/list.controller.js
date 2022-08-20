import {db} from "../models/index.js";
const List = db.list;

export const findAll = (req, res) => {
    return List.findAll().then(data => res.json(data))
}

export const createList = (req, res) => {
    const names = req.body.name;
    return List.create({name: names}).then(name => res.json(name))
}

export const deleteList = (req, res) => {
    const listId = req.params.id;
    return List.destroy({where:{id: listId}}).then(data => res.json(data))
}
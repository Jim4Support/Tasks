import {db} from "../models/index.js";
const List = db.list;

export const findAll = (req, res, next) => {
    return List.findAll()
        .then(data => res.json(data))
        .catch(next)
}

export const createList = (req, res, next) => {
    const names = req.body.name;
    console.log(names)
    return List.create({name: names}).then(name => res.json(name))
        .catch(next)
}

export const deleteList = (req, res, next) => {
    const list_id = req.params.id;
    return List.destroy({where:{id: list_id}})
        .then(l => l ? res.sendStatus(200) : res.sendStatus(404))
        .catch(next)
}

export const updateList = (req, res, next) => {
    const list_id = req.params.id;
    return List.update({
        name: req.body.name
    }, {
        where: {id: list_id}
    }).then(data => data ? res.sendStatus(200) : res.sendStatus(404))
        .catch(next)
}
import {db} from "../models/index.js";
const List = db.list;

export const findAll = (req, res) => {
    return List.findAll().then(data => res.json(data))
}



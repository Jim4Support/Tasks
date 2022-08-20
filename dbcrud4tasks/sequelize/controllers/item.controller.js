import {db} from "../models/index.js";
const Item = db.item;

export const findAll = (req, res) => {
    const today = new Date();
    return Item.findAll({include: [{
        association: db.itemList,
        as: 'items',
    }],
        where: {due_date: today}
}).then(data => res.json(data))
}


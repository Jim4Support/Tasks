import {db} from "../models/index.js";

const Item = db.item;

export const findAll = (req, res, next) => {
    const today = new Date();
    return Item.findAll({
        include: [{
            association: db.itemList,
            as: 'items',
        }],
        where: {dueDate: today}
    }).then(data => res.json(data))
        .catch(next)
}
// where: { dueDate: { [Op.lte]: today } },
//     order: [['dueDate', 'ASC']]

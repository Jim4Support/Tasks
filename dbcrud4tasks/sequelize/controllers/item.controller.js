import {db} from "../models/index.js";
import Sequelize from "sequelize";
const op = Sequelize.Op;

const Item = db.item;

export const findAll = (req, res, next) => {
    const today = new Date();
    return Item.findAll({
        include: [{
            association: db.itemList,
            as: 'items',
        }],
        where: {
            dueDate: {
              [op.lte]: today
            },
            done: false
        },
        order: [['dueDate', 'ASC']]
    }).then(data => res.json(data))
        .catch(next)
}
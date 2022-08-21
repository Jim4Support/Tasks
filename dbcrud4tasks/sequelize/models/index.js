import {config} from "../database/db.config.js";
import {Sequelize} from "sequelize";
import {listModel} from "./list.model.js";
import {itemModel} from "./items.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect
});

export const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.item = itemModel(sequelize, Sequelize);
db.list = listModel(sequelize, Sequelize);

db.itemList = db.item.belongsTo(db.list, {
    foreignKey: 'listId',
    as: 'list',
    onDelete: 'CASCADE'
});

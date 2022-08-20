import {INTEGER, STRING} from "sequelize";

export function listModel(sequelize) {
    return sequelize.define("lists", {
            name: {
                type: STRING,
            },
            id: {
                primaryKey: true,
                type: INTEGER,
                nullable: false,
                autoIncrement: true
            },
        },
        {
            timestamps: false
        });
}
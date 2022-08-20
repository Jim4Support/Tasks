export function itemModel(sequelize, Sequelize) {
    return sequelize.define("items", {
            title: {
                type: Sequelize.STRING
            },
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            done: {
                type: Sequelize.BOOLEAN
            },
            due_date: {
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.STRING
            },
            list_id: {
                type: Sequelize.INTEGER
            },
        },
        {
            timestamps: false
        });
}
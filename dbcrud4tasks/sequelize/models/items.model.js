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
            dueDate: {
                type: Sequelize.DATE
            },
            description: {
                type: Sequelize.STRING
            },
            listId: {
                type: Sequelize.INTEGER
            },
        },
        {
            timestamps: false
        });
}
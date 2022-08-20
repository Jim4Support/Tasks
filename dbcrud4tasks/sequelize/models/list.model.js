export function listModel(sequelize, Sequelize) {
    const List = sequelize.define("lists", {
        name: {
            type: Sequelize.STRING
        },
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false
    })
    return List;
}
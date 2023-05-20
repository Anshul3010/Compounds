function CompoundModel(sequelize, Sequelize){
    const Compound = sequelize.define("compound", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.TEXT
        },
        link: {
            type: Sequelize.TEXT
        },
        dateModified: {
            type: Sequelize.DATE
        }
    },{
        timestamps: false
    });

    return Compound;
}

module.exports = CompoundModel;

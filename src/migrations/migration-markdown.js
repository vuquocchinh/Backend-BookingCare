"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("markdowns", {
            //     contentHTML: DataTypes.TEXT('long'),
            // contentMarkdown: DataTypes.TEXT('long'),
            // description: DataTypes.TEXT('long'),
            // doctorId: DataTypes.INTEGER,
            // specialtyId: DataTypes.INTEGER,
            // clinicId: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT("long"),
            },
            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            specialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("markdowns");
    },
};

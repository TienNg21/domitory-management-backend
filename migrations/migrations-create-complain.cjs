"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Complains", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         studentId: {
            type: Sequelize.INTEGER,
         },
         type: {
            type: Sequelize.STRING,
         },
         level: {
            type: Sequelize.STRING,
         },
         content: {
            type: Sequelize.TEXT,
         },
         status: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         response: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         deletedAt: Sequelize.DATE,
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Complains");
   },
};

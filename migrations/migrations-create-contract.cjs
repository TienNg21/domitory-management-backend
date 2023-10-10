"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Contracts", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         startDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         endDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         studentId: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         status: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         roomId: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         priceRoom: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         priceInternet: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         priceElectric: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         priceWater: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         priceParking: {
            type: Sequelize.INTEGER,
            allowNull: true,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Contract");
   },
};

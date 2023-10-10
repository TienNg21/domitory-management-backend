"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Rooms", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         buildingId: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         roomCategoryId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: {
            //    model: "RoomCategories",
            //    key: "id",
            // },
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
      await queryInterface.dropTable("Rooms");
   },
};

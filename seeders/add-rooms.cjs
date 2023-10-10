"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Rooms",
         [
            {
               name: "101",
               buildingId: 1,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "201",
               buildingId: 1,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "101",
               buildingId: 2,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "301",
               buildingId: 3,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "301",
               buildingId: 1,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "102",
               buildingId: 1,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "103",
               buildingId: 1,
               roomCategoryId: 1,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      ),

   async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
   },
};

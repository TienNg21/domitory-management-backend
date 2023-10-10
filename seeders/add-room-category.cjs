"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "RoomCategories",
         [
            {
               name: "Có điều hòa 1",
               description: "Có điều hòa, bình nóng lạnh",
               capacity: 10,
               priceRoom: 250000,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "Có điều hòa 2",
               description: "Có điều hòa, bình nóng lạnh",
               capacity: 15,
               priceRoom: 250000,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "Có điều hòa 3",
               description: "Có điều hòa, bình nóng lạnh",
               capacity: 6,
               priceRoom: 300000,
               createdAt: new Date(),
               updatedAt: new Date(),
            }
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

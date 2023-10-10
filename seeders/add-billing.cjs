"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Billings",
         [
            {
               startDate: "2022-11-29 03:20:00",
               endDate: "2022-12-29 03:20:00",
               isPaid: false,
               studentId: 2,
               roomId: 1,
               priceRoom: 250000,
               priceInternet: 30000,
               priceElectric: 200000,
               priceWater: 20000,
               priceParking: 20000,
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

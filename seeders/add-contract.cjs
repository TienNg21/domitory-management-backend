"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Contracts",
         [
            {
               startDate: "2022-10-01 03:20:00",
               endDate: "2023-10-01 03:20:00",
               studentId: 2,
               roomId: 1,
               status: "inuse",
               priceRoom: 250000,
               priceInternet: 30000,
               priceElectric: 200000,
               priceWater: 20000,
               priceParking: 20000,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               startDate: "2022-10-01 03:20:00",
               endDate: "2023-10-01 03:20:00",
               studentId: 3,
               roomId: 2,
               status: "inuse",
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

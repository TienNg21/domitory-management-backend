"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Requests",
         [
            {
               type: "room",
               studentId: 2,
               roomId: 1,
               status: "accepted",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               type: "room",
               studentId: 3,
               roomId: 2,
               status: "accepted",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               type: "room",
               studentId: 4,
               roomId: 1,
               status: "pending",
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

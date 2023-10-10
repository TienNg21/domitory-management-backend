"use strict";

const { hashString } = require("../src/middlewares/bcrypt.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async (queryInterface) =>
      queryInterface.bulkInsert(
         "Buildings",
         [
            {
               name: "B3",
               address: "Số 7 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "B10",
               address: "Số 7 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "B8",
               address: "Số 13 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "B5",
               address: "Số 9 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "B13",
               address: "Số 13 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               name: "B6",
               address: "Số 7 Tạ Quang Bửu, Hai Bà Trưng",
               numberOfFloor: 4,
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

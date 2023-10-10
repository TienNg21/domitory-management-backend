"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Users", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         email: {
            type: Sequelize.STRING,
         },
         name: {
            type: Sequelize.STRING,
         },
         password: {
            type: Sequelize.STRING,
         },
         studentCode: {
            type: Sequelize.STRING,
         },
         role: {
            type: Sequelize.STRING,
         },
         status: {
            type: Sequelize.STRING,
         },
         roomId: {
            type: Sequelize.INTEGER,
         },
         generation: {
            // khóa
            type: Sequelize.STRING,
         },
         phoneNumber: {
            type: Sequelize.STRING,
         },
         ethnic: {
            // dân tộc
            type: Sequelize.STRING,
         },
         religion: {
            // tôn giáo
            type: Sequelize.STRING,
         },
         gender: {
            type: Sequelize.STRING,
         },
         faculty: {
            // viện trường
            type: Sequelize.STRING,
         },
         majors: {
            // chuyên ngành
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
      await queryInterface.dropTable("Users");
   },
};

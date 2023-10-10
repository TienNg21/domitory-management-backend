"use strict";

const { hashString } = require("../src/middlewares/bcrypt.cjs");

module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define(
      "User",
      {
         email: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         studentCode: {
            type: DataTypes.STRING,
            allowNull: true,
         },
         role: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         status: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         roomId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
               model: "Room",
               key: "id",
            },
         },
         generation: {
            type: DataTypes.STRING,
         },
         phoneNumber: {
            type: DataTypes.STRING,
         },
         ethnic: {
            // dân tộc
            type: DataTypes.STRING,
         },
         religion: {
            // tôn giáo
            type: DataTypes.STRING,
         },
         gender: {
            type: DataTypes.STRING,
         },
         faculty: {
            // viện trường
            type: DataTypes.STRING,
         },
         majors: {
            // chuyên ngành
            type: DataTypes.STRING,
         },
      },
      {
         hooks: {
            beforeCreate: async (user) => {
               user.password = hashString(user.password);
            },
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   User.associate = function (models) {
      // associations can be defined here
      User.hasOne(models.request, {
         foreignKey: "studentId",
         sourceKey: "id",
      });
      User.belongsTo(models.room, {
         foreignKey: "roomId",
         targetKey: "id",
      });
      User.hasMany(models.complain, {
         foreignKey: "studentId",
         sourceKey: "id",
      });
      User.hasMany(models.contract, {
         foreignKey: "studentId",
         sourceKey: "id",
      });
      User.hasMany(models.billing, {
         foreignKey: "studentId",
         sourceKey: "id",
      });
   };
   return User;
};

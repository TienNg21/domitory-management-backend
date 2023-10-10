"use strict";

module.exports = (sequelize, DataTypes) => {
   const Contract = sequelize.define(
      "Contract",
      {
         startDate: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         endDate: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Student",
               key: "id",
            },
         },
         status: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Room",
               key: "id",
            },
         },
         priceRoom: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceInternet: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceElectric: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceWater: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         priceParking: {
            type: DataTypes.INTEGER,
            allowNull: true,
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Contract.associate = function (models) {
      // associations can be defined here
      Contract.belongsTo(models.room, {
         foreignKey: "roomId",
         targetKey: "id",
      });
      Contract.belongsTo(models.user, {
         foreignKey: "studentId",
         targetKey: "id",
      });
   };
   return Contract;
};

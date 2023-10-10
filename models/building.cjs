"use strict";

module.exports = (sequelize, DataTypes) => {
   const Building = sequelize.define(
      "Building",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         address: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         numberOfFloor: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Building.associate = function (models) {
      // associations can be defined here
      Building.hasMany(models.room, {
         foreignKey: "buildingId",
         sourceKey: "id",
      });
   };
   return Building;
};

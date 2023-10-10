"use strict";

module.exports = (sequelize, DataTypes) => {
   const Room = sequelize.define(
      "Room",
      {
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         buildingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Building",
               key: "id",
            },
         },
         roomCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "RoomCategory",
               key: "id",
            },
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Room.associate = function (models) {
      // associations can be defined here
      Room.belongsTo(models.roomCategory, {
         foreignKey: "roomCategoryId",
         targetKey: "id",
      });
      Room.belongsTo(models.building, {
         foreignKey: "buildingId",
         targetKey: "id",
      });
      Room.hasMany(models.request, {
         foreignKey: "roomId",
         sourceKey: "id",
      });
      Room.hasMany(models.user, {
         foreignKey: "roomId",
         sourceKey: "id",
      });
      Room.hasMany(models.contract, {
         foreignKey: "roomId",
         sourceKey: "id",
      });
      Room.hasMany(models.billing, {
         foreignKey: "roomId",
         sourceKey: "id",
      });
   };
   return Room;
};

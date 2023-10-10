"use strict";

module.exports = (sequelize, DataTypes) => {
   const Request = sequelize.define(
      "Request",
      {
         type: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "User",
               key: "id",
            },
         },
         roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: "Room",
               key: "id",
            },
         },
         status: {
            type: DataTypes.STRING,
            default: "pending",
            allowNull: false,
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Request.associate = function (models) {
      // associations can be defined here
      Request.belongsTo(models.room, {
         foreignKey: "roomId",
         targetKey: "id",
      });
      Request.belongsTo(models.user, {
         foreignKey: "studentId",
         targetKey: "id",
      });
   };
   return Request;
};

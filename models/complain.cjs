"use strict";

module.exports = (sequelize, DataTypes) => {
   const Complain = sequelize.define(
      "Complain",
      {
         studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
               model: "user",
               key: "id",
            },
         },
         type: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         content: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         level: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         status: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         response: {
            type: DataTypes.STRING,
         },
      },
      {
         deletedAt: "deletedAt",
         paranoid: true,
         timestamps: true,
      }
   );
   Complain.associate = function (models) {
      // associations can be defined here
      Complain.belongsTo(models.user, {
         foreignKey: "studentId",
         targetKey: "id",
      });
   };
   return Complain;
};

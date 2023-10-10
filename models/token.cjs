'use strict';

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(
        'Token',
        {
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            expires: {
                type: DataTypes.DATE,
            }
        },
        {
            deletedAt: 'deletedAt',
            paranoid: true,
            timestamps: true,
        },
    );
    Token.associate = function (models) {
        // associations can be defined here
    };
    return Token;
};
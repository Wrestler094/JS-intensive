const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    sequelize.define('user', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countGames: {
            type: DataTypes.INTEGER,
        },
        countWins: {
            type: DataTypes.INTEGER,
        },
        destroy4cage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destroy3cage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destroy2cage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destroy1cage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
    }, {
        freezeTableName: true,
        tableName: 'User'
    });
};
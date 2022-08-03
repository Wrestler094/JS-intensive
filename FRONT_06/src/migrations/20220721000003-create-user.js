'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countGames: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      countWins: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      destroy4cage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      destroy3cage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      destroy2cage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      destroy1cage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
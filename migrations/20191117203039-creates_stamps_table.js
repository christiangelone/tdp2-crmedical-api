'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('stamps', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }),

  down: (queryInterface, _) => queryInterface.dropTable('stamps')
};
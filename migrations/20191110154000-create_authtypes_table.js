'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('authtypes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('authtypes')
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('zones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('zones')
};
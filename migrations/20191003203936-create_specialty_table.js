'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('specialties', {
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
  down: (queryInterface, _) => queryInterface.dropTable('specialties')
};
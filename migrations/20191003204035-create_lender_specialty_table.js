'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('lender_specialty', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      lender_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      specialty_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('lender_specialty')
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('lenders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      languages: {
        type: Sequelize.STRING,
        default: 'Español'
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emails: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('lenders')
};
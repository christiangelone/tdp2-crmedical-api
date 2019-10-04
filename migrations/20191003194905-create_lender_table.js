'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('lenders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('lenders')
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('offices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
          type: Sequelize.STRING,
          default: ''
      },
      lat: {
          type: Sequelize.STRING,
          allowNull: false
      },
      lon: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      zone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'zones',
            key: 'id'
        }
      },
      lender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'lenders',
            key: 'id'
        }
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('offices')
};

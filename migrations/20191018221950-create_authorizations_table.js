'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('authorizations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'PENDING'
      },
      specialty_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specialties',
          key: 'id'
        }
      },
      affiliate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'affiliates',
          key: 'id'
        }
      }
    }),

  down: (queryInterface, _) => queryInterface.dropTable('authorizations')
    
};

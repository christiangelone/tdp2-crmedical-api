'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('lender_specialty', {
      lender_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'lenders',
              key: 'id'
          }
      },
      specialty_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'specialties',
              key: 'id'
          }
      }
    }),
  down: (queryInterface, _) => queryInterface.dropTable('lender_specialty')
};
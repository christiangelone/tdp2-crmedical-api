'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('authorizations', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    }),
    queryInterface.addColumn('authorizations', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    })
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('authorizations', 'created_at'),
    queryInterface.removeColumn('authorizations', 'updated_at')
  ])
};

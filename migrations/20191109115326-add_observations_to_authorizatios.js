'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('authorizations', 'observations', {
      type: Sequelize.TEXT
    })
  ]),

  down: (queryInterface, _) => Promise.all([
    queryInterface.removeColumn('authorizations', 'observations')
  ])
};

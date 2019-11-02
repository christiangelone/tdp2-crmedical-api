'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('affiliate', 'device_token', {
      type: Sequelize.TEXT
    })
  ]),

  down: (queryInterface, _) => Promise.all([
    queryInterface.removeColumn('affiliate', 'device_token')
  ])
};

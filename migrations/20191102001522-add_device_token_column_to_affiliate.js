'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('affiliates', 'device_token', {
      type: Sequelize.TEXT
    })
  ]),

  down: (queryInterface, _) => Promise.all([
    queryInterface.removeColumn('affiliates', 'device_token')
  ])
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('authorizations', 'authtype_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'authtypes',
        key: 'id'
      }
    })
  ]),

  down: (queryInterface, _) => Promise.all([
    queryInterface.removeColumn('authorizations', 'authtype_id')
  ])
};

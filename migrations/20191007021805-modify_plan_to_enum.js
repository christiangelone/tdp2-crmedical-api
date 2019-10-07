'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('lenders', 'plan', {
      type: Sequelize.ENUM(
        'A110',
        'A210',
        'A310'
      ),
      allowNull: false
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('lenders', 'plan', {
      type: Sequelize.STRING,
      allowNull: false
    })
};

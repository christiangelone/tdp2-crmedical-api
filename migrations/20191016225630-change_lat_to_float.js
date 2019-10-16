'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('offices', 'lat', {
      type: 'FLOAT USING CAST("lat" as FLOAT)',
      allowNull: false
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('offices', 'lat', {
      type: Sequelize.STRING,
      allowNull: false
    })
};

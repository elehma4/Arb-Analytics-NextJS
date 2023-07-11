'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'protocols', // name of the table
      'geckoID', // name of the new column
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('protocols', 'geckoID');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'UserId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'UserId', {});
  }
};

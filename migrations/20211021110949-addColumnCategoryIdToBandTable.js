'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('GuestStars', 'CategoryId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      } 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('GuestStars', 'CategoryId', {});
  }
};

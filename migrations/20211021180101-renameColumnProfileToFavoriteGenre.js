'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Profiles", "photo", "favoriteGenre", {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Profiles', 'favoriteGenre', 'photo', {});
  }
};

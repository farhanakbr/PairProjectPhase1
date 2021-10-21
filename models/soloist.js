'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Soloist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Soloist.belongsTo(models.Concert, {foreignKey: 'ConcertId'})
      Soloist.belongsTo(models.SoloistSong, {foreignKey: 'SoloistId'})
    }
  };
  Soloist.init({
    name: DataTypes.STRING,
    debutYear: DataTypes.DATE,
    ConcertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Soloist',
  });
  return Soloist;
};
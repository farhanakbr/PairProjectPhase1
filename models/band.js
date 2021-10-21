'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Band.belongsTo(models.Concert, {foreignKey: 'ConcertId'})
      Band.hasMany(models.BandSong, {foreignKey: 'BandId'})
    }
  };
  Band.init({
    name: DataTypes.STRING,
    debutYear: DataTypes.DATE,
    ConcertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};
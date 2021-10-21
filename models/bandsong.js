'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BandSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BandSong.belongsTo(models.Band, {foreignKey: 'BandId'})
    }
  };
  BandSong.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    BandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BandSong',
  });
  return BandSong;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoloistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SoloistSong.belongsTo(models.Soloist, {foreignKey: 'SoloistId'})
    }
  };
  SoloistSong.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    SoloistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SoloistSong',
  });
  return SoloistSong;
};
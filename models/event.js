'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Concert, {foreignKey: 'ConcertId'})
      Event.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Event.init({
    UserId: DataTypes.INTEGER,
    ConcertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
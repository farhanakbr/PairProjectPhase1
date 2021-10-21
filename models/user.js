'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {foreignKey: 'UserId'})
      User.belongsToMany(models.Concert, {through: models.Event})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'User name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Uncorrect email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Date of birth is required'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    validate: {
      isLegal() {
        if (this.dateOfBirth !== '') {
          if (2021 - this.dateOfBirth.getFullYear() < 18) {
            throw new Error('Your age is not illegal')
          }
        }
      }
    }, 
    hooks: {
      beforeCreate(instance, option) {
        let password = instance.password
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        instance.password = hash
        if (!instance.role) {
          instance.role = 'User'
        }
      }
    },
    modelName: 'User',
  });
  return User;
};
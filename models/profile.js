'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: 'UserId' })
    }

    get formatDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      return this.dateOfBirth.toLocaleDateString('id-ID', options);

    }
  };
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name is required!'
        },
        notNull: {
          msg: 'First Name is required!'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last Name is required!'
        },
        notNull: {
          msg: 'Last Name is required!'
        },
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date of birth is required!'
        },
        notNull: {
          msg: 'Date of birth is required!'
        },
      }
    },
    favoriteGenre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Favorite Genre is required!'
        },
        notNull: {
          msg: 'Favorite Genre is required!'
        },
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
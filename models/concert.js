'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Concert extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get dateFormat() {
      return this.date.toLocaleDateString('id-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    get priceToRupiah() {
      return this.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }

    static associate(models) {
      Concert.belongsToMany(models.User, {through: models.Event})
      Concert.hasMany(models.GuestStars, {foreignKey: 'ConcertId'})
    }
  };
  Concert.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Location is required'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isValidDate(value) {
          if (value < new Date()) {
            throw new Error('the earliest time is tomorrow')
          }
        },
        notEmpty: {
          msg: 'Date is required'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image URL is required'
        }, 
        isUrl: {
          msg: 'Image Url must URL type'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Concert',
  });
  return Concert;
};
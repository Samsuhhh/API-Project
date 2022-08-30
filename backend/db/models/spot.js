'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 250]
      }

    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
       validate: {len: [2, 250]}
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 250] }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 250] }
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 250] }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 250] }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { min: 1 }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class protocols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  protocols.init({
    name: DataTypes.STRING,
    llamaID: DataTypes.INTEGER,
    description: DataTypes.STRING,
    symbol: DataTypes.STRING,
    url: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'protocols',
  });
  return protocols;
};
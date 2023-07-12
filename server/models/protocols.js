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
      this.belongsToMany(models.users, { through: models.favorites, foreignKey: 'protocolID' });
    }
  }
  protocols.init({
    name: DataTypes.STRING,
    llamaID: DataTypes.INTEGER,
    description: DataTypes.STRING,
    symbol: DataTypes.STRING,
    url: DataTypes.STRING,
    logo: DataTypes.STRING,
    TVL: DataTypes.DOUBLE,
    MCAP: DataTypes.DOUBLE,
    geckoID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'protocols',
  });
  return protocols;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, {foreignKey: 'userID'});
      this.belongsTo(models.protocols, {foreignKey: 'protocolID'});
    }
  }
  favorites.init({
    userID: DataTypes.INTEGER,
    protocolID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favorites',
  });
  return favorites;
};
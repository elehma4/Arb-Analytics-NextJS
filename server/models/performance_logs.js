'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class performance_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  performance_logs.init({
    event_category: DataTypes.STRING,
    event_type: DataTypes.STRING,
    event_value: DataTypes.TEXT,
    page_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'performance_logs',
  });
  return performance_logs;
};
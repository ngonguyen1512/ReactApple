'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Function extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Function.belongsTo(models.Permission, {foreignKey: 'idPermission', targetKey: 'id', as: 'functionPermission'});
    }
  }
  Function.init({
    name: DataTypes.STRING,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Function',
  });
  return Function;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.hasOne(models.Menu, {foreignKey: 'idPermission', as: 'permissions'})
      Permission.hasOne(models.Account, {foreignKey: 'idPermission', as: 'permissionsAccount'})
      Permission.hasOne(models.Transfer, {foreignKey: 'idPermission', as: 'transferpermission'})
      Permission.hasOne(models.Function, {foreignKey: 'idPermission', as: 'functionPermission'})
    }
  }
  Permission.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};
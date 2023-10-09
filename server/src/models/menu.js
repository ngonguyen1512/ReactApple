'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'permissions' });
    }
  }
  Menu.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};
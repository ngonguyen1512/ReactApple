'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Permission, { foreignKey: 'idPermission', targetKey: 'id', as: 'permissionsAccount' });
      Account.hasOne(models.Like, { foreignKey: 'idAccount', as: 'like_account' })
    }
  }
  Account.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    idPermission: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
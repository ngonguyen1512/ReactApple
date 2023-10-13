'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admit.hasOne(models.AdmitDetail, {foreignKey: 'idAdmit', as: 'admit_detail'})
      Admit.belongsTo(models.Account, {foreignKey: 'idAccount', targetKey: 'id', as: 'account_admit'});
    }
  }
  Admit.init({
    idProvider: DataTypes.INTEGER,
    idAccount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    idAccept: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Admit',
  });
  return Admit;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasOne(models.InvoiceDetail, {foreignKey: 'idInvoice', as: 'invoice_detail'})
      Invoice.belongsTo(models.Account, {foreignKey: 'idAccount', targetKey: 'id', as: 'account_invoice'});
    }
  }
  Invoice.init({
    idAccount: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    total: DataTypes.INTEGER,
    idAccept: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
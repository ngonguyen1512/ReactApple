'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoiceDetail.belongsTo(models.Invoice, {foreignKey: 'idInvoice', targetKey: 'id', as: 'invoice_detail'});
      InvoiceDetail.belongsTo(models.Product, {foreignKey: 'idProduct', targetKey: 'id', as: 'product_invoicedetail'});
      
    }
  }
  InvoiceDetail.init({
    idInvoice: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceDetail',
  });
  return InvoiceDetail;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: 'idCategory', targetKey: 'id', as: 'categories'});
      Product.belongsTo(models.Provider, {foreignKey: 'idProvider', targetKey: 'id', as: 'providers'});
      Product.belongsTo(models.Prices, {foreignKey: 'code', targetKey: 'id', as: 'prices'});
      Product.belongsTo(models.Sample, {foreignKey: 'idSample', targetKey: 'id', as: 'samples'});
      Product.hasOne(models.InvoiceDetail, {foreignKey: 'idProduct', as: 'product_invoicedetail'})
      Product.hasOne(models.Like, {foreignKey: 'idProduct', as: 'like_product'})
    }
  }
  Product.init({
    idCategory: DataTypes.INTEGER,
    idSample: DataTypes.INTEGER,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    code: DataTypes.INTEGER,
    promotion: DataTypes.STRING,
    information: DataTypes.STRING,
    idProvider: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
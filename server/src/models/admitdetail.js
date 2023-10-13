'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdmitDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdmitDetail.belongsTo(models.Admit, {foreignKey: 'idAdmit', targetKey: 'id', as: 'admit_detail'});
      AdmitDetail.belongsTo(models.Product, {foreignKey: 'idProduct', targetKey: 'id', as: 'product_admitdetail'});
    }
  }
  AdmitDetail.init({
    idAdmit: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdmitDetail',
  });
  return AdmitDetail;
};
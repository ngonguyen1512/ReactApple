'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Account, {foreignKey: 'idAccount', targetKey: 'id', as: 'like_account'});
      Like.belongsTo(models.Product, {foreignKey: 'idProduct', targetKey: 'id', as: 'like_product'});
    }
  }
  Like.init({
    idAccount: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
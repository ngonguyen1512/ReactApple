'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasOne(models.Product, {foreignKey: 'idCategory', as: 'categories'})
      Category.hasOne(models.Sample, {foreignKey: 'idCategory', as: 'categoriesmodel'})
    }
  }
  Category.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
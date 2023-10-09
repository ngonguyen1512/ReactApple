'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sample.belongsTo(models.Category, {foreignKey: 'idCategory', targetKey: 'id', as: 'categoriesmodel'});
      Sample.hasOne(models.Product, {foreignKey: 'idSample', as: 'samples'})
    }
  }
  Sample.init({
    idCategory: DataTypes.INTEGER,
    name: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};
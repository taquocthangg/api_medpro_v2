'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sescription.belongsTo(models.Schedule, {
        foreignKey: 'id_benhVien',
      });
      Sescription.belongsTo(models.MedicalHistory, {
        foreignKey: 'id_benhVien',
      });
      Sescription.belongsTo(models.User, {
        foreignKey: 'id', 
      });
    }
  }
  Sescription.init({
    id_benhVien: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Sescription',
  });
  return Sescription;
};
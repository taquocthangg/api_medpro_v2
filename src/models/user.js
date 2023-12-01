'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Sescription, {
        foreignKey: 'id_chuyenKhoa',
      });
      User.belongsTo(models.Schedule, {
        foreignKey: 'id',
      });
      User.belongsTo(models.MedicalHistory, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gioiTinh: DataTypes.STRING,
    namSinh: DataTypes.DATEONLY,
    sdt: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role_id: DataTypes.STRING,
    id_chuyenKhoa: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
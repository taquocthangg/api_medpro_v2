'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalHistory.belongsTo(models.User, {
        foreignKey: 'patientId',
      });
      MedicalHistory.belongsTo(models.Sescription, {
        foreignKey: 'specialtyId',
      });
    }
  }
  MedicalHistory.init(
    {
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeSlot: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      diagnosis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medication: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
    sequelize,
    modelName: 'MedicalHistory',
  });
  return MedicalHistory;
};
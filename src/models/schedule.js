'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.User, {
        foreignKey: 'patientId',
      });
      Schedule.belongsTo(models.Sescription, {
        foreignKey: 'specialtyId',
      });
    }
  }
  Schedule.init(
    {
      doctorId: {
        type: DataTypes.INTEGER
      },
      specialtyId: {
        type: DataTypes.INTEGER
      },
      hospitalId: {
        type: DataTypes.INTEGER
      },
      patientId: {
        type: DataTypes.INTEGER
      },
      startTime: {
        type: DataTypes.STRING
      },
      endTime: {
        type: DataTypes.STRING
      },
      timeSlot: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      activateDay: {
        type: DataTypes.DATEONLY
      },
      appointmentDate: {
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.ENUM('available', 'booked', 'completed', 'canceled'),
        defaultValue: 'available',
      },
    },
    {
      sequelize,
      modele: 'Schedule',
    });
  return Schedule;
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timeSlot: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      activateDay: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      appointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('available', 'booked', 'completed', 'canceled'),
        defaultValue: 'available',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Schedules');
  },
};

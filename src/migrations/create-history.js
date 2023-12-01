'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MedicalHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timeSlot: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      appointmentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      diagnosis: {
        type: Sequelize.TEXT,
      },
      medication: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('MedicalHistories');
  },
};

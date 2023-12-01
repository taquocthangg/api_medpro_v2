'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      gioiTinh: {
        type: Sequelize.STRING
      },
      namSinh: {
        type: Sequelize.DATEONLY
      },
      sdt: {
        type: Sequelize.STRING
      },
      diaChi: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue:"https://res.cloudinary.com/dw9w3kc49/image/upload/v1696383687/user/user_defaut.png"
      },
      role_id: {
        type: Sequelize.STRING,
        defaultValue: "R4" 
      },
      id_chuyenKhoa: {
        type: Sequelize.STRING,
      },
      resetToken: {
        type: Sequelize.STRING
      },
      resetTokenExpiry: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
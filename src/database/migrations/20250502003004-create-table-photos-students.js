"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("photos", {
      id: {
        type: Sequelize.INTEGER, // Integer type
        autoIncrement: true, // Auto-incrementing
        primaryKey: true, // Primary key
        allowNull: false, // Not null
      },
      // Adding a foreign key to the students table
      // This will create a relationship between the photos and students tables
      student_id: {
        type: Sequelize.INTEGER, // Integer type
        allowNull: true, // Not null
        references: {
          model: "students", // Reference to the students table
          key: "id", // Reference key
        },
        onDelete: "CASCADE", // If a student is deleted, delete their photos
        onUpdate: "CASCADE", // If a student's ID is updated, update the photos
      },
      originalname: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
      },
      filename: {
        type: Sequelize.STRING(100), // String type with a maximum length of 100
        allowNull: false, // Not null
      },
      created_at: {
        type: Sequelize.DATE, // Date type
        allowNull: false, // Not null
      },
      updated_at: {
        type: Sequelize.DATE, // Date type
        allowNull: false, // Not null
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("photos");
  },
};

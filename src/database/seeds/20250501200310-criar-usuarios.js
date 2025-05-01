"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Ruth",
          email: "ruth@gmal.com",
          password_hash: await bcrypt.hash("123456789Ru@", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Joy",
          email: "joy@gmal.com",
          password_hash: await bcrypt.hash("123456789Joy@", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Geyse",
          email: "gey@gmal.com",
          password_hash: await bcrypt.hash("123456789Gey@", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

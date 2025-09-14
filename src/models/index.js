import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

// Models
import Students from "./Students.js";
import Photo from "./Photo.js";
import User from "./User.js";

// Model Associations
import associateModels from "./associations.js";

import { Sequelize } from "sequelize";

const url = process.env.DATABASE_URL;
console.log(url);

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  timezone: "America/Sao_Paulo",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

Students.init(sequelize);
Photo.init(sequelize);
User.init(sequelize);

associateModels();

export { sequelize, Students, Photo, User };

import dotenv from "dotenv";
dotenv.config();

// Models
import Students from "./Students.js";
import Photo from "./Photo.js";
import User from "./User.js";

// Model Associations
import associateModels from "./associations.js";

import { Sequelize } from "sequelize";
import { url } from "../config/database.js";

const sequelize = new Sequelize(url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: "America/Sao_Paulo",
});

Students.init(sequelize);
Photo.init(sequelize);
User.init(sequelize);

associateModels();

export { sequelize, Students, Photo, User };

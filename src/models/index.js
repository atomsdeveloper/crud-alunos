import Sequelize from "sequelize";

// Database
import configDatabase from "../config/database.js";

// Models
import Students from "./Students.js";
import Photo from "./Photo.js";
import User from "./User.js";

// Model Associations
import associateModels from "./associations.js";

const sequelize = new Sequelize(configDatabase);

Students.init(sequelize);
Photo.init(sequelize);
User.init(sequelize);

associateModels();

export { sequelize, Students, Photo, User };

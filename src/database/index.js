import Sequelize from "sequelize";
import configDatabase from "../config/database.js";

// Importing the models
import Aluno from "../models/Aluno.js";
import User from "../models/User.js";
import Photo from "../models/Photo.js";

// This array contains all the models that will be initialized with the database connection
const models = [Aluno, User, Photo];

// Create a new Sequelize instance with the database configuration
// This instance will be used to connect to the database and perform operations
const connection = new Sequelize(configDatabase);

// This function initializes the database connection and all the models
models.forEach((model) => model.init(connection));
// This function is used to synchronize the models with the database
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

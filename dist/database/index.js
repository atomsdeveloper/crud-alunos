"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

// Importing the models
var _Studentsjs = require('../models/Students.js'); var _Studentsjs2 = _interopRequireDefault(_Studentsjs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _Photojs = require('../models/Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);

// This array contains all the models that will be initialized with the database connection
const models = [_Photojs2.default, _Studentsjs2.default, _Userjs2.default];

// Create a new Sequelize instance with the database configuration
// This instance will be used to connect to the database and perform operations
const connection = new (0, _sequelize2.default)(_databasejs2.default);

// async function initializeModels() {
//   // Inicializando os modelos
//   for (const model of models) {
//     await model.init(connection);
//   }

//   // Estabelecendo as associações entre os modelos
//   for (const model of models) {
//     if (model.associate) {
//       model.associate(connection.models);
//     }
//   }

//   // Sincronizando os modelos com o banco de dados
//   await connection.sync({ force: false });
//   console.log("Modelos sincronizados com sucesso!");
// }

// // Chamando a função para inicializar os modelos
// initializeModels().catch((error) => {
//   console.error("Erro ao inicializar os modelos:", error);
// });

// This function initializes the database connection and all the models
models.forEach((modelConnect) => modelConnect.init(connection));
// This function is used to synchronize the models with the database
models.forEach(
  (modelConnect) =>
    modelConnect.associate && modelConnect.associate(connection.models)
);

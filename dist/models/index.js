"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

// Models
var _Studentsjs = require('./Students.js'); var _Studentsjs2 = _interopRequireDefault(_Studentsjs);
var _Photojs = require('./Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);
var _Userjs = require('./User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

// Model Associations
var _associationsjs = require('./associations.js'); var _associationsjs2 = _interopRequireDefault(_associationsjs);

var _sequelize = require('sequelize');
var _databasejs = require('../config/database.js');

const sequelize = new (0, _sequelize.Sequelize)(_databasejs.url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: "America/Sao_Paulo",
});

_Studentsjs2.default.init(sequelize);
_Photojs2.default.init(sequelize);
_Userjs2.default.init(sequelize);

_associationsjs2.default.call(void 0, );

exports.sequelize = sequelize; exports.Students = _Studentsjs2.default; exports.Photo = _Photojs2.default; exports.User = _Userjs2.default;

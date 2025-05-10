"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

// Database
var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

// Models
var _Studentsjs = require('./Students.js'); var _Studentsjs2 = _interopRequireDefault(_Studentsjs);
var _Photojs = require('./Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);

// Model Associations
var _associationsjs = require('./associations.js'); var _associationsjs2 = _interopRequireDefault(_associationsjs);

const sequelize = new (0, _sequelize2.default)(_databasejs2.default);

_Studentsjs2.default.init(sequelize);
_Photojs2.default.init(sequelize);

_associationsjs2.default.call(void 0, );

exports.sequelize = sequelize; exports.Students = _Studentsjs2.default; exports.Photo = _Photojs2.default;

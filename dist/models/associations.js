"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// Models
var _Studentsjs = require('./Students.js'); var _Studentsjs2 = _interopRequireDefault(_Studentsjs);
var _Photojs = require('./Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);

 function associateModels() {
  _Studentsjs2.default.hasMany(_Photojs2.default, { foreignKey: "student_id", as: "photos" });
  _Photojs2.default.belongsTo(_Studentsjs2.default, { foreignKey: "student_id", as: "students" });
} exports.default = associateModels;

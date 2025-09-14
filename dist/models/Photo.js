"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _urlConfig = require('../config/urlConfig'); var _urlConfig2 = _interopRequireDefault(_urlConfig);

// Model for the "alunos" table
// This model represents the structure of the "alunos" table in the database
// and provides methods to interact with it
 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: _sequelize.DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Filename não pode ser vazio",
            },
          },
        },
        originalname: {
          type: _sequelize.DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Originalname não pode ser vazio",
            },
          },
        },
        student_id: {
          type: _sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "alunos",
            key: "id",
          },
        },
        url: {
          type: _sequelize.DataTypes.VIRTUAL,
          get() {
            const filename = this.getDataValue("filename");
            const isCloudinary = filename.startsWith("http");
            return isCloudinary ? filename : `${_urlConfig2.default.baseURL}/${filename}`;
          },
        },
        createdAt: {
          type: _sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: _sequelize.DataTypes.NOW,
          field: "created_at",
        },
        updatedAt: {
          type: _sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: _sequelize.DataTypes.NOW,
          field: "updated_at",
        },
      },
      {
        sequelize,
        modelName: "Photo",
        tableName: "photos",
        timestamps: true,
      }
    );
    return this;
  }
  // Define associations with other models
  // This method is used to define relationships between models
  static associate(models) {
    // Define a one-to-many relationship with the Student model
    // This means that a photo belongs to a student
    // and a student can have many photos
    this.belongsTo(models.Students, {
      foreignKey: "student_id",
      as: "students",
    });
  }
} exports.default = Photo;

import { Model, DataTypes } from "sequelize";
import urlConfig from "../config/urlConfig";

// Model for the "alunos" table
// This model represents the structure of the "alunos" table in the database
// and provides methods to interact with it
export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Filename não pode ser vazio",
            },
          },
        },
        originalname: {
          type: DataTypes.STRING(100),
          allowNull: true,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Originalname não pode ser vazio",
            },
          },
        },
        student_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "alunos",
            key: "id",
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            const filename = this.getDataValue("filename");
            const isCloudinary = filename.startsWith("http");
            return isCloudinary ? filename : `${urlConfig.baseURL}/${filename}`;
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
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
}

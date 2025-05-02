import { Model, DataTypes } from "sequelize";

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
      },
      {
        sequelize,
        modelName: "Photo",
        tableName: "photos",
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
    this.belongsTo(models.Aluno, {
      foreignKey: "student_id",
    });
  }
}

import { Model, DataTypes } from "sequelize";

// Model for the "Students" table
// This model represents the structure of the "Students" table in the database
// and provides methods to interact with it
export default class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Sem nome",
          validate: {
            notEmpty: true,
            len: {
              args: [3, 255],
              msg: "O nome deve ter entre 3 e 255 caracteres.",
            },
            is: {
              args: /^[a-zA-Z\s]+$/,
              msg: "O nome deve conter apenas letras e espaços.",
            },
          },
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Sem sobrenome",
          validate: {
            notEmpty: true,
            len: {
              args: [3, 255],
              msg: "O nome deve ter entre 3 e 255 caracteres.",
            },
            is: {
              args: /^[a-zA-Z\s]+$/,
              msg: "O nome deve conter apenas letras e espaços.",
            },
          },
        },
        email: {
          type: DataTypes.STRING(100), // String type with a maximum length of 100
          allowNull: false, // Not null
          unique: {
            args: true, // Unique constraint
            msg: "O email já está cadastrado", // Error message
          }, // Unique constraint
          defaultValue: "", // Default value is an empty string
          validate: {
            notNull: {
              args: true, // Validation to ensure the field is not null
              msg: "O email não pode ser nulo", // Error message
            },
            isEmail: {
              args: true, // Validation to ensure the field is a valid email
              msg: "O email deve ser válido", // Error message
            },
          },
        },
        weight: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isFloat: {
              args: true,
              msg: "O peso deve ser um número.",
            },
            min: {
              args: 1,
              msg: "O peso deve ser maior ou igual a um.",
            },
          },
        },
        birthdate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
          validate: {
            isAfter: {
              args: ["1900-01-01"],
              msg: "A data de nascimento deve ser posterior a 01/01/1900.",
            },
            isBefore: {
              // Convert to ISO string and split to get the date part
              // This ensures the date is in the format YYYY-MM-DD
              args: [new Date().toISOString().split("T")[0]], // Current date
              msg: "A data de nascimento deve ser anterior a hoje.",
            },
          },
        },
        height: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
          validate: {
            isFloat: {
              args: true,
              msg: "A altura deve ser um número.",
            },
            min: {
              args: 1,
              msg: "A altura deve ser maior ou igual a um.",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Students",
        tableName: "students",
        timestamps: false,
      }
    );
    return this;
  }

  static associate(models) {
    // Define a one-to-many relationship with the Photo model
    // This means that a student can have many photos
    this.hasMany(models.Photo, {
      foreignKey: "student_id",
      as: "photos",
    });
  }
}

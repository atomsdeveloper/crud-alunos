import Aluno from "../models/Aluno";

class StudentController {
  // List all students
  // This method handles the retrieval of all students
  async index(req, res) {
    try {
      const students = await Aluno.findAll({});

      // Check if the students were found
      if (!students) {
        return res.status(404).json({
          success: false,
          message: "Nenhum aluno encontrado.",
        });
      }

      // If students were found, return them in the response
      return res.json({
        success: true,
        message: "Rota acessada com sucesso.",
        data: students,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar alunos.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
  // Create a new student
  // This method handles the creation of a new student
  async store(req, res) {
    try {
      const { name, email, weight, height, birthdate } = req.body;

      // Check if the required fields are present
      if (!name || !email || !weight || !height || !birthdate) {
        return res.status(400).json({
          success: false,
          message: "Todos os campos são obrigatórios.",
        });
      }

      // Create a new student
      const student = await Aluno.create({
        name,
        email,
        weight,
        height,
        birthdate,
      });

      // Return the created student in the response
      return res.status(201).json({
        success: true,
        message: "Aluno criado com sucesso.",
        data: student,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao criar aluno.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
  // Show a student by ID
  // This method handles the retrieval of a student by ID
  async show(req, res) {
    try {
      const { id } = req.params;

      // Find the student by ID
      const student = await Aluno.findByPk(id);

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Aluno não encontrado.",
        });
      }

      // Return the found student in the response
      return res.json({
        success: true,
        message: "Aluno encontrado com sucesso.",
        data: student,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar aluno.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
  // Update a student by ID
  // This method handles the update of a student by ID
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, lastname, weight, height, birthdate } = req.body;

      // Find the student by ID
      const student = await Aluno.findByPk(id);

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Aluno não encontrado.",
        });
      }

      // Update the student
      const newStudent = await student.update({
        name,
        email,
        lastname,
        weight,
        height,
        birthdate,
      });

      // Return the updated student in the response
      return res.json({
        success: true,
        message: "Aluno atualizado com sucesso.",
        data: newStudent,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar aluno.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
  // Delete a student by ID
  // This method handles the deletion of a student by ID
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Find the student by ID
      const student = await Aluno.findByPk(id);

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Aluno não encontrado.",
        });
      }

      // Delete the student
      await student.destroy();

      // Return a success message in the response
      return res.json({
        success: true,
        message: "Aluno deletado com sucesso.",
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao deletar aluno.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
}

// Exporting the instance of StudentController
// This allows us to use the same instance across the application
export default new StudentController();

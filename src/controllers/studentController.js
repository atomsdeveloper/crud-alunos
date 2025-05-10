import Students from "../models/Students";
import Photo from "../models/Photo";
class StudentController {
  // List all students
  // This method handles the retrieval of all students
  async index(req, res) {
    try {
      const students = await Students.findAll({
        // Order the students by ID in descending order
        // This means the most recently created students will be listed first
        order: [
          ["id", "DESC"],
          // Order the associated photos by ID in descending order
          // This means the most recently created photos will be listed first
          [{ model: Photo, as: "photos" }, "id", "DESC"],
        ],
        // Include associated photos
        // This allows us to get the photos associated with each student
        include: [
          {
            model: Photo,
            as: "photos",
            attributes: ["filename", "url"],
          },
        ],
      });

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
        error: error.message,
      });
    }
  }
  // Create a new student
  // This method handles the creation of a new student
  async store(req, res) {
    try {
      const { name, lastname, email, weight, height, birthdate } = req.body;

      // Check if the required fields are present
      if (!name || !email || !weight || !height || !birthdate || !lastname) {
        return res.status(400).json({
          success: false,
          message: "Todos os campos são obrigatórios.",
        });
      }

      // Create a new student
      const student = await Students.create({
        name,
        email,
        weight,
        height,
        lastname,
        birthdate,
      });

      // Return the created student in the response
      return res.status(201).json({
        success: true,
        message: "Students criado com sucesso.",
        data: student,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao criar Students.",
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
      const student = await Students.findByPk(id, {
        // Order the students by ID in descending order
        // This means the most recently created students will be listed first
        order: [
          ["id", "DESC"],
          // Order the associated photos by ID in descending order
          // This means the most recently created photos will be listed first
          [{ model: Photo, as: "photos" }, "id", "DESC"],
        ],
        // Include associated photos
        // This allows us to get the photos associated with each student
        include: [
          {
            model: Photo,
            attributes: ["filename", "url"],
            as: "photos",
          },
        ],
      });

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Students não encontrado.",
        });
      }

      // Return the found student in the response
      return res.json({
        success: true,
        message: "Students encontrado com sucesso.",
        data: student,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar Students.",
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
      const student = await Students.findByPk(id);

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Students não encontrado.",
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
        message: "Students atualizado com sucesso.",
        data: newStudent,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar Students.",
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
      const student = await Students.findByPk(id);

      // Check if the student was found
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Students não encontrado.",
        });
      }

      // Delete the student
      await student.destroy();

      // Return a success message in the response
      return res.json({
        success: true,
        message: "Students deletado com sucesso.",
      });
    } catch (error) {
      // Handle any errors that occur during the process
      return res.status(400).json({
        success: false,
        message: "Erro ao deletar Students.",
        error: error.errors.map((err) => err.message),
      });
    }
  }
}

// Exporting the instance of StudentController
// This allows us to use the same instance across the application
export default new StudentController();

import User from "../models/User.js";

class UserController {
  // Index method
  // This method handles the index to List all users
  async index(req, res) {
    try {
      // This method handles the index route
      // It retrieves all users from the database
      const users = await User.findAll();

      return res.json({
        success: true,
        message: "Lista de usuários.",
        data: users,
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao listar os usuários.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  // Create method
  // This method handles the creation of a new user
  async store(req, res) {
    try {
      // This method handles the index route
      // It creates a new User instance and saves it to the database
      const user = await User.create(req.body);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Dados do usuário não existem.",
        });
      }

      return res.json({
        success: true,
        message: "criado com sucesso.",
        data: {
          name: req.body.name,
          email: req.body.email,
        }, // Returning only the name and email of the created user
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao criar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  // Show method
  // This method handles the show show a user
  async show(req, res) {
    try {
      // This method handles the show route
      // It retrieves a user by its ID from the database

      // It checks if the ID is provided in the URL
      if (!req.params.id) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      return res.json({
        success: true,
        message: "Usuário encontrado.",
        data: {
          name: req.body.name,
          email: req.body.email,
        }, // Returning only the name and email of the created user
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao buscar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  // Update method
  // This method handles the update to update a user
  async update(req, res) {
    try {
      // This method handles the update route
      // It updates a user by its ID in the database

      // It checks if the ID is provided in the URL that generates the token
      if (!req.userId) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      await user.update(req.body);

      return res.json({
        success: true,
        message: "Usuário atualizado com sucesso.",
        data: {
          name: req.body.name,
          email: req.body.email,
        }, // Returning only the name and email of the created user
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao atualizar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }

  // Delete method
  // This method handles the delete to delete a user
  async delete(req, res) {
    try {
      // This method handles the delete route
      // It deletes a user by its ID from the database

      // It checks if the ID is provided in the URL that generates the token
      if (!req.userId) {
        return res.status(400).json({
          success: false,
          message: "ID do usuário não informado.",
        });
      }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Usuário não encontrado.",
        });
      }

      await user.destroy();

      return res.json({
        success: true,
        message: "Usuário deletado com sucesso.",
      });
    } catch (error) {
      // If an error occurs, it sends a response with the error message
      return res.status(400).json({
        success: false,
        message: "Erro ao deletar o usuário.",
        error: error.errors.map((err) => err.message), // Extracting error messages from the Sequelize validation errors.
      });
    }
  }
}

// Exporting the instance of HomeController
// This allows us to use the same instance across the application
export default new UserController();

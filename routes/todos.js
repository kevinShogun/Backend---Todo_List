const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

// Crea todos
// api/todos
router.post(
	"/",
	[check("nombre", "The name of the todo is required").not().isEmpty()],
	todoController.createTodo
);

// Obtener todos los todos
router.get("/", todoController.getAllTodos);

// Actualizar todo via ID
router.put(
	"/:id",
	[check("nombre", "The name of the todo is required").not().isEmpty()],
	todoController.updateTodo
);

// Eliminar un todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;

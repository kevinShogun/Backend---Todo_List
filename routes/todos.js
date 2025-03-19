const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

// Crea todos
// api/todos
router.post(
	"/",
	[check("title", "The name of the todo is required").not().isEmpty()],
	todoController.createTodo
);
// Actualizar todo via ID
router.put(
	"/:id",
	[check("title", "The name of the todo is required").not().isEmpty()],
	todoController.updateTodo
);

// Obtener todas las taks de un todo
router.get("/:id/tasks", todoController.getAllTaksByTodo);

// Eliminar un todo
router.delete("/:id", todoController.deleteTodo);

module.exports = router;

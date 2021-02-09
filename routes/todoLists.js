const express = require("express");
const router = express.Router();
const todoListController = require("../controllers/todoListController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Crea todoLists
// api/todoLists
router.post(
	"/",
	auth,
	[check("nombre", "The name of the todoList is required").not().isEmpty()],
	todoListController.crearTodoList
);

// Obtener todos los todoLists
router.get("/", auth, todoListController.obtenerTodoList);

// Actualizar todoList via ID
router.put(
	"/:id",
	auth,
	[check("nombre", "The name of the todoList is required").not().isEmpty()],
	todoListController.actualizarTodoList
);

// Eliminar un TodoList
router.delete("/:id", auth, todoListController.eliminarTodoList);

module.exports = router;

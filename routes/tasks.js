const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { check } = require("express-validator");

// crear una task
// api/tasks
router.post(
	"/",
	[
		check("title", "El titulo es obligatorio").not().isEmpty(),
		check("todoId", "El Todo es obligatorio").not().isEmpty(),
	],
	taskController.createTask
);

// Actualizar task
router.put("/:id", taskController.updateTask);

// Eliminar task
router.delete("/:id", taskController.deleteTask);

module.exports = router;

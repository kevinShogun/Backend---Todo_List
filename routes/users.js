// Rutas para crear users
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Crea un user
// api/users
router.post(
	"/",
	[
		check("firstName", "El nombre es obligatorio").not().isEmpty(),
		check("lastName", "El nombre es obligatorio").not().isEmpty(),
		check("email", "Agrega un email válido").isEmail(),
	],
	userController.createUser
);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

// get all todos by User
router.get("/:id/todos", userController.getAllTodosByUser);

module.exports = router;

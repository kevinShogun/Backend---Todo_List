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
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "Agrega un email válido").isEmail(),
		check("password", "El password debe ser minimo de 6 caracteres").isLength({
			min: 6,
		}),
	],
	userController.createUser
);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getOneUser);

// get all todos by User
router.get(":id/todos", userController.getAllTodosByUser);

module.exports = router;

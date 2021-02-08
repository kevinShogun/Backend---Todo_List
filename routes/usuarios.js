/*
    Rutas para crear usuarios
*/
const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const router = express.Router();
const { check } = require("express-validator");

/*
 *crea ususarios
 *api/usuarios -> su endPoint
 */

router.post(
	"/",
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "Agrega un Email valido").isEmail(),
		check(
			"password",
			"El password de ser Minimo de 8 caracteres"
		).isLength({min: 8})
	],
	usuarioController.crearUsuario
);

module.exports = router;

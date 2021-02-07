/*
    Rutas para crear usuarios
*/
const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const router = express.Router();

/* crea ususarios 
api/usuarios

router.post('/', () => {
    console.log('creando usuario....'); -> prueab esto
});

 */
router.post("/", usuarioController.crearUsuario);

module.exports = router;

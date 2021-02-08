const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una task
// api/tasks
router.post('/', 
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('todoList', 'El TodoList es obligatorio').not().isEmpty()
    ],
    taskController.crearTask
);

// Obtener las tasks por todoList
router.get('/',
    auth,
    taskController.obtenerTasks
);

// Actualizar task
router.put('/:id', 
    auth,
    taskController.actualizarTask
);

// Eliminar task
router.delete('/:id', 
    auth,
    taskController.eliminarTask
);

module.exports = router;
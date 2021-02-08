const Task = require('../models/Task');
const TodoList = require('../models/TodoList');
const { validationResult } = require('express-validator');

// Crea una nueva task
exports.crearTask = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    

    try {

        // Extraer el todoList y comprobar si existe
        const { todoList } = req.body;

        const existeTodoList = await TodoList.findById(todoList);
        if(!existeTodoList) {
            return res.status(404).json({msg: 'TodoList no found'})
        }

        // Revisar si el todoList actual pertenece al usuario autenticado
        if(existeTodoList.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Not authorized '});
        }

        // Creamos la task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake')
    }

}

// Obtiene las tasks por todoList
exports.obtenerTasks = async (req, res) => {

        try {
            // Extraer el todoList y comprobar si existe
            const { todoList } = req.body;


            const existeTodoList = await TodoList.findById(todoList);
            if(!existeTodoList) {
                return res.status(404).json({msg: 'TodoList no found'})
            }

            // Revisar si el todoList actual pertenece al usuario autenticado
            if(existeTodoList.creador.toString() !== req.usuario.id ) {
                return res.status(401).json({msg: 'Not Autorized'});
            }

            // Obtener las tasks por todoList
            const tasks = await Task.find({ todoList }).sort({ creado: -1 });
            res.json({ tasks });

        } catch (error) {
            console.log(error);
            res.status(500).send('There was a mistake');
        }
}

// Actualizar una task
exports.actualizarTask = async (req, res ) => {
    try {
        // Extraer el todoList y comprobar si existe
        const { todoList, nombre, estado } = req.body;


        // Si el task existe o no
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg: 'The task Item not exist'});
        }

        // extraer todoList
        const existeTodoList = await TodoList.findById(todoList);

        // Revisar si el todoList actual pertenece al usuario autenticado
        if(existeTodoList.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Not Autorized'});
        }
        // Crear un objeto con la nueva información
        const nuevaTask = {};
        if(nombre)    nuevaTask.nombre = nombre;
        if(estado)    nuevaTask.estado = estado;

        // Guardar el task
        task = await Task.findOneAndUpdate({_id : req.params.id }, nuevaTask, { new: true } );

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake')
    }
}


// Elimina una task
exports.eliminarTask = async (req, res) => {
    try {
        // Extraer el todoList y comprobar si existe
        const { todoList  } = req.body;

        // Si la task existe o no
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg: 'No existe esa task'});
        }

        // extraer todoList
        const existeTodoList = await TodoList.findById(todoList);

        // Revisar si el todoList actual pertenece al usuario autenticado
        if(existeTodoList.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'Not Autorized'});
        }

        // Eliminar
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Delete Task Item'})

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake')
    }
}
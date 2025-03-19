const Task = require('../models/Task');
const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

exports.createTodo = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        // Crear un nuevo todo
        const todo = new Todo(req.body);

        // guardamos el todo
        todo.save();
        res.json(todo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualiza un todo
exports.updateTodo = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer la información del todo
    const { title, keywords } = req.body;
    const newTodo = {};
    
    if(title) {
        newTodo.title = title;
    }

    if(keywords) {
        newTodo.keywords = keywords;
    }

    try {

        // revisar el ID 
        let todo = await Todo.findById(req.params.id);

        // si el todo existe o no
        if(!todo) {
            return res.status(404).json({msg: 'Todo no encontrado'})
        }

        // verificar el userId del todo
        if(todo.userId.toString() !== req.body.userId ) {
            console.log(todo.userId, req.body.userId);
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // actualizar
        todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, { $set : newTodo}, { new: true });

        res.json({todo});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.getAllTaksByTodo = async (req, res) => {
    try {
        const tasks = await Task.find({ todoId: req.params.id });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

// Elimina un todo por su id
exports.deleteTodo = async (req, res ) => {
    try {
        // revisar el ID 
        let todo = await Todo.findById(req.params.id);

        // si el todo existe o no
        if(!todo) {
            return res.status(404).json({msg: 'Todo no encontrado'})
        }

        // verificar el userId del todo
        if(todo.userId.toString() !== req.headers.userid ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar el Todo
        await Todo.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Todo eliminado '})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}

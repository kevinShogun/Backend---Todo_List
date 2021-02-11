const Task = require('../models/Task');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crea una nueva task
exports.crearTask = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    

    try {

        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

// Obtiene las tasks por proyecto
exports.obtenerTasks = async (req, res) => {

        try {
            // Extraer el proyecto y comprobar si existe
            const { proyecto } = req.query;


            const existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto) {
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            // Revisar si el proyecto actual pertenece al usuario autenticado
            if(existeProyecto.creador.toString() !== req.usuario.id ) {
                return res.status(401).json({msg: 'No Autorizado'});
            }

            // Obtener las tasks por proyecto
            const tasks = await Task.find({ proyecto }).sort({ creado: -1 });
            res.json({ tasks });

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
}

// Actualizar una task
exports.actualizarTask = async (req, res ) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;


        // Si la task existe o no
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg: 'No existe esa task'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Crear un objeto con la nueva información
        const nuevaTask = {};
        nuevaTask.nombre = nombre;
        nuevaTask.estado = estado;

        // Guardar la task
        task = await Task.findOneAndUpdate({_id : req.params.id }, nuevaTask, { new: true } );

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


// Elimina una task
exports.eliminarTask = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto  } = req.query;

        // Si la task existe o no
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg: 'No existe esa task'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Task Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
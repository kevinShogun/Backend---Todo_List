const TodoList = require("../models/TodoList");
const { validationResult } = require("express-validator");

exports.crearTodoList = async (req, res) => {
	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	try {
		// Crear un nuevo todoList
		const todoList = new TodoList(req.body);

		// Guardar el creador via JWT
		todoList.creador = req.usuario.id;

		// guardamos el todoList
		todoList.save();
		res.json(todoList);
	} catch (error) {
		console.log(error);
		res.status(500).send("There was a mistake");
	}
};

// Obtiene todos los todoLists del usuario actual
exports.obtenerTodoList = async (req, res) => {
	try {
		const todoLists = await TodoList.find({ creador: req.usuario.id }).sort({
			creado: -1,
		});
		res.json({ todoLists });
	} catch (error) {
		console.log(error);
		res.status(500).send("There was an error");
	}
};

// Actualiza un todoList
exports.actualizarTodoList = async (req, res) => {
	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	// extraer la información del todoList
	const { nombre } = req.body;
	const nuevoTodoList = {};

	if (nombre) {
		nuevoTodoList.nombre = nombre;
	}

	try {
		// revisar el ID
		let todoList = await TodoList.findById(req.params.id);

		// si el todoList existe o no
		if (!todoList) {
			return res.status(404).json({ msg: "TodoList no found" });
		}

		// verificar el creador del todoList
		if (todoList.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "not updated" });
		}

		// actualizar
		todoList = await TodoList.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: nuevoTodoList },
			{ new: true }
		);

		res.json({ todoList });
	} catch (error) {
		console.log(error);
		res.status(500).send("Error in a server");
	}
};

// Elimina un todoList por su id
exports.eliminarTodoList = async (req, res) => {
	try {
		// revisar el ID
		let todoList = await TodoList.findById(req.params.id);

		// si el todoList existe o no
		if (!todoList) {
			return res.status(404).json({ msg: "TodoList no found" });
		}

		// verificar el creador del todoList
		if (todoList.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: "Not authorized " });
		}

		// Eliminar el TodoList
		await TodoList.findOneAndRemove({ _id: req.params.id });
		res.json({ msg: "TodoList delete " });
	} catch (error) {
		console.log(error);
		res.status(500).send("Error in a server");
	}
};

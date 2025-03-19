const Task = require("../models/Task");
const Todo = require("../models/Todo");
const { validationResult } = require("express-validator");

// Crea una nueva task
exports.createTask = async (req, res) => {
	// Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	try {
		// Extraer el todoList y comprobar si existe
		const { todoId } = req.body;

		const existTodo = await Todo.findById(todoId);
		if (!existTodo) {
			return res.status(404).json({ msg: "Todo no encontrado" });
		}

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.body.userId) {
			return res.status(401).json({ msg: "No Autorizado" });
		}

		// Creamos la task
		const task = new Task(req.body);
		await task.save();
		res.json({ task });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

// Actualizar una task
exports.updateTask = async (req, res) => {
	try {
		// Extraer el todoList y comprobar si existe
		const { todoId, title, completed } = req.body;

		// Si la task existe o no
		let task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ msg: "No existe esa task" });
		}

		// extraer todoList
		const existTodo = await Todo.findById(todoId);

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.body.userId) {
			return res.status(401).json({ msg: "No Autorizado" });
		}
		// create un objeto con la nueva información
		const nuevaTask = {};
		nuevaTask.title = title;
		nuevaTask.completed = completed;

		// Guardar la task
		task = await Task.findOneAndUpdate({ _id: req.params.id }, nuevaTask, {
			new: true,
		});

		res.json({ task });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

// Elimina una task
exports.deleteTask = async (req, res) => {
	try {
		// Extraer el todoList y comprobar si existe
		const { todoId } = req.query;

		// Si la task existe o no
		let task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ msg: "No existe esa task" });
		}

		// extraer todoList
		const existTodo = await Todo.findById(todoId);

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.headers.userid) {
			return res.status(401).json({ msg: "No Autorizado" });
		}

		// Eliminar
		await Task.findOneAndRemove({ _id: req.params.id });
		res.json({ msg: "Task Eliminada" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

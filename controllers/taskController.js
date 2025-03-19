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
		const { todo } = req.body;

		const existTodo = await Todo.findById(todo);
		if (!existTodo) {
			return res.status(404).json({ msg: "Todo no encontrado" });
		}

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.user.id) {
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

// Obtiene las tasks por todoList
exports.getTasks = async (req, res) => {
	try {
		// Extraer el todoList y comprobar si existe
		const { todo } = req.query;

		const existTodo = await Todo.findById(todo);
		if (!existTodo) {
			return res.status(404).json({ msg: "TodoList no encontrado" });
		}

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.user.id) {
			return res.status(401).json({ msg: "No Autorizado" });
		}

		// Obtener las tasks por todoList
		const tasks = await Task.find({ todo }).sort({ creado: -1 });
		res.json({ tasks });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

// Actualizar una task
exports.updateTask = async (req, res) => {
	try {
		// Extraer el todoList y comprobar si existe
		const { todo, title, completed } = req.body;

		// Si la task existe o no
		let task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ msg: "No existe esa task" });
		}

		// extraer todoList
		const existTodo = await Todo.findById(todo);

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.user.id) {
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
		const { todo } = req.query;

		// Si la task existe o no
		let task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ msg: "No existe esa task" });
		}

		// extraer todoList
		const existTodo = await Todo.findById(todo);

		// Revisar si el todoList actual pertenece al usuario autenticado
		if (existTodo.userId.toString() !== req.user.id) {
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

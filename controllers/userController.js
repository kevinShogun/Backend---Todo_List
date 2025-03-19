const Todo = require("../models/Todo");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
	// revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	// extraer email y password
	const { email } = req.body;

	try {
		// Revisar que el User registrado sea unico
		let User = await User.findOne({ email });

		if (User) {
			return res.status(400).json({ msg: "Ya existe un Usuario con ese email" });
		}

		// crea el nuevo User
		User = new User(req.body);
		// guardar User
		await User.save();

		// Crear y firmar el JWT
		const payload = {
			User: {
				id: User.id,
				firstName: User.firstName,
				lastName: User.lastName,
				email: User.email,
			},
		};

		res.json({ payload });
	} catch (error) {
		console.log(error);
		res.status(400).send("Hubo un error");
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const Users = await User.find();
		res.json({ Users });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
};

exports.getOneUser = async (req, res) => {
    try {
        const User = await User.findById(req.params.id);
        res.json({ User });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.getAllTodosByUser = async (req, res) => {

	try {
		const todos = await Todo.find({ userId: req.params.id }).sort({ creado: -1 });
		res.json({ todos });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
}
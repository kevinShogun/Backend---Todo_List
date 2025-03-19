const Todo = require("../models/Todo");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
	// revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const { email } = req.body;

	try {
		
		let userRequest = await User.findOne({ email });

		if (userRequest) {
			return res.status(400).json({ msg: "Ya existe un Usuario con ese email" });
		}

		userRequest = new User(req.body);

		await userRequest.save();

		const payload = {
			User: {
				id: userRequest.id,
				firstName: userRequest.firstName,
				lastName: userRequest.lastName,
				email: userRequest.email,
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
        const user = await User.findById(req.params.id);
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
};

exports.getAllTodosByUser = async (req, res) => {

	try {
		console.log(req.params)
		const todos = await Todo.find({ userId: req.params.id }).sort({ creado: -1 });
		res.json({ todos });
	} catch (error) {
		console.log(error);
		res.status(500).send("Hubo un error");
	}
}
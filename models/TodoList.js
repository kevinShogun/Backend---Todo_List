const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	creador: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
	},
	creado: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("TodoList", TodoListSchema);

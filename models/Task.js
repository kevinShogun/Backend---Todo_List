const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	todoId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Todo",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Task", TaskSchema);

const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	keywords: {
		// this is an array of strings
		type: [String],
		trim: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("Todo", TodoSchema);

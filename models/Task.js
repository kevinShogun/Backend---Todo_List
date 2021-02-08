const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    }, 
    todoList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoList'
    }
});

module.exports = mongoose.model('Task', TaskSchema);
const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Importar rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/tasks", require("./routes/tasks"));

app.listen(process.env.PORT, '0.0.0.0', () => {
	console.log(`El servidor esta funcionando en el puerto ${process.env.PORT}`);
});

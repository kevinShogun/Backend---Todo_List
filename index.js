const express = require("express");
const conectarDB = require("./config/db");
// crear el servidor
const app = express();

conectarDB(); //conectar a la base de datos

//habilitar express .json
 app.use(express.json ({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

/*  importar rutas
 */
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

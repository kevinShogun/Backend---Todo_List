const express = require('express');

/* 
    descomenta luego*/
const conectarDB = require('./config/db');

// crear el servidor 
const app = express();

conectarDB(); //conectar a la base de datos

//habilitar express .json
app.use(express.json ({extended: true}));

//puerto de la app
const PORT = process.env.PORT || 4000;

/*  importar rutas
*/
app.use('/api/usuario', require('./routes/usuarios'));


// definir la pagina principal 
app.get('/', (req, res) =>{
    res.send('Hola Mundo')
});

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
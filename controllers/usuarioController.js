
const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    console.log('desde CrearUsuario');
    console.log(req.body);

    try {
        let usuario;
         
        //crea el nuevo usuario

        usuario = new Usuario(req.body);


        //Guardar el nuevo usuario
        await usuario.save();

        res.send('Usuario Creado...')
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
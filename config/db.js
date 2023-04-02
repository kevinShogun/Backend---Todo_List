const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const conectarDB = async () => {
	try {
        await mongoose.connect( process.env.DB_MONGO , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }
};

module.exports = conectarDB;

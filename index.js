//Inicia  varianles de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const { Schema } = require('mongoose');

//Crear el servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Iniciar base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));
app.use('/api/medico', require('./routes/medico.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

//Inicia la esucha en el puerto x
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

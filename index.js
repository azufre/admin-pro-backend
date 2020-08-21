require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();
app.use(cors());

dbConnection();

app.get('/', (req, resp) => {
    resp.status(200).json({
        ok: true,
        data: "Hola mundo"
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
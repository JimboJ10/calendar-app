const express = require('express');
require('dotenv').config();
const { dbConcection } = require('./db/config');
const cors = require('cors');

//servidor express
const app = express();

//base de datos
dbConcection();

//cors
app.use(cors());

//directorio publico
app.use(express.static(__dirname + '/public'));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventsRoutes'));


//escucha peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en el puerto ${process.env.PORT}`);
});
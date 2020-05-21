const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(), express.json());
app.use(express.urlencoded({ extended: false }));

//llamado a rutas
const api = require('./rutas/index');
app.use('/api', api);

module.exports = app; 

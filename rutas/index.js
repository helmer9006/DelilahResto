const express = require('express');
const api = express.Router();
const controladorPlatos = require('../controladores/platos');
const controladorUsuarios = require('../controladores/usuarios');
const auth = require('../middelwares/auth');

//PLATOS
api.get('/platos', controladorPlatos.getPlatos);
api.get('/platos/:platoId', controladorPlatos.getPlato);
api.post('/platos',auth.isAuth, controladorPlatos.postPlato);
api.put('/platos',auth.isAuth, controladorPlatos.putPlato);
api.delete('/platos/:platoId',auth.isAuth, controladorPlatos.deletePlato);

//USUARIOS
api.get('/usuarios',auth.isAuth, controladorUsuarios.getUsuarios);
api.get('/usuarios/:usuarioId',auth.isAuth, controladorUsuarios.getUsuario);
api.post('/registro/',controladorUsuarios.postRegistro);
api.put('/usuarios',auth.isAuth, controladorUsuarios.putUsuario);
api.delete('/usuarios/:usuarioId',auth.isAuth, controladorUsuarios.deleteUsuario);
api.post('/login', controladorUsuarios.login);

module.exports = api;
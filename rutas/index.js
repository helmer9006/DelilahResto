const express = require('express');
const api = express.Router();
const controladorPlatos = require('../controladores/CtrlPlatos');
const controladorUsuarios = require('../controladores/CtrlUsuarios');
const controladorPedidos = require('../controladores/CtrlPedidos')
const controladorFormasdePago = require('../controladores/CtrlFormasdepago');
const controladorEstadosPedido = require('../controladores/CtrlEstadospedido');
const controladorPerfiles = require('../controladores/CtrlPerfiles')

const auth = require('../middelwares/auth');

//PLATOS
api.get('/platos', controladorPlatos.getPlatos);
api.get('/platos/:platoId',auth.isAuth, controladorPlatos.getPlato);
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

//PEDIDOS
api.get('/pedidos',auth.isAuth, controladorPedidos.getPedidos);
api.post('/pedidos', controladorPedidos.postPedido);
api.put('/pedidos', auth.isAuth, controladorPedidos.putPedidos);
//FORMAS DE PAGO
api.get('/formasdepago', controladorFormasdePago.getFormasPago);

//ESTADOS DE PEDIDOS

api.get('/estadospedido', controladorEstadosPedido.getEstadosPedido);

//PERFILES
api.get('/perfiles', auth.isAuth, controladorPerfiles.getPerfiles);

module.exports = api;
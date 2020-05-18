//*****************CONTROLADOR DE PEDIDOS********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAER TODOS LOS ESTADO PEDIDO

function getEstadosPedido(req, res){
    
    console.log('GET /api/estadospedido')
    sequelize.query('SELECT * FROM estados_pedidos',
        { type: sequelize.QueryTypes.SELECT })
        .then(function (estados) {
            if (!estados.length) {
                return res.status(404).json({ "message": `No existen estados` })
            } else {
                res.status(200).json(estados)
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}

module.exports = {
    getEstadosPedido
}
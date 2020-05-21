//*****************CONTROLADOR DE PEDIDOS********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAER TODAS LAS FORMAS DE PAGO

function getFormasPago(req, res){
    
    console.log('GET /api/formasdepago')
    sequelize.query('SELECT * FROM formas_de_pago',
        { type: sequelize.QueryTypes.SELECT })
        .then(function (formas) {
            if (!formas.length) {
                return res.status(404).json({ "message": `No existen formas de pago` })
            } else {
                res.status(200).json(formas)
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}

module.exports = {
    getFormasPago
}
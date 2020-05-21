//*****************CONTROLADOR DE PEDIDOS********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAER TODOS LOS PEDIDOS

function getPedidos(req, res) {
    let productosArray = [];
    let pedidosArray = [
        //     {
        //     id: 1,
        //     id_usuario: 1,
        //     id_forma_pago: 1,
        //     valor_pedido: 24000,
        //     id_estado: 1,
        //     observacion: 'sin salsa',
        //     fecha_registro: '2020-05-10 18:52:43',
        //     fecha_actualizacion: '2020-05-10 18:52:43',
        //     productos: [
        //         {
        //             id_pedido: 2,
        //             id_plato: 1,
        //             cantidad: 2,
        //             impuestos: 0,
        //             neto: 10000,
        //             total: 10000,
        //             fecha_registro: '2020-05-10 18:52:43',
        //             fecha_actualizacion: '2020-05-10 18:52:43',
        //         },
        //         {
        //             id_pedido: 2,
        //             id_plato: 1,
        //             cantidad: 2,
        //             impuestos: 0,
        //             neto: 10000,
        //             total: 10000,
        //             fecha_registro: '2020-05-10 18:52:43',
        //             fecha_actualizacion: '2020-05-10 18:52:43',
        //         },
        //     ]

        // }
    ];


    console.log('GET /api/pedidos')
    // console.log(req.usuario)
    //validar si es administrador para traer todos los pedidos o solo los del usuario en caso de serlo
    if (req.usuario.id_perfil === 1) {
        sequelize.query('SELECT * FROM pedidos',
            { type: sequelize.QueryTypes.SELECT })
            .then(function (pedidos) {

                if (!pedidos.length) {
                    return res.status(404).json({ "message": `No existen pedidos` })
                } else {

                    sequelize.query('SELECT * FROM detalles_pedidos',
                        {
                            type: sequelize.QueryTypes.SELECT
                        })
                        .then(function (detalles) {
                            for (let i of pedidos) {
                                let det = detalles.filter(pedido => pedido.id_pedido == i.id);
                                Object.assign(i, { productos: det })
                                pedidosArray.push(i);
                            }
                            res.status(200).json(pedidosArray);
                        })

                }

            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });
    } else {
        sequelize.query('SELECT * FROM pedidos WHERE id_usuario = :id',
            {
                replacements: { id: req.usuario.id },
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (pedidos) {

                if (!pedidos.length) {
                    return res.status(404).json({ "message": `No tienen ningún pedido` })
                } else {

                    sequelize.query('SELECT * FROM detalles_pedidos',
                        {
                            type: sequelize.QueryTypes.SELECT
                        })
                        .then(function (detalles) {
                            for (let i of pedidos) {
                                let det = detalles.filter(pedido => pedido.id_pedido == i.id);
                                Object.assign(i, { productos: det })
                                pedidosArray.push(i);
                            }
                            res.status(200).json(pedidosArray);
                        })

                }

            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });

    }
}


module.exports = {
    getPedidos
}
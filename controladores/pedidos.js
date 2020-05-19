//*****************CONTROLADOR DE PEDIDOS********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAER TODOS LOS PEDIDOS
function getPedidos(req, res) {
    const pedidosArray = [
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
const productosArray = []

    console.log('GET /api/pedidos')
    // console.log(req.usuario)
    //validar si es administrador para traer todos los pedidos o no
    if (req.usuario.id_perfil === 1) {
        sequelize.query('SELECT * FROM pedidos',
            { type: sequelize.QueryTypes.SELECT })
            .then(function (pedidos) {
                if (!pedidos.length) {
                    return res.status(404).json({ "message": `No existen pedidos` })
                } else {
                    for (let i of pedidos) {
                        // console.log(i)

                        sequelize.query('SELECT * FROM detalles_pedidos where id_pedido = :id_pedido',
                            {
                                replacements: { id_pedido: i.id },
                                type: sequelize.QueryTypes.SELECT
                            })

                            .then(function (detalles) {
                                if (!detalles.length) {
                                    return;
                                } else {
                                    for (let j of detalles) {
                                        // console.log(i)
                                        // Object.defineProperty(i, "productos", { value: j})
                                      productosArray.push()
                                        console.log('este es i ', i)
                                    }
                                    
                                }
                            })
                            pedidosArray.push(i)
                    }

                    res.status(200).json(pedidosArray)
                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });
    } else {
        console.log('GET /api/pedidos')
        console.log(req.usuario)
        //solo permitir acceso a los pedidos propios
        sequelize.query('SELECT * FROM pedidos where id_usuario = :id_usuario',
            {
                replacements: { id_usuario: req.usuario.id },
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (pedidos) {
                if (!pedidos.length) {
                    return res.status(404).json({ "message": `No has realizado ningún pedio` })
                } else {

                    res.status(200).json(pedidos)

                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });

    }
}


module.exports = {
    getPedidos
}
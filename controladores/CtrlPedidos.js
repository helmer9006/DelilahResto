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

                                Object.assign(i)
                                pedidosArray.push(i);

                                // if (!detalles.length) {
                                //     return;
                                // } else {
                                //     for (let j of detalles) {
                                //         // console.log(i)
                                //         // Object.defineProperty(i, "productos", { value: j})
                                //       Object.assign(i, );
                                //       productos.push(j)
                                //       console.log("este es pedidosa rrya  \n",i)
                                //     }

                                // }
                            })

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

//CREAR NUEVO PEDIDO
function postPedido(req, res) {
    let banderDetalle = false;
    console.log(`POST /api/pedidos  - ${req.body}`)
    const body = req.body;
    sequelize.query('INSERT INTO pedidos (id_usuario, id_forma_pago, valor_pedido, observacion, id_estado) values (:id_usuario, :id_forma_pago, :valor_pedido, :observacion, :id_estado)',
        {
            replacements: {
                id_usuario: body.id_usuario,
                id_forma_pago: body.id_forma_pago,
                valor_pedido: body.valor_pedido,
                observacion: body.observacion,
                id_estado: 1
            }
        })

        .then((pedido) => {
            console.log(pedido[0]);
            for (let i of body.productos) {

                sequelize.query('INSERT INTO detalles_pedidos (id_pedido, id_plato, cantidad, impuesto, neto, total) values (:id_pedido, :id_plato, :cantidad, :impuesto, :neto, :total)',
                    {
                        replacements: {
                            id_pedido: pedido[0],
                            id_plato: i.id_plato,
                            cantidad: i.cantidad,
                            impuesto: i.impuesto,
                            neto: i.neto,
                            total: i.total
                        }
                    })
                    .then((result) => {
                        console.log('se han creado los detalles de los platos correctamente')
                    }, (err) => {
                        return res.status(500).json({ "mensaje": `Se ha producido un error  ${err}` })
                    })

            }
            if (pedido[1] > 0) {
                res.status(200).json({ 'mensaje': 'El pedido se ha creado correctamente' })
            } else {
                return res.status(500).json({ "mensaje": `Se ha producido un error` })
            }
        }, (err) => {
            return res.status(500).json({ "mensaje": `Se ha producido un error  ${err}` })
        })




}

//MODIFICAR PEDIDO - TABLA PEDIDOS
function putPedidos(req, res) {
    const body = req.body;
    console.log(`/PUT api/pedidos - id Pedido  ${body.id}`)

    if (req.usuario.id_perfil === 1) {
        sequelize.query('UPDATE pedidos SET  id_usuario = :id_usuario, id_forma_pago = :id_forma_pago, valor_pedido = :valor_pedido, id_estado = :id_estado, observacion = :observacion, fecha_actualizacion = :fecha_actualizacion where id = :id',
            {
                replacements: {
                    id: body.id,
                    id_usuario: body.id_usuario,
                    id_forma_pago: body.id_forma_pago,
                    valor_pedido: body.valor_pedido,
                    id_estado: body.id_estado,
                    observacion: body.observacion,
                    fecha_actualizacion: new Date()
                }
            })

            .then(function (resultado) {
                console.log("resul", resultado[0].affectedRows)
                if (resultado[0].affectedRows > 0) {
                    res.status(200).json({ 'mensaje': 'El pedido se ha actualizado correctamente' })
                } else {
                    res.status(404).json({ 'mensaje': 'No se ha modificado ningun pedido' })
                }

            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });
    } else {
        return res.status(403).json({ "mensaje": `No tienes permiso para modificar pedidos` })
    }
}


module.exports = {
    getPedidos,
    postPedido,
    putPedidos
}
//*****************CONTROLADOR DE PLATOS********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');


const sequelize = new Sequelize(`${config.db}`);

//TRAER TODOS LOS PLATOS
function getPlatos(req, res) {

    console.log('GET /api/platos')
    // console.log(req.usuario)
    sequelize.query('SELECT * FROM platos',
        { type: sequelize.QueryTypes.SELECT })
        .then(function (platos) {
            if (!platos.length) {
                return res.status(404).json({ "message": `No existe plato` })
            } else {
                res.status(200).json(platos)
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}
//TRAER UN PLATO POR ID
function getPlato(req, res) {
    console.log('GET x ID /api/platos')
    console.log(req.params.platoId)
    const platoId = req.params.platoId;
    sequelize.query('SELECT * FROM platos where id = :id',
        {
            replacements: { id: platoId },
            type: sequelize.QueryTypes.SELECT
        })
        .then(function (plato) {

            if (!plato.length) {
                return res.status(404).json({ "message": `No existe plato` })
            } else {
                res.status(200).json(plato[0])
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}
//REGISTRA UN PLATO
function postPlato(req, res) {

    console.log('POST /api/platos')
    console.log(req.body)
    const body = req.body;
    if (req.usuario.id_perfil === 1) {
        sequelize.query('INSERT INTO platos(descripcion, descripcion_abreviada, precio, descuento, img) VALUES (:descripcion, :descripcion_abreviada, :precio, :descuento, :img)',
            {
                replacements: {
                    descripcion: body.descripcion,
                    descripcion_abreviada: body.descripcion_abreviada,
                    precio: body.precio,
                    descuento: body.descuento,
                    img: body.img,
                }
            })
            .then(function (resultados) {

                console.log(resultados);
                res.status(200).json({ 'mensaje': 'Plato Creado correctamente' });

            }, function (err) {

                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` })
            });
    } else {

        return res.status(403).json({ "mensaje": `No tienes permiso para crear un plato` })
    }
}
//MODIFICA UN PALTO X ID
function putPlato(req, res) {
    let platoId = req.body.id;
    console.log(`PUT /api/platos - Id Plato: ${platoId}`)

    const body = req.body;

    if (req.usuario.id_perfil === 1) {
        sequelize.query('UPDATE platos SET  descripcion = :descripcion, descripcion_abreviada = :descripcion_abreviada, precio = :precio, descuento = :descuento, img = :img  WHERE id=:id',
            {
                replacements: {
                    id: body.id,
                    descripcion: body.descripcion,
                    descripcion_abreviada: body.descripcion_abreviada,
                    precio: body.precio,
                    descuento: body.descuento,
                    img: body.img
                }
            })
            .then(function (resultado) {
                console.log("resul", resultado[0].affectedRows)
                if (resultado[0].affectedRows > 0) {
                    res.status(200).json({ 'mensaje': 'El plato se ha actualizado correctamente' })
                } else {
                    res.status(404).json({ 'mensaje': 'No existe plato' })
                }

            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });

    } else {
        return res.status(403).json({ "mensaje": `No tienes permiso para modificar al contenido` })
    }
}
//ELIMINA UN PLATO X ID
function deletePlato(req, res) {
    let platoId = req.params.platoId;
    console.log(`DELETE /api/platos parametro - Id: ${platoId}`)
    if (req.usuario.id_perfil === 1) {
        sequelize.query('DELETE FROM platos WHERE id=:id',
            {
                replacements: { id: platoId }
            })
            .then(function (resultados) {
                console.log(resultados[0].affectedRows)
                if (resultados[0].affectedRows > 0) {
                    res.status(200).json({ 'mensaje': 'El plato ha sido eliminado correctamente.' })
                } else {
                    res.status(404).json({ 'mensaje': 'No se encontro registro para eliminar' })
                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });
    } else {
        return res.status(403).json({ "mensaje": `No tienes permiso para eliminar al contenido` })
    }
}

module.exports = {
    getPlatos,
    getPlato,
    postPlato,
    putPlato,
    deletePlato
}
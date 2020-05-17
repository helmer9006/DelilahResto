//*****************CONTROLADOR DE USUARIO********************
const service = require('../servicios/index')
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAER TODOS LOS USUARIOS
function getUsuarios(req, res) {

    console.log('GET /api/usuarios')
    console.log(req.usuario)
    //validar si es administrador para traer todos los usuarios registrados
    if (req.usuario.id_perfil === 1) {
        sequelize.query('SELECT * FROM usuarios',
            { type: sequelize.QueryTypes.SELECT })
            .then(function (usuarios) {
                if (!usuarios.length) {
                    return res.status(404).json({ "message": `No existen usuarios` })
                } else {
                    res.status(200).json(usuarios)
                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });
    } else {

        console.log('GET /api/usuarios')
        console.log(req.usuario)
        //solo permite mostrarse asi mismo porque es usuario cliente
        sequelize.query('SELECT * FROM usuarios where id = :id',
            {
                replacements: { id: req.usuario.id },
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (usuario) {
                if (!usuario.length) {
                    return res.status(404).json({ "message": `No existen usuario` })
                } else {
                    res.status(200).json(usuario)
                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });

    }
}
//TRER UN USUARIO POR ID
function getUsuario(req, res) {
    console.log('GET x ID /api/usuarios')
    console.log(req.params.usuarioId)
    //validar si usuario es administrador
    if (req.usuario.id_perfil === 1) {
        const usuarioId = req.params.usuarioId;
        sequelize.query('SELECT * FROM usuarios where id = :id',
            {
                replacements: { id: usuarioId },
                type: sequelize.QueryTypes.SELECT
            })
            .then(function (usuario) {

                if (!usuario.length) {
                    return res.status(404).json({ "message": `No existe usuario` })
                } else {
                    res.status(200).json(usuario[0])
                }
            }, function (err) {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            });

    } else {
        //validar si usuario esta consultando info de el mismo
        if (req.usuario.id == req.params.usuarioId) {
            const usuarioId = req.params.usuarioId;
            sequelize.query('SELECT * FROM usuarios where id = :id',
                {
                    replacements: { id: usuarioId },
                    type: sequelize.QueryTypes.SELECT
                })
                .then(function (usuario) {

                    if (!usuario.length) {
                        return res.status(404).json({ "message": `No existe usuario` })
                    } else {
                        res.status(200).json(usuario[0])
                    }
                }, function (err) {
                    return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
                });
        } else {
            return res.status(403).json({ "mensaje": `No tienes permiso para consultar informacion de otros usuarios` })
        }
    }
}
//REGISTRO DE NUEVO USUARIO 
function postRegistro(req, res) {

    console.log('POST /api/usuarios')
    console.log(req.body)
    const body = req.body;
    sequelize.query('INSERT INTO usuarios(usuario, nombre_completo, direccion, correo, telefono, clave, id_perfil, estado) VALUES (:usuario, :nombre_completo, :direccion, :correo, :telefono, :clave, :id_perfil, :estado)',
        {
            replacements: {
                usuario: body.usuario,
                nombre_completo: body.nombre_completo,
                direccion: body.direccion,
                correo: body.correo,
                telefono: body.telefono,
                clave: body.clave,
                id_perfil: 3,
                estado: 1
            }
        })
        .then(function (resultado) {
            console.log(resultado);
            res.status(200).json({ 'mensaje': 'Usuario Creado correctamente' });

        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` })
        });

}

function putUsuario(req, res) {
    const body = req.body;
    console.log(`/PUT api/usuarios - id Usuario  ${body.id}`)

    if (req.usuario.id_perfil === 1) {   
    sequelize.query('UPDATE usuarios SET  usuario = :usuario, nombre_completo = :nombre_completo, direccion = :direccion, correo = :correo, telefono = :telefono, clave = :clave, id_perfil = :id_perfil, estado = :estado where id = :id',
        {
            replacements: {
                id: body.id,
                usuario: body.usuario,
                nombre_completo: body.nombre_completo,
                direccion: body.direccion,
                correo: body.correo,
                telefono: body.telefono,
                clave: body.clave,
                id_perfil: body.id_perfil,
                estado: body.estado
            }
        })

        .then(function (resultado) {
            console.log("resul", resultado[0].affectedRows)
            if (resultado[0].affectedRows > 0) {
                res.status(200).json({ 'mensaje': 'El usuario se ha actualizado correctamente' })
            } else {
                res.status(404).json({ 'mensaje': 'No se ha modificado ningun registro' })
            }

        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
    }else{
        
    }
}
//ELIMINAR UN USUARIO POR PARAMETRO ID
function deleteUsuario(req, res) {
    let usuarioId = req.params.usuarioId;
    console.log(`DELETE /api/usuarios parametro - Id: ${usuarioId}`)

    sequelize.query('DELETE FROM usuarios WHERE id=:id',
        {
            replacements: { id: usuarioId }
        })
        .then(function (resultados) {
            console.log(resultados)
            if (resultados[0].affectedRows > 0) {
                res.status(200).json({ 'mensaje': 'El usuario ha sido eliminado correctamente.' })
            } else {
                res.status(404).json({ 'mensaje': 'No se encontro registro para eliminar' })
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}

//VALIDAR USUARIO - LOGIN - BODY - JSON
function login(req, res) {
    const body = req.body;
    console.log(`POST /api/login parametro - body - json: ${JSON.stringify(body)}`)
    console.log('clave ' + req.body.clave)

    sequelize.query('SELECT * FROM usuarios where usuario = :usuario',
        {
            replacements: { usuario: body.usuario },
            type: sequelize.QueryTypes.SELECT
        })
        .then(function (usuario) {
            // console.log("el usaurio......",usuario)
            if (!usuario.length) {
                return res.status(404).json({ "mensaje": `No existe usuario` })
            } else {
                if (usuario[0].estado != 1) return res.status(401).json({ 'mensaje': `usuario inactivo..!!!.` });
                if (usuario[0].clave == body.clave) {
                    console.log('entra if')
                    req.usuario = usuario[0];
                    res.status(200).json({
                        'mensaje': 'Te has logeado correctamente',
                        'token': service.createToken(usuario[0])
                    });
                } else {
                    console.log('entra else')
                    res.status(401).json({ 'mensaje': `Datos invalidos..!!!.` });
                }
            }
        }, function (err) {
            return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
        });
}

module.exports = {
    getUsuarios,
    getUsuario,
    postRegistro,
    putUsuario,
    putUsuario,
    deleteUsuario,
    login
}
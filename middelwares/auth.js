const servicios = require('../servicios/index');
const Sequelize = require('sequelize');
const config = require('../config')
const sequelize = new Sequelize(`${config.db}`);

function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).json({ 'mensaje': 'No tienes autorizacion.' });
    }

    const token = req.headers.authorization.split(" ")[1];
    servicios.verificarToken(token)
        .then(res => {
            console.log('respuesta res ', res)
            req.usuario = res;
            next();
        })
        .catch(resp => {
            res.status(resp.status).json({ 'mensaje': resp.mensaje })
        })
}

//VALIDAR SI EXISTE UN USUARIO CON DICHO CORREO
function validarSiExiste(req, res, next) {

    const _correo = req.body.correo;

    sequelize.query('SELECT * FROM usuarios where correo = :correo',
    {
        replacements: { correo: _correo },
        type: sequelize.QueryTypes.SELECT
    })

    .then(function (usuario) {
        if (!usuario.length) {
            return next();
        } else {
            return res.status(409).json({ 'mensaje': `El usuario ya se encuentra registro al evento!!!.` })
        }
    }, function (err) {
        return res.status(500).json({ 'mensaje': `error al valdiar correo  ${err}`})
    });
}

module.exports = {
    isAuth,
    validarSiExiste
};
const jwt = require('jsonwebtoken');
const config = require('../config');

function createToken(usuario) {
    return jwt.sign(JSON.stringify(usuario), config.secreto);

}

function verificarToken(token) {

    const verifica = new Promise((resolve, reject) => {
        try {

            const verificaToken = jwt.verify(token, config.secreto);

            resolve(verificaToken);

        } catch (error) {
            console.log('entro error token ' + error)
            reject({
                status: 500,
                mensaje: 'Token Invalido'
            });
        };
    });
    return verifica;
}

module.exports = { createToken, verificarToken };
//*****************CONTROLADOR DE PERFILES********************
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(`${config.db}`);

//TRAE TODOS LOS PERFILES
function getPerfiles(req, res) {
    console.log('GET /api/perfiles');
    if (req.usuario.id_perfil === 1) {
        sequelize.query('SELECT * FROM perfiles',
            { type: sequelize.QueryTypes.SELECT })
            .then((perfiles) => {
                if (!perfiles.length) {
                    return res.status(404).json({ "message": `No existen perfiles` })
                } else {
                    res.status(200).json(perfiles)
                }
            }, (err) => {
                return res.status(500).json({ 'mensaje': `Se ha producido un error  ${err}` });
            })
    } else {
        return res.status(403).json({ 'mensaje': `No tienes permisos para ver los perfiles` });
    }
}

module.exports = { getPerfiles }
const app =require('./app');
const config = require('./config');

app.listen(config.port, () => {
    console.log(`=======Servidor en linea====== en http://localhost:${config.port}`)
});



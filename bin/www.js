// Module dependencies
let app = require('../server.js');
let debug = require('debug')('mean-app:server');
let http = require('http');
let db = require('../models');

// Store port from environment in Express
let port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// Normalize a port into a number, string, or false
function normalizePort(val) {
    let port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if(port >= 0) {
        return port;
    }

    return false;
}

// Create HTTP server
let server = http.createServer(app);

// Sync to MySQL database and Listen on port
db.sequelize.sync({ force: true }).then(function(){
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
})

// Event listener for HTTP server error event
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
          'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated priviliges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Event listener for HTTP server listening event
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'?
          'pipe ' + addr
        : 'port ' + addr.port;
    debut('Listening on ' + bind);
}
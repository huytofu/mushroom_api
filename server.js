/**
 * Module dependencies.
 */
module.exports = {
    createServer: function () {
        var app = require('./index');
        var http = require('http');
        var port = process.env.PORT || 4000;
        var server = http.createServer(app);
        app.set('port', port);
        // var io = require('socket.io').listen(server);
        // var socket = require('./configs/socket');
        // socket.init(io);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        return {
            close: async () => {
                await new Promise((resolve, reject) => {
                    server.close(() => resolve());
                });
            }
        }
        //Add functions
        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }
            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
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
        function onListening() {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            console.log('\n0===> Listening on ' + bind + '\n');
        }
    }
}
var socket = {
    init: function (io) {
        // middleware
        io.use(function (inSocket, next) {
            var token = inSocket.handshake.query.token;
            log(token)
            // if (isValid(token)) {
                return next();
            // }
            // return next(new Error('authentication error'));
        });
        socket.initNamespace(io, socket.namespaceMain + socket.namespaceVerification);
    },
    initNamespace: function (io, namepsace) {
        var nsp = io.of(namepsace);
        nsp.on('connection', function (inSocket) {
            console.log('someone connected');
            inSocket.on('message', function (data) {
                console.log(data);
            });
        });
    }
};

module.exports = socket;

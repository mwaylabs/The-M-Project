

exports.listen = function(server) {

    var io = require('socket.io').listen(server);

    var live = {

        io: io,

        chatMessages: [],

        data: io.of('/live_data').authorization(function (handshakeData, callback) {

            handshakeData.name = handshakeData.query.name;
            callback(null, true);

        }).on('connection', function (socket) {

            socket.on('bind', function(data) {

                if (entities[data]) {
                    var channel = 'entity_' + data;
                    socket.on(channel, function(data) {
                        socket.broadcast.emit(channel, data);
                    });
                }
            });
        })
    }

    return live;
};
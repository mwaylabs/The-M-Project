

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

                if (data && typeof data === 'string') {
                    var channel = 'entity_' + data;
                    socket.on(channel, function(msg) {
                        msg = this.handleMessage(msg);
                        if (msg) {
                            socket.broadcast.emit(channel, msg);
                        }
                    });
                }
            });
        }),

        handleMessage: function(msg) {
            if (msg.method && msg.id && msg.data) {
                return msg;
            }
        }
    }

    return live;
};


exports.listen = function(server) {

    var io = require('socket.io').listen( server, { resource: '/bikini/live' } );

    var bikni = {

        io: io,

        live: io.sockets.authorization(function (handshakeData, callback) {

            handshakeData.name = handshakeData.query.name;
            callback(null, true);

        }).on('connection', function (socket) {

            socket.on('bind', function(data) {
                var entity = typeof data === 'object' ? data.entity : data;
                if (entity && typeof entity === 'string') {
                    var channel = 'entity_' + entity;

                    // listen to this channel
                    socket.on(channel, function(msg, fn) {
                        bikni.handleMessage(entity, msg, function(data, error) {

                            // if the response is an object message has succeeded
                            if (typeof data === 'object') {
                                msg.data = data;
                                msg.time = new Date().getTime();
                                msg.id   = data._id;
                                if (msg.method != 'read') {
                                    socket.broadcast.emit(channel, msg);
                                }
                            } else if (!error) {
                                error = typeof data === 'string' ? data : 'error processing message!';
                            }
                            // callback to the client, send error if failed
                            fn(msg, error);
                        });
                    });

                    // send update messages, saved since time
                    if (data && data.time) {
                        bikni.readMessages(entity, data.time, function(msg) {
                            if (msg) {
                                socket.emit(channel, msg);
                            }
                        });
                    }
                }
            });
        }),

        handleMessage: function(entity, msg, callback) {
            if (msg && msg.method && msg.id && msg.data) {
                if (typeof callback === 'function') {
                    callback(msg.data);
                }
            }
        },

        sendMessage: function(entity, msg) {
            var channel = 'entity_' + entity;
            if (msg && msg.method) {
                io.sockets.emit(channel, msg);
            }
        },

        readMessages: function(entity, time, callback) {
        }
    };

    return bikni;
};


exports.listen = function(server) {

    var io = require('socket.io').listen(server);

    var sockets = {

        io: io,

        chatMessages: [],

        test: io.of('/test').on('connection', function (socket) {
            socket.emit('connected', { hello: 'world' });
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('news', { hello: data });
            });
        }),

        chat: io.of('/chat').authorization(function (handshakeData, callback) {
            handshakeData.name = handshakeData.query.name;
            callback(null, true);
        }).on('connection', function (socket) {
            var name = socket.handshake.name || 'Nobody';
            socket.emit('connected', socket.id);

            for (var i=0; i<sockets.chatMessages.length; i++) {
                socket.emit('message', sockets.chatMessages[i]);
            }

            var time = new Date().getTime();
            // tell all others, there is a new user
            socket.broadcast.emit('new-user', { name: name, time: time });

            // send new messages to everyone in "/chat", including the sender
            socket.on('message', function(data) {
                sockets.chatMessages.push(data);
                if (sockets.chatMessages.length > 20) {
                    sockets.chatMessages.shift();
                }
                sockets.chat.emit('message', data);
            });
        }),

        liveData: io.of('/live_data').authorization(function (handshakeData, callback) {

            handshakeData.name = handshakeData.query.name;
            callback(null, true);

        }).on('connection', function (socket) {

            socket.on('bind', function(entity) {

                if (entity && typeof entity === 'string') {
                    var channel = 'entity_' + entity;
                    socket.on(channel, function(msg) {
                        msg = sockets.handleMessage(entity, msg );
                        if (msg) {
                            socket.broadcast.emit(channel, msg);
                        }
                    });
                }
            });
        }),

        handleMessage: function(entity, msg) {
            if (msg && msg.method && msg.id && msg.data) {
                return msg;
            }
        },

        sendMessage: function(entity, msg) {
            var channel = 'entity_' + entity;
            if (msg && msg.method) {
                this.liveData.emit(channel, msg);
            }
        }

    }

    return sockets;
};
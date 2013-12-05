

exports.listen = function(server) {

    var io = require('socket.io').listen(server);

//    var RedisStore = require('socket.io/lib/stores/redis')
//      , redis  = require('socket.io/node_modules/redis')
//      , pub    = redis.createClient()
//      , sub    = redis.createClient()
//      , client = redis.createClient();
//
//    io.set('store', new RedisStore({
//        redisPub : pub,
//        redisSub : sub,
//        redisClient : client
//    }));

//    var MongoStore   = require('socket.io-mongo');
//    io.configure(function() {
//        var store = new MongoStore({ url: 'mongodb://localhost:27017/test' });
//        store.on('error', console.error);
//        io.set('store', store);
//    });

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

            socket.on('bind', function(data) {
                var entity = typeof data === 'object' ? data.entity : data;
                if (entity && typeof entity === 'string') {
                    var channel = 'entity_' + entity;

                    // listen to this channel
                    socket.on(channel, function(msg, fn) {
                        sockets.handleMessage(entity, msg, function(data, error) {

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
                        sockets.readMessages(entity, data.time, function(msg) {
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
                this.liveData.emit(channel, msg);
            }
        },

        readMessages: function(entity, time, callback) {
        }
    };

    return sockets;
};
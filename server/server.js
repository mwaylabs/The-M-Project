var exec = require('child_process').exec;
//start mongodb
exec('mongod run --config /usr/local/etc/mongod.conf', function(){});

var express      = require('express');
var server       = express();
var http_server  = require('http').createServer(server);
var socketPath   = '/bikini/live';
var sockets      = require('./bikini_live.js').listen(http_server, socketPath);
var rest         = require('./mongodb_rest.js').create("test");
var PORT         = 8200;
var path         = "/bikini";

http_server.listen(PORT);
console.log('http://127.0.0.1:' + PORT);

server.use(express.static(__dirname + '/public/'));
server.use(express.static(__dirname + '/../framework/'));
server.use(express.bodyParser());

/* Allow Access-Control-Allow-Origin to everyone */
server.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

//Find documents
server.get(path+"/:name/info", function(req, res) {
    res.send({
        time: new Date().getTime(),
        socketPath: socketPath,
        entity: req.params.name
    });
});

//Find documents
server.get(path+"/:name", function(req, res) {
    rest.find(req, res);
});

//Find a specific document
server.get(path+'/:name/:id', function(req, res) {
    rest.findOne(req, res);
});

//Find a changes since given time
server.get(path+'/:name/changes/:time', function(req, res) {
    rest.findChanges(req, res);
});

//Create document(s)
server.post(path+'/:name', function(req, res) {
    rest.create(req, res);
});

//Update a document
server.put(path+'/:name/:id', function(req, res) {
    rest.update(req, res);
});

//Delete a document
server.delete(path+'/:name/:id', function(req, res){
    rest.delete(req, res);
});

// overriden functions

rest.sendMessage = function(entity, msg) {
    rest.saveMessage(entity, msg);
    sockets.sendMessage(entity, msg);
};

sockets.handleMessage = function(entity, msg, callback) {
    if (msg && msg.method) {
        return rest.handleMessage(entity, msg, callback);
    }
};

sockets.readMessages = function(entity, time, callback) {
    rest.readMessages(entity, time, callback);
};


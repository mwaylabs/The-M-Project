var express      = require('express');
var server       = express();
var http_server  = require('http').createServer(server);
var sockets      = require('./sockets.js').listen(http_server);
var rest         = require('./mongodb_rest.js').create("test");
var PORT         = 8100;

http_server.listen(PORT);
console.log('http://127.0.0.1:' + PORT);

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
server.get("/:name", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    rest.find(req, res);
});

//Find a specific document
server.get('/:name/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    rest.findOne(req, res);
});

//Create document(s)
server.post('/:name', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    rest.create(req, res);
});

//Update a document
server.put('/:name/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    rest.update(req, res);
});

//Delete a document
server.delete('/:name/:id', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    rest.delete(req, res);
});


rest.sendMessage = function(entity, msg) {
    sockets.sendMessage(entity, msg);
};

sockets.handleMessage = function(entity, msg) {
    if (msg && msg.method && msg.id && msg.data) {
        return rest.handleMessage(entity, msg);
    }
};

var express      = require('express');
var server          = express();
var http_server  = require('http').createServer(server);
var sockets      = require('./sockets.js').listen(http_server);
// var live_data    = require('./live_data.js').listen(http_server);
var rest         = require('./mongodb_rest.js').create("test");
var PORT         = 8100;

http_server.listen(PORT);
console.log('http://127.0.0.1:' + PORT);

server.use(express.static(__dirname + '/../framework/'));
server.use(express.bodyParser());

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

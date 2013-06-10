var express      = require('express');
var server          = express();
var http_server  = require('http').createServer(server);
var sockets      = require('./sockets.js').listen(http_server);
var rest         = require('./mongodb_rest.js').create("test");
var PORT         = 8100;

http_server.listen(PORT);
console.log('http://127.0.0.1:' + PORT);

server.use(express.static(__dirname + '/../'));
server.use(express.bodyParser());

//Find documents
server.get("/:name", function(req, res) {
    rest.find(req, res);
});

//Find a specific document
server.get('/:name/:id', function(req, res) {
    rest.findOne(req, res);
});

//Create document(s)
server.post('/:name', function(req, res) {
    rest.create(req, res);
});

//Update a document
server.put('/:name/:id', function(req, res) {
    rest.save(req, res);
});

//Delete a document
server.delete('/:name/:id', function(req, res){
    rest.delete(req, res);
});

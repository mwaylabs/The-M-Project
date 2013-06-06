var express      = require('express');
var server       = express();
var http_server  = require('http').createServer(server);
sharejs          = require('share');

http_server.listen(8100);

server.use(express.static(__dirname + '/public/'));

var options = {db: {type: 'none'}}; // See docs for options. {type: 'redis'} to enable persistance.
/*
var options = {
  db: { type: 'couchdb' },
  browserChannel: { cors: '*' },
  auth: function(client, action) {
    // This auth handler rejects any ops bound for docs starting with 'readonly'.
    if (action.name === 'submit op' && action.docName.match(/^readonly/)) {
      action.reject();
    } else {
      action.accept();
    }
  }
};
*/

console.log("ShareJS v" + sharejs.version);
console.log("Options: ", options);

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.server.attach(server, options);

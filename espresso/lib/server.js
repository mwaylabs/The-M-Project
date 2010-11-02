// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   alexander
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


var self = this,
    _l, Server;
    _l = {};
 

_l.sys = require('sys');
_l.http = require('http');


self.Server = function() {

  this.port = 8000;
  this.hostname = '127.0.0.1';

};

Server = self.Server;


Server.prototype.run = function(app) {

    var that = this;

    var appName = app.name;
    var appTheme = app.theme;
    var appLanguage = app.buildLanguage;

    _l.http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        var reqURL = require('url').parse(req.url);

        _l.sys.puts(reqURL.pathname);

        if(reqURL.pathname == '/'+appName){

        res.write('Espresso Server Responding to: '+ appName);
        res.write('<\/br>');
        res.write('using theme: '+ appTheme);
        res.write('<\/br>');
        res.write('using language: ' +appLanguage);

        }else{
          res.write(reqURL.pathname + ' not found !');
        }
        res.end();

       
    }).listen(that.port, that.hostname);


    _l.sys.puts('Server running at http://127.0.0.1:'+that.port+'/'+appName);


}


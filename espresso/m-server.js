// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   alexander
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

var g  = require('./core/espresso');



var server = new g.Server();

var app = new g.App({
   "name" : "demoApplication",
   "buildLanguage" : "en",
   "theme" : "m-deafult"
});




app.build(function (opt) {
    server.run(opt);
});






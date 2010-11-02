// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   alexander
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * Definition of App class.
 *
 * Representation of the project.
 *
 */


var self = this,
    _l = {},
    App;

/*
 * The required modules for App.
 *
 * sys    = node.js system module
 * fs     = filesystem
 * jslint = JavaScript source code validation.
 *
 */
_l.sys = require('sys');
_l.jslint = require('./jslint').JSLINT;
_l.fs = require('fs');


/**
 * Constructor function.
 * Sets the build options for the app (project) to be build.
 *
 * @param build_options  the options to customize the build process
 */

self.App = function(build_options) {
    
  this.name = 'defaultName';
  this.server = null;
  this.buildVersion = new Date().getTime();
  this.buildLanguage = 'english';
  this.theme = 'm-deafult';
  this.outputFolder = 'build';
  this.jslintCheck = true;

  this.addBuildingOptions(build_options);  


 
};

App = self.App;

/**
 * Sets the build options for the app (project) to be build.
 * 
 * @param build_options the options to customize the build process
 */
App.prototype.addBuildingOptions = function(build_options){

    var that = this;

    Object.keys(build_options).forEach(function (key) {
         that[key] = build_options[key];
    });
  
}

App.prototype.checkJSLINT = function(file){


    var data = _l.fs.readFileSync('./espresso_test_case/'+file, encoding='utf8');
        erg = _l.jslint(data);
        if(!erg){

        for (i = 0; i < _l.jslint.errors.length; ++i) {
              e = _l.jslint.errors[i];

              if (e) {
                  _l.sys.puts('WARNING: jslint error in "'+ file +'" at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
                  _l.sys.puts('         ' + (e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                  _l.sys.puts('');
              }
        }

}
    

}

App.prototype.BuildStep1 = function(){


    var files = _l.fs.readdirSync('./espresso_test_case');

    for (var i = 0;  i<files.length; i++){
         this.checkJSLINT(files[i]);

    }


}


App.prototype.BuildStep2 = function(){


    for (var x = 0; x< 100; x++ ){

    }
 _l.sys.puts("Build Step 2");



}


App.prototype.build = function(callback){


     this.BuildStep1();
   
     _l.sys.puts(this.name);

     callback(this);

}

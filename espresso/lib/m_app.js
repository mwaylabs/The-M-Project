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
    _l = {},
    App;

_l.sys = require('sys');
_l.jslint = require('./jslint').JSLINT;
_l.util = require('util');


self.App = function() {
    
  this.name = null;
  this.server = null;
  this.buildVersion = new Date().getTime();
  this.buildLanguage = 'english';
  this.theme = 'm-deafult';


 
};

App = self.App;


App.prototype.addBuildingOptions = function(build_options){

   /*

    _l.sys.puts("sdsd "+build_options.toString());

    var ee = _l.util.inspect(build_options, showHidden=true);

    _l.sys.puts(ee);

    var r = {
        bitwise: true,
        eqeqeq: true,
        immed: true,
        newcap: true,
        nomen: true,
        onevar: true,
        plusplus: true,
        regexp: true,
        undef: true,
        white: true,
        rhino: true
      };

 //   _l.jslint.report(limited);
    var g = '{ "name" : "demoApplication", "buildLanguage" : "en", "theme" : "m-deafult" }'
    

  //  erg = _l.jslint(ee.toString(),r);

 //  _l.sys.puts(erg);

  */

  // if(erg){
   for (key in build_options) {
     this[key] = build_options[key];
     }

 /*  }else{

       for (i = 0; i < _l.jslint.errors.length; ++i) {
             e = _l.jslint.errors[i];
             if (e) {
               _l.sys.puts('WARNING: jslint error at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
               _l.sys.puts('         ' + (e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
               _l.sys.puts(''+e.raw);
             }
           }
      

   }
   */
  
}

App.prototype.checkJSLINT = function(file){
      var fs = require('fs');

         var data = fs.readFileSync('./espresso_test_case/'+file,encoding='utf8');
             erg = _l.jslint(data);
             if(!erg){

             for (i = 0; i < _l.jslint.errors.length; ++i) {
                   e = _l.jslint.errors[i];
                   _l.sys.puts('');
                   if (e) {

                     _l.sys.puts('WARNING: jslint error in "'+ file +'" at line ' + e.line + ' character ' + e.character + ': ' + e.reason);
                     _l.sys.puts('         ' + (e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                     _l.sys.puts('');
                   }
                 }

}
    

}

App.prototype.BuildStep1 = function(){
    var that = this;
 var fs = require('fs');

    var filename = './espresso_test_case/espresso_test_case.js'
    var folderName = './espresso_test_case';

    var files = fs.readdirSync(folderName);

       // _l.sys.puts(files + " lenght "+files.length);

        for (var i = 0;  i<files.length; i++){
         //   _l.sys.puts("File : "+files[i]);
              this.checkJSLINT(files[i]);


        }


}


App.prototype.BuildStep2 = function(e,cb){


    for (var x = 0; x< 100; x++ ){

    }
 _l.sys.puts("Build Step 2");



}


App.prototype.build = function(callback){


     this.BuildStep1();
   


    callback(this);

}

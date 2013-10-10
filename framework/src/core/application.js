// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      07.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================


M.Application = function(options) {
    this.initialize(options);
};

//Backbone.Layout.configure({
//    manage: true
//});

M.Application.create = M.create;

_.extend(M.Application.prototype, Backbone.Events, {

    _type: 'M.Application',

    router: null,

    initialize: function(options){
        if(options && options.applicationName){
            window.TMP_APPLICATION_NAME = options.applicationName;
        }

        window[window.TMP_APPLICATION_NAME] = this;

        return this;
    },

    start: function( options ) {
        if(!options.router){
            console.warn('no router was given to the app start');
        }

        this.router = options.router;
        Backbone.history.start();
        return this;
    },

    initialRender: function(){
        this.layoutManager.initialRenderProcess();
    }
});
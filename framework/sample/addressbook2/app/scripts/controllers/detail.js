/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'exports'
], function( _, Backbone, M, exports ) {
    //    'use strict';

    var DetailController = M.Controller.create({

        applicationStart: function( params ) {
            debugger;
        },

        show: function(){
            debugger;
        }
    });


    exports.DetailController = function(){
        return DetailController;
    }

    return DetailController;
});
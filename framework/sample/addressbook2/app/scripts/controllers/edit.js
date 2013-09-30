/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'controllers/index', 'data/contacts', 'exports'
], function( _, Backbone, M, AppLayout, IndexController, ContactModel, exports ) {
    //    'use strict';

    var DetailController = M.Controller.create({

        applicationStart: function( params ) {

            var ctrl = IndexController;

            ctrl.init(params);

            Addressbook.layoutManager.setLayout(new AppLayout());

            Addressbook.layoutManager.applyViews({
                left: "views/ContactAll",
                right: "views/ContactEdit"
            }, function(){
                Addressbook.layoutManager.initialRenderProcess();
                if(Object.keys(params).length){
                    IndexController.set('CurrentContact', ContactModel.create(params));
                } else {
                    IndexController.init();
                }

            });
        },

        show: function(params){

            Addressbook.layoutManager.applyViews({
                left: "views/ContactAll",
                right: "views/ContactEdit"
            }, function(){
                if(Object.keys(params).length){
                    IndexController.set('CurrentContact', ContactModel.create(params));
                } else {
                    IndexController.init();
                }
            });
        }
    });


    exports.DetailController = function(){
        return DetailController;
    }

    return DetailController;
});
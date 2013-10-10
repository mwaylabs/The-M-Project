/*global define*/

define([
    'underscore', 'backbone', 'themproject', 'layouts/app-layout', 'controllers/index', 'data/contacts', 'exports', 'views/ContactAll'
], function( _, Backbone, M, AppLayout, IndexController, ContactModel, exports, all ) {
    //    'use strict';

    console.log('EDIT_CONTROLLER');

    var DetailController = M.Controller.create({

        applicationStart: function( params ) {
            console.log('a');
            var ctrl = IndexController;

            ctrl.init(params);

            Addressbook.layoutManager.setLayout(new AppLayout());
            Addressbook.layoutManager.applyViews({
                left: IndexController.AllContacts,
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
//            $('.right').html('<a href="/">edit</a>');
            Addressbook.layoutManager.applyViews({
                left: IndexController.AllContacts,
                right: "views/ContactEdit"

            }, function(){
                if(Object.keys(params).length){
                    IndexController.set('CurrentContact', ContactModel.create(params));
                }
            });
        }
    });


    exports.DetailController = function(){
        return DetailController;
    }

    return DetailController;
});
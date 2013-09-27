/*global define*/

define(['themproject', 'templates', 'controllers/index'], function( M, JST, IndexController ) {
    //    'use strict';

    var ContactEditView = M.View.extend({
        template: JST['app/scripts/templates/ContactDetail.ejs'],

        childViews: {

            'content': [ M.View.extend({

                template: JST['app/scripts/templates/PersonDetail.ejs'],

                value: function() {
                    var IndexController = require('controllers/index');
                    return IndexController.CurrentContact;
                },

                contentBinding: {
                    target: IndexController,
                    property: 'CurrentContact'
                }

            }), M.View.extend({

                template: JST['app/scripts/templates/PersonDetailAndroid.ejs'],

                value: function() {
                    var IndexController = require('controllers/index');
                    return IndexController.CurrentContact;
                },

                contentBinding: {
                    target: IndexController,
                    property: 'CurrentContact'
                }

            })
            ],
            'footer': M.Button.extend({
                value:'back',
                events: {
                    click: {
                        action: function(){
                            history.back();
                        }
                    }
                }
            })
        }
    });

    return ContactEditView;
});














































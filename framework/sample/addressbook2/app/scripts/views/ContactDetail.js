/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'themproject',
    'templates'
], function ($, _, Backbone, M, JST) {
    'use strict';

    var ContactdetailView = M.View.extend({
        template: JST['app/scripts/templates/ContactDetail.ejs'],

        childViews: {
            '[data-child-view="footer"]': M.Toolbar.extend({
                template: {
                    topcoat: '<h1 data-child-view="left"></h1>'
                },
                childViews: {
                    '[data-child-view="left"]': [
                        M.Button.create({
                            value: 'Edit 1'
                        }), M.Button.create({
                            value: 'Share 1'
                        })
                    ],
                    '[data-child-view="right"]': [
                        M.Button.extend({
                            value: 'Edit 2'
                        }), M.Button.extend({
                            value: 'Share 2'
                        })
                    ]
                }

            })
        }
    });

    return ContactdetailView;
});
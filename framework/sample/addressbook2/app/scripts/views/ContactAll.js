/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'themproject',
    'templates'
], function ($, _, Backbone, JM, ST) {
    'use strict';

    var AllView = M.View.create({
        value: 'All'
    });

    return AllView;
});
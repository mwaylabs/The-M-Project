// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.SliderView
 *
 * @type {*}
 * @extends M.View
 */
M.SliderView = M.View.extend({

    _type: 'M.SliderView',

    _templateString: M.TemplateManager.get('slider.ejs'),

    _getEventOptions: function () {
        return {
            'prevent_default': false,
            'no_mouseevents': true
        };
    }

});
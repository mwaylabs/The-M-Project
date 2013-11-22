/**
 * @module M.SliderView
 *
 * @type {*}
 * @extends M.View
 */
M.SliderView = M.View.extend({

    _type: 'M.SliderView',
    _template: _.tmpl(M.TemplateManager.get('M.SliderView')),
    _getEventOptions: function () {
        return {
            'prevent_default': false,
            'no_mouseevents': true
        };
    }

});
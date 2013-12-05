// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.TextareaView
 *
 * @type {*}
 * @extends M.TextfieldView
 */
M.TextareaView = M.TextfieldView.extend({

    _type: 'M.TextareaView',

    _template: _.tmpl(M.TemplateManager.get('M.TextareaView')),

    _attachToDom: function () {
        return YES;
    }
});
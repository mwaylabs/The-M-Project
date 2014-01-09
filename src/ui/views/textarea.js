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

    _templateString: M.TemplateManager.get('textarea.ejs'),

    _attachToDom: function () {
        return YES;
    }
});
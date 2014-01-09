// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * The M.TemplateManager is a singleton instance which
 * contain all our templates for the framework views.
 * You can retrieves a template with the get() method.
 *
 * @module M.TemplateManager
 *
 * @type {*}
 * @extends M.Object
 * @example
 *
 * var tpl = M.TemplateManager.get('ListView');
 * console.log( tpl ); // <ul data-childviews="list"></ul>
 *
 */
M.TemplateManager = M.Object.design({

    _currentUI: 'default',

    /**
     * Returns the template with the given name or
     * the default template for M.View if there is no such template.
     *
     * @param {String} name
     * @returns {String}
     */
    get: function( template, ui ) {

        ui = ui || M.TemplateManager._currentUI;

        var tpl = M.Templates[ui][template];

        if(tpl) {
            return tpl;
        }

        if(ui !== 'default') {
            return this.get(template, 'default');
        }

        return null;
    }
});

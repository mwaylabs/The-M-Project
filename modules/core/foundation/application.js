// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('view_manager.js');

/**
 * @class
 *
 * The root class for an application.
 *
 */
M.Application = M.Object.extend({

    /**
     * The type of this object.
     *g
     * @property {String}
     */
    type: 'M.Application',

    /**
     * The application's view manager.
     *
     * @property {Object}
     */
    viewManager: M.ViewManager,

    /**
     * The application's model registry.
     *
     * @property {Object}
     */
    modelRegistry: M.ModelRegistry,

    /**
     * The application's main-method, that is called automatically on load of the app.
     * Inside this method the rendering is initiated and all pages are bound to the 'pageshow'
     * event so one can do some action whenever a page is loaded.
     */
    main: function() {
        for(i in this.viewManager.viewList) {
            if(this.viewManager.viewList[i].type === 'M.PageView') {
                this.viewManager.viewList[i].render();
                $('#' + this.viewManager.viewList[i].id).bind('pageshow', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageDidLoad));
            }
        }
    }

});
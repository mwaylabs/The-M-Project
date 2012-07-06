// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/view_manager.js');

/**
 * @class
 *
 * The root class for an application.
 *
 * @extends M.Object
 */
M.Application = M.Object.extend(
/** @scope M.Application.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Application',

    /**
     * The application's name.
     *
     * @type String
     */
    name: null,

    /**
     * The application's current language.
     *
     * @type String
     */
    currentLanguage: null,

    /**
     * The application's default / fallback language.
     *
     * @type String
     */
    defaultLanguage: null,

    /**
     * This property is set to NO once the first page within an application was loaded. So this
     * can be used as a hook to trigger some actions at the first load of any view. To do initial
     * things for a specific view, use the isFirstLoad property of M.PageView.
     *
     * @type Boolean
     */
    isFirstLoad: YES,

    /**
     * This property can be used to define the application's entry page. If set, this page will
     * be the first to be displayed if your application is started.
     *
     * Even if this property is not absolutely necessary, we highly recommend to specify an entry
     * page! 
     *
     * @type String
     */
    entryPage: null,

    /**
     * This property contains the application-specific configurations. It is automatically set by Espresso
     * during the init process of an application. To access these properties within the application, use the
     * getConfig() method of M.Application.
     */
    config: {},

    /**
     * This method encapsulates the 'include' method of M.Object for better reading of code syntax.
     * Basically it integrates the defined pages within the application into M.Application and sets
     * some basic configuration properties, e.g. the default language.
     *
     * @param {Object} obj The mixed in object for the extend call.
     */
    design: function(obj) {
        var pages = {};
        for(var pageName in obj) {
            if(obj[pageName] && obj[pageName].type === 'M.PageView') {
                pages[pageName] = obj[pageName];
            }
        }      
        this.include({
            pages: pages
        });

        this.entryPage = ((obj.entryPage && typeof(obj.entryPage) === 'string') ? obj.entryPage : null);

        return this;
    },

    /**
     * The application's main-method, that is called automatically on load of the app.
     * Inside this method the rendering is initiated and all pages are bound to the 'pageshow'
     * event so one can do some action whenever a page is loaded.
     */
    main: function() {
        var that = this;

        /* first lets get the entry page and remove it from pagelist and viewlist */
        var entryPage = M.ViewManager.getPage(M.Application.entryPage.replace(/\s+/g, ''));
        delete M.ViewManager.viewList[entryPage.id];
        delete M.ViewManager.pageList[entryPage.id];

        /* set the default id 'm_entryPage' for entry page */
        entryPage.id = 'm_entryPage';

        /* now lets render entry page to get it into the DOM first and set it as the current page */
        entryPage.render();
        M.ViewManager.setCurrentPage(entryPage);

        /* now lets render all other pages */
        _.each(M.ViewManager.pageList, function(page) {
            page.render();
        });

        /* finally add entry page back to pagelist and view list, but with new key 'm_entryPage' */
        M.ViewManager.viewList['m_entryPage'] = entryPage;
        M.ViewManager.pageList['m_entryPage'] = entryPage;
    },

    /**
     *
     * @param {String} key The key of the configuration value to want to retrieve.
     * @returns {String} The value in the application's config object with the key 'key'.
     */
    getConfig: function(key) {
        if(this.config[key]) {
            return this.config[key];
        }
        return null;
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
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
     * The application's view manager.
     *
     * @type Object
     */
    viewManager: M.ViewManager,

    /**
     * The application's model registry.
     *
     * @type Object
     */
    modelRegistry: M.ModelRegistry,

    /**
     * The application's event dispatcher.
     *
     * @type Object
     */
    eventDispatcher: M.EventDispatcher,

    /**
     * The application's cypher object, used for encoding and decoding.
     *
     * @type Object
     */
    cypher: M.Cypher,

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
     * This property determines whether to use transitions within the application, e.g. on
     * page switches, or not. If set to NO, there will be no framework-sided transitions.
     *
     * @type Boolean
     */
    useTransitions: YES,

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

        /* live is jQuery fn that binds an event to all elements matching a certain selector now and in the future */
        var eventList = 'click change keyup focus blur orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop';
        $('*[id]').live(eventList, function(evt) {
            that.eventDispatcher.eventDidHappen(evt);
        });

        /* also bind the orientationchange event to the body of the application */
        $('body').bind('orientationchange', function(evt) {
            that.eventDispatcher.eventDidHappen(evt);
        });

        var html = '';
        for(var i in this.viewManager.viewList) {
            if(this.viewManager.viewList[i].type === 'M.PageView') {
                html += this.viewManager.viewList[i].render();
                /* bind the pageshow event to any view's pageDidLoad property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagebeforeshow', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageWillLoad));

                /* bind the pageshow event to any view's pageWillLoad property function */
                $('#' + this.viewManager.viewList[i].id).bind('pageshow', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageDidLoad));

                /* bind the pagebeforehide event to any view's pageWillHide property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagebeforehide', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageWillHide));

                /* bind the pagehide event to any view's pageDidHide property function */
                $('#' + this.viewManager.viewList[i].id).bind('pagehide', this.bindToCaller(this.viewManager.viewList[i], this.viewManager.viewList[i].pageDidHide));
            }
        }
    },

    showEntryPage: function() {
        var entryPage = M.ViewManager.getPage(M.Application.entryPage);
        document.location.hash = '#' + entryPage.id;
        if(window.history && typeof(window.history.pushState) === 'function') {
            window.history.pushState(null, 'entryPage', 'index.html#' + entryPage.id);
        }
        M.ViewManager.setCurrentPage(M.ViewManager.getPage(M.Application.entryPage));
        $.mobile.initializePage();
    }

});
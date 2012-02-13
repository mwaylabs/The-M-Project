// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/view.js');

/**
 * @class
 *
 * The ViewManager manages and knows all views that are used in the application. The ViewManager is part of M.Application.
 *
 * It is used by various other components (e.g. controller: switchToPage) to connect from javascript objects to their
 * HTML representation. 
 *
 * @extends M.Object
 */
M.ViewManager = M.Object.extend(
/** @scope M.ViewManager.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ViewManager',

    /**
     * The nextId delivered to a view (used as html id attribute value) with prefix m_.
     * Initial state is 0, will be incremeneted by 1 on each call.
     *
     * @type Number
     */
    nextId: 0,

    /**
     * Prefix for Id.
     *
     * @type String
     */
    idPrefix: 'm_',

    /**
     * An associative array containing all views used in the application. The key for a view is
     * its id.
     *
     * @type Object
     */
    viewList: {},

    /**
     * An associative array containing all pages used in the application. The key for a page is
     * its id.
     *
     * @type Object
     */
    pageList: {},

    /**
     * A reference to the currently displayed page.
     *
     * @type Object
     */
    currentPage: null,

    /**
     * A reference to the currently rendered page.
     *
     * @type Object
     */
    currentlyRenderedPage: null,

    /**
     * A reference to the latest found view which is necessary for the findView() method.
     *
     * @type Object
     */
    foundView: null,

    /**
     * Returns the next Id build from nextId property incremented by 1 and the prefix.
     * The id is used as the value for the HTML attribute id.
     * 
     * @returns {String} The next id for a view, e.g. 'm_123' (if last id was 'm_122').
     */
    getNextId: function() {
        this.nextId = this.nextId + 1;
        return this.idPrefix + this.nextId;
    },

    /**
     * Adds the view to the viewlist array.
     *
     * @param {Object} view The view to be registered in the viewlist.
     */
    register: function(view) {
        this.viewList[view.id] = view;

        if(view.type === 'M.PageView') {
            this.pageList[view.id] = view;
        }
    },

    /**
     * Unregisters the view from the viewlist array.
     *
     * @param {Object} view The view to be unregistered from the viewlist.
     */
    unregister: function(view) {
        delete this.viewList[view.id];
    },

    /**
     * Returns the view object from the view list array identified
     * by the value of its id attribute.
     *
     * @param {String} id The DOM id of the corresponding view object.
     * @returns {Object} The view object from the view list identified by id.
     */
    getViewById: function(id) {
        return this.viewList[id];
    },

	/**
     * another naming for getViewById - same same as getViewById
     *
     * @param {String} id The DOM id of the corresponding view object.
     * @returns {Object} The view object from the view list identified by id.
     */

    findViewById: function(id) {
        return this.getViewById(id);
    },

    /**
     * Returns the id for a given view.
     *
     * @param {Object} view The view for which the id value is wanted.
     * @returns {String} The id of a view object.
     */
    getIdByView: function(view) {
        return view.id;
    },

    /**
     * Returns the view object from the view list array identified by the view's
     * name and its surrounding view. If there are multiple views with the same
     * name on the same surrounding view, the first result is returned.
     *
     * Note: Try to use unique names for your views within the same surrounding view!
     *
     * @param {String|Object} parentView The name of the parent view (if it is a page) or the parent view itself.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The view object from the view list identified by the view's name and the page where it's on.
     */
    getView: function(parentView, targetView) {
        if(typeof(parentView) !== 'object') {
            parentView = M.Application.pages[parentView] ? M.Application.pages[parentView] : (M.ViewManager.getViewById(parentView) ? M.ViewManager.getViewById(parentView) : null);
        }
        var view = null;

        /* reset previously found views before searching again */
        this.foundView = null;
        if(parentView) {
            view = this.findView(parentView, targetView);
        }

        if(!view) {
            M.Logger.log('view \'' + targetView + '\' not found.', M.WARN);
        }
        return view;
    },

    /**
     * Searches for a certain view within a given parent view. If it is found, the result
     * is returned. Otherwise the search algorithm checks for possible child views and then
     * recursively searches within these child views for the target view.
     *
     * This method is mainly used by the getView() method to find a view within a page.
     *
     * @param {Object} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The last found view.
     */
    findView: function(parentView, targetView) {
        if(parentView.childViews) {
            var childViews = parentView.getChildViewsAsArray();
            for(var i in childViews) {
                if(targetView === childViews[i]) {
                    this.foundView =  parentView[targetView];
                    return this.foundView;
                } else {
                    this.findView(parentView[childViews[i]], targetView);
                }
            }
        }
        return this.foundView;
    },

    /**
     * Returns the page object from the view list array identified by its name. If
     * there are multiple pages with the same name, the first result is returned.
     *
     * Note: Try to use unique names for your pages!
     *
     * @param {String} pageName The name of the page to be returned.
     * @returns {Object} M.Page object identified by its name.
     */
    getPage: function(pageName) {
        var page = M.Application.pages[pageName];

        if(!page) {
            M.Logger.log('page \'' + pageName + '\' not found.', M.WARN);
        }
        return page;
    },

    /**
     * Returns the currently displayed page.
     * @returns {Object} The currently displayed page.
     */
    getCurrentPage: function() {
        return this.currentPage;
    },

    /**
     * Sets the currently displayed page.
     * @param {Object} page The page to be set as current page.
     */
    setCurrentPage: function(page) {
        this.currentPage = page;
    },

    /**
     * Debug method to print out all content from the viewlist array to the console.
     * @private
     */
    dumpViewList: function() {
      _.each(this.viewList, function(view){
        console.log(view.id + ': '+ view.type);
      });  
    }

});
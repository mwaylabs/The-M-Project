// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
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
 */
M.ViewManager = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ViewManager',

    /**
     * The nextId delivered to a view (used as html id attribute value) with prefix m_.
     * Initial state is 0, will be incremeneted by 1 on each call.
     *
     * @property {Number}
     */
    nextId: 0,

    /**
     * Prefix for Id.
     *
     * @property {String} 
     */
    idPrefix: 'm_',

    /**
     * Array containing all views used in the application.
     *
     * @property {Object}
     */
    viewList: [],

    /**
     * A reference to the currently displayed page.
     *
     * @property {Object}
     */
    currentPage: null,

    /**
     * A reference to the latest found view which is necassary for the findView() method.
     *
     * @property {Object}
     */
    foundView: null,

    /**
     * Returns the next Id build from nextId property incremented by 1 and the prefix.
     * The id is used as the value for the HTML attribute id.
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
        this.viewList.push(view);
    },

    /**
     * Returns the view object from the view list array identified
     * by the value of its id attribute.
     *
     * @param {String} id
     */
    getViewById: function(id) {
        var view = _.detect(this.viewList, function(v) {
            return v.id === id;
        });
        return view;
    },

    /**
     * Returns the id for a given view.
     *
     * @param {Object} view. The view for which the id value is wanted.
     */
    getIdByView: function(view) {
        return view.id;
    },

    /**
     * Returns the view object from the view list array identified by the view's
     * name and its page. If there are multiple views with the same name on the
     * same page, the first result is returned.
     *
     * Note: Try to use unique names for your views within the same page!
     *
     * @param {String, Object} parentView. The name of the parent view or the parent view itself.
     * @param {String} targetView. The name of the view to be returned.
     */
    getView: function(parentView, targetView) {
        if(typeof(parentView) !== 'object') {
            parentView = M.Application.pages[parentView];  
        }
        var view = null;

        /* reset previously found views before searching again */
        this.foundView = null;
        if(parentView) {
            view = this.findView(parentView, targetView);
        }

        if(!view) {
            M.Logger.log('view \'' + targetView + '\' not found on page \'' + targetView + '\'', M.WARN);
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
     * @param {Object} parentView. The parent view to search in.
     * @param {String} targetView. The name of the view to be returned.
     */
    findView: function(parentView, targetView) {
        if(parentView.childViews) {
            var childViews = $.trim(parentView.childViews).split(' ');
            for(var i in childViews) {
                if(targetView === childViews[i]) {
                    this.foundView =  parentView[targetView];
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
     * @param {String} pageName. The name of the page to be returned.
     */
    getPage: function(pageName) {
        var page = M.Application.pages[pageName];

        if(!page) {
            M.Logger.log('page \'' + pageName + '\' not found', M.WARN);
        }
        return page;
    },

    /**
     * Returns the currently displayed page.
     */
    getCurrentPage: function() {
        return this.currentPage;
    },

    /**
     * Sets the currently displayed page.
     */
    setCurrentPage: function(page) {
        this.currentPage = page;
    },

    /**
     * Debug method to print out all content from the viewlist array to the console.
     */
    dumpViewList: function() {
      _.each(this.viewList, function(view){
        console.log(view.id + ': '+ view.type);
      });  
    }

});
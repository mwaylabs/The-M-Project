// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Object
 */
M.ViewManager = M.Object.extend(/** @scope M.ViewManager.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.ViewManager',

    /**
     * This property contains the numerical index of the next view id to be
     * assigned. Whenever a component derived from M.View is generated,
     * an ID will be calculated based on this number and a static prefix which
     * is defined with the idPrefix property.
     *
     * @type Number
     */
    nextId: 0,

    /**
     * The prefix for the view IDs.
     *
     * @type String
     */
    idPrefix: 'm_',

    /**
     * This property contains a lookup map with all views within an application.
     *
     * @type Object
     * @private
     */
    _views: null,

    /**
     * This property is used internally to temporarily store a found view when looking
     * for it recursively.
     */
    _foundView: null,

    /**
     * This method returns a unique ID based on nextId and idPrefix. Each view within an
     * application get their own unique ID. This ID is stored both in the view's _id
     * property but also added to the view's DOM representation as the HTML id tag.
     *
     * @returns {String} The ID of a view.
     */
    getNewId: function( view ) {
        this.nextId = this.nextId + 1;

        var id = this.idPrefix + this.nextId;
        this._views[id] = view;

        return id;
    },

    /**
     * This method initialized the view manager.
     */
    _init: function() {
        this.callFromSuper('_init');

        this._views = {};
    },

    /**
     * This method will return a view object based on a given ID.
     *
     * @param id
     * @returns M.View
     */
    getViewById: function( id ) {
        return this._views[id];
    },

    /**
     * Returns the view object from the view list array identified by the view's
     * name and its surrounding view. If there are multiple views with the same
     * name on the same surrounding view, the first result is returned.
     *
     * Note: Try to use unique names for your views within the same surrounding view!
     *
     * @param {M.View} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @returns {Object} The view object from the view list identified by the view's name and the page where it's on.
     */
    getView: function( parentView, targetView ) {
        if( !(parentView.isMView && parentView.hasChildViews()) ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UI, 'The given parentView in M.ViewManager.getView() is no valid view or does not provide any child views.');
            return null;
        }

        /* reset the temp. stored view */
        this._foundView = null;

        /* look for it recursively */
        this._findView(parentView, targetView);

        if( !this._foundView ) {
            M.Logger.warn(M.CONST.LOGGER.TAG_FRAMEWORK_UI, 'The view \'' + targetView + '\' could not be found.');
        }

        return this._foundView;
    },

    /**
     * Searches for a certain view within a given parent view. If it is found, the result
     * is returned. Otherwise the search algorithm checks for possible child views and then
     * recursively searches within these child views for the target view.
     *
     * This method is a private function and mainly used by the getView() method to find a
     * view within a page.
     *
     * @param {M.View} parentView The parent view to search in.
     * @param {String} targetView The name of the view to be returned.
     * @private
     */
    _findView: function( parentView, targetView ) {
        if( !(parentView.isMView && parentView.hasChildViews()) ) {
            return;
        }

        var childViewsAsArray = parentView._getChildViewsAsArray();
        for( var i in childViewsAsArray ) {
            var childView = childViewsAsArray[i];
            if( targetView === childView ) {
                this._foundView = parentView[childView];
            } else {
                this._findView(parentView[childView], targetView);
            }
        }
    },

    /**
     * This method removes a given view from the internally used hash map that contains
     * all views used within an application.
     *
     * @param view
     */
    deleteView: function( view ) {
        if( view && view.isMView && view.getId() ) {
            delete this._views[view.getId()];
        }
    }

});
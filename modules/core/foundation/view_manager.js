// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('view.js');


/**
 * @class
 *
 * The ViewManager manages and knows all views that are used in the application. The ViewManager is part of M.Application.
 *
 * It is used by various other components (e.g. controller: switchToView) to connect from javascript objects to their
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
     * Returns the view object from the viewlist array identified
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
     * Debug method to print out all content from the viewlist array to the console.
     */
    dumpViewList: function() {
      _.each(this.viewList, function(view){
        console.log(view.id + ': '+ view.type);
      });  
    }

});
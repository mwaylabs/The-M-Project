// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

/**
 * @class
 *
 * The observable knows all observers, mainly views, and pushes updates if necessary.
 *
 */
M.Observable = M.Object.extend({

    /**
     * List that contains pairs of an observer with an observable. An observer is tightened to one
     * observable, but one observable can have multiple observers.
     *
     */
    bindingList: [],


    /**
     * Attach an observer to an observable.
     *
     * @param {String} observer The observer.
     * @param {String} observable The observable.
     */
    attach: function(observer, observable) {
        this.bindingList.push({
            observer: observer,
            observable: observable
        });
    },

    /**
     * Detach an observer from an observable.
     *
     * @param {String} observer The observer.
     * @param {String} observable The observable.
     */
    detach: function(observer, observable) {
        /* TODO: implement to delete observers from bindinList */
    }



});
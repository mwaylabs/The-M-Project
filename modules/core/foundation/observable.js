// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      29.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * The observable knows all observers, mainly views, and pushes updates if necessary.
 *
 * @extends M.Object
 */
M.Observable = M.Object.extend(
/** @scope M.Observable.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Observable',

    /**
     * List that contains pairs of an observer with an observable. An observer is tightened to one
     * observable, but one observable can have multiple observers.
     *
     * @type Array|Object
     */
    bindingList: null,

    /**
     * Attach an observer to an observable.
     *
     * @param {String} observer The observer.
     * @param {String} observable The observable.
     */
    attach: function(observer, observable) {
        if(!this.bindingList) {
            this.bindingList = [];
        }
        this.bindingList.push({
            observer: observer,
            observable: observable
        });
    },

    /**
     * Detach an observer from an observable.
     *
     * @param {String} observer The observer.
     */
    detach: function(observer) {
        /* grep is a jQuery function that finds
         * elements in an array that satisfy a certain criteria.
         * It works on a copy so we have to assign the "cleaned"
         * array to our bindingList.
         */
        this.bindlingList = $.grep(this.bindlingList, function(value, index) {
                return value.observer !== observer;
        });
    },

    /**
     * Notify all observers that observe the property behind 'key'.
     *
     * @param {String} key The key of the property that changed.
     */
    notifyObservers: function(key) {
        _.each(this.bindingList, function(entry){
            if(key === entry.observable || (entry.observable.indexOf('.') > 0 && entry.observable.indexOf(key) > -1)) {
                entry.observer.contentDidChange();
            } else if(key.indexOf('.') > 0 && entry.observable.indexOf(key.substring(0, key.lastIndexOf('.'))) === 0) {
                entry.observer.contentDidChange();
            }
        });
    }

});
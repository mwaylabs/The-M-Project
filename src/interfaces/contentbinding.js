// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      15.05.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 * @extends M.Interface
 */
M.ContentBinding = M.Interface.design(/** @scope M.ContentBinding.prototype */{

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.ContentBinding',

    /**
     * This property contains a list of observers.
     *
     * @type {Array}
     */
    _observers: null,

    /**
     * This property contains the content binding definition of an object that
     * implements the M.ContenBinding interface.
     *
     * @type {Object|Function}
     */
    contentBinding: null,

    /**
     * This method attaches an observer by adding it to the internally
     * managed list of observers. It also trigger the notify() to correctly
     * "pre-fill" the observer right away.
     *
     * @param {Object} observer
     * @param {String} property
     */
    attachObserver: function( observer, property ) {
        this._observers[property] = this._observers[property] || [];
        this._observers[property].push(observer);

        this.notify(property);
    },

    /**
     * This method detaches an observer by removing it from the internally
     * managed list of observers.
     *
     * @param {Object} observer
     * @param {String} property
     */
    detachObserver: function( observer, property ) {
        if( this._observers[property] ) {
            this._observers[property] = _.filter(this._observers[property], function( _observer ) {
                return observer !== _observer;
            });
        }
    },

    /**
     * This method is called whenever the bound content did change. This implementation
     * only serves as an interface which has to be overwritten by any object implementing
     * M.ContentBinding.
     */
    contentDidChange: function() {
        throw M.Exception.CONTENT_DID_CHANGE_NOT_IMPLEMENTED.getException();
    },

    /**
     * This method is used for notifying all bound observers about a change of the
     * value of the given property. This method basically calls the contentDidChange()
     * method of all bound observers.
     *
     * @param {String} property The property name that shall trigger a content change on its observers
     */
    notify: function( property ) {
        if( this.hasOwnProperty(property) && this._observers[property] ) {
            _.each(this._observers[property], function( observer ) {
                observer.contentDidChange();
            }, this);
            return YES;
        }

        return NO;
    },

    /**
     * M.ContentBinding's _init method.
     *
     * @private
     */
    _init: function() {
        this._observers = {};
        this.attachToObservable();
    },

    /**
     * This method retrieves the value that is referred to via the specified
     * content binding. If the value can't be retrieved, null is returned.
     *
     * @returns {*}
     */
    getContent: function() {
        try {
            var _cb = this.contentBinding;

            if( typeof _cb === 'function' ) {
                _cb = _cb();
            }

            return _cb.target[_cb.property];
        } catch( e ) {
            return null;
        }
    },

    /**
     * This method attaches the object to an observable based on its contentBinding
     * property. If the referred content binding target can not be evaluated (yet),
     * the operation is pushed to a stack of the application an will be executed
     * later, once all components (and javascript objects) are available.
     *
     * @returns {Boolean}
     */
    attachToObservable: function() {
        if( !this.contentBinding ) {
            return NO;
        }

        try {
            var _cb = null;

            if( typeof this.contentBinding === 'function' ) {
                _cb = this.contentBinding();
            } else if( typeof this.contentBinding === 'object' ) {
                _cb = this.contentBinding;
            }

            _cb.target.attachObserver(this, _cb.property);
        } catch( e ) {
            M.Application.addUndefinedContentBinding(this);
            return NO;
        }

        return YES;
    },

    /**
     * This method returns the object to implement the interface of
     * M.ContentBinding.
     *
     * @returns {Object}
     */
    getInterface: function() {
        return {
            _observers: null,
            contentBinding: null,
            attachObserver: this.attachObserver,
            detachObserver: this.detachObserver,
            attachToObservable: this.attachToObservable,
            notify: this.notify,
            contentDidChange: this.contentDidChange,
            getContent: this.getContent,
            set: this.set
        }
    },

    /**
     * This method sets the value of a certain property and triggers the notification
     * for all bound observers. This default behaviour should be overwritten when
     * implementing the content binding interface.
     *
     * @param {String} property
     * @param {*} value
     */
    set: function( property, value ) {
        this[property] = value;
        this.notify(property);
    }

});
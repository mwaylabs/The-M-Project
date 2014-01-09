// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.Toast
 *
 * @type {*}
 * @extends M.View
 *
 * @example
 * M.Toast.show('test');
 * M.Toast.show('test', M.Toast.CONST.CRISPY);
 *
 */
M.Toast = M.View.extend({

    _type: 'M.ToastView',

    /**
     * the template of the toast
     *
     */
    _templateString: M.TemplateManager.get('toast.ejs'),

    /**
     * the id of the toast
     */
    id: null,

    /**
     * Add the toast to the 'body' after initialize it
     * @param settings
     */
    initialize: function (settings) {
        var that = this;
        that.id = _.uniqueId();
        that.text = settings.text || M.Toast.CONST.TEXT;
        $('body').append(that.render().$el);

        that.timeoutId = setTimeout(function () {
            that.remove();
        }, settings.timeout || M.Toast.CONST.MEDIUM);
    },

    /**
     * assign the values for the template engine
     * @private
     */
    _assignTemplateValues: function () {
        this._templateValues = {
            id: this.id,
            text: this.text
        };
    },

    /**
     * remove
     */
    remove: function() {
        M.View.prototype.remove.apply(this, arguments);
        if(this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        M.Toast._run();
    },

    /**
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function() {
        return YES;
    }

});

M.Toast._stack = [];
M.Toast._isSequencing = false;
M.Toast._currentToast = null;

/**
 * Show a toast
 * @param {String} text to display
 * @param {Number} milliseconds to show the toast
 * @returns {M.Toast}
 */
M.Toast.show = function( options, timeout ) {
    if( typeof options === 'string' ) {
        options = {
            text: options,
            timeout: timeout
        };
    }

    // Push the toast into the stack
    this._stack.push(options);

    // Start sequence if it is not already running
    if( !this._isSequencing ) {
        this._isSequencing = true;
        this._run();
    }
};

/**
 * Removes all toasts from the sequence.
 */
M.Toast.removeAll = function() {
    this._stack = [];
    if( this._currentToast ) {
        this._currentToast.remove();
        this._currentToast = null;
    }
};

M.Toast._run = function() {
    if( this._stack.length === 0 ) {
        this._isSequencing = false;
        return;
    }
    var options = this._stack.shift();
    this._currentToast = M.Toast.create(options);
};

M.Toast.CONST = {
    RAW: 500,
    MEDIUM: 2000,
    CRISPY: 4000,
    TEXT: ''
};
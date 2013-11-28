/**
 * @module M.Toast
 *
 * @type {*}
 * @extends M.View
 *
 * @example
 * M.Toast.show('test');
 * M.Toast.show('test', M.Toast.CRISPY);
 *
 */
M.Toast = M.View.extend({

    _type: 'M.ToastView',

    /**
     * the template of the toast
     *
     */
    template: '<div class="toast"><div id="<%= id %>"><%= text %></div></div>',

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
        that.text = settings.text || M.Toast.TEXT;
        $('body').append(that.render().$el);

        setTimeout(function () {
            that.remove();
        }, settings.timeout || M.Toast.MEDIUM);
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
     * This function needs to be implemented to render the view if there is no value given
     * @returns {Boolean|Function|YES}
     * @private
     */
    _attachToDom: function() {
        return YES;
    }

});

/**
 * Show a toast
 * @param {String} text to display
 * @param {Number} milliseconds to show the toast
 * @returns {M.Toast}
 */
M.Toast.show = function (settings) {
    if (typeof settings === 'string') {
        settings = {
            text: settings
        };
    }
    return M.Toast.create(settings);
};

M.Toast.RAW = 500;
M.Toast.MEDIUM = 2000;
M.Toast.CRISPY = 4000;
M.Toast.TEXT = '';
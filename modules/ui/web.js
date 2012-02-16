// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2012 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      16.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * Comment ...
 *
 * @extends M.View
 */
M.WebView = M.View.extend(
/** @scope M.WebView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.WebView',

    isScrollable: YES,

    /**
     * Renders a web view as a simple iframe.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.checkURL();
        this.html += '<iframe id="' + this.id + '"' + this.style() + ' src="' + this.value + '" scrolling="' + (this.isScrollable ? 'YES' : 'NO') + '"></iframe>';

        return this.html;
    },

    renderUpdate: function() {
        if(this.value) {
            this.checkURL();
            $('#' + this.id).attr('src', this.value);
        }
    },

    checkURL: function() {
        if(this.value && this.value.lastIndexOf('http://') < 0 && this.value.lastIndexOf('https://') < 0) {
            this.value = 'http://' + this.value;
        }
    },

    /**
     * Applies some style-attributes to the web view.
     *
     * @private
     * @returns {String} The web view's styling as html representation.
     */
    style: function() {
        var html = ' class="tmp-webview';
        if(this.cssClass) {
            html += ' ' + this.cssClass;
        }
        html += '"';
        return html;
    },

    reload: function() {
        $('#' + this.id).attr('src', this.value);
    }

});

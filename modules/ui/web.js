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

    /**
     * This property can be used to specify wheter a user should be able to srcoll
     * within the web view or not.
     *
     * Note: If set to NO, the external web content must take care of fitting in the
     * web view. Otherwise some part of the web page won't be visible.
     *
     * @type Boolean
     */
    isScrollable: YES,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['load'],

    /**
     * This method renders a web view as a simple iFrame element.
     *
     * @private
     * @returns {String} The button view's html representation.
     */
    render: function() {
        this.checkURL();
        this.html = '<iframe id="' + this.id + '"' + this.style() + ' src="' + this.value + '" scrolling="' + (this.isScrollable ? 'YES' : 'NO') + '"></iframe>';

        return this.html;
    },

    /**
     * This method is called whenever the content bound by content binding changes.
     * It forces the web view to re-render meaning to load the updated url stored
     * in the value property.
     *
     * @private
     */
    renderUpdate: function() {
        if(this.value) {
            this.checkURL();
            $('#' + this.id).attr('src', this.value);
        }
    },

    /**
     * This method is used to check the given URL and to make sure there is an
     * HTTP/HTTPS prefix. Otherwise there could occur problems with Espresso.
     *
     * @private
     */
    checkURL: function() {
        if(this.value && this.value.lastIndexOf('http://') < 0 && this.value.lastIndexOf('https://') < 0) {
            this.value = 'http://' + this.value;
        }
    },

    /**
     * This method simply applies an internal CSS class to the web view and,
     * if available, the CSS class specified by the cssClass property of that
     * view element.
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

    /**
     * This method can be used to force the web view to reload its original
     * URL. This can either be the one specified by the value property or the
     * one specified by the currently bound content.
     */
    reload: function() {
        $('#' + this.id).attr('src', this.value);
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * M.LoaderView is the prototype for a loader a.k.a. activity indicator. This very simple
 * view can be used to show the user that something is happening, e.g. while the application
 * is waiting for a request to return some data.
 *
 * @extends M.View
 */
M.LoaderView = M.View.extend(
/** @scope M.LoaderView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.LoaderView',

    /**
     * This property states whether the loader has already been initialized or not.
     *
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * This property counts the loader calls to show
     *
     * @type Number
     */
    refCount: 0,

    /**
     * This property can be used to specify the default title of a loader.
     *
     * @type String
     */
    defaultTitle: 'loading',

    /**
     * Renders a loader view.
     *
     * @private
     * @returns {String} The loader view's html representation.
     */
    render: function() {
        this.html = '<div id="' + this.id + '" class="ui-loader ui-body-a ui-corner-all"><span class="ui-icon ui-icon-loading spin"></span><h1>' + this.defaultTitle + '</h1></div>';

        $('body').append($(this.html).css({
            top: $.support.scrollTop && $(window).scrollTop() + $(window).height() / 2
        }));
    },
            
    /**
     * This method initializes the loader by loading it once.
     *
     * @private 
     */
    initialize: function() {
        if(!this.isInitialized) {
            this.id = M.ViewManager.getNextId();
            M.ViewManager.register(this);
            this.render();
            this.hide();
            this.refCount = 0;
        }
    },

    /**
     * This method shows the default loader. You can specify the displayed label with the
     * title parameter.
     *
     * @param {String} title The title for this loader.
     */
    show: function(title) {
        this.refCount++;
        var title = title && typeof(title) === 'string' ? title : this.defaultTitle;
        $('.ui-loader h1').text(title);
        if(this.refCount == 1){
            $('#' + this.id).show();
        }
    },

    /**
     * This method hides the loader.
     */
    hide: function(force) {
        if(force || this.refCount <= 0) {
            this.refCount = 0;
        } else {
            this.refCount--;
        }
        if(this.refCount == 0){
            $('#' + this.id).hide();
        }
    }
    
});
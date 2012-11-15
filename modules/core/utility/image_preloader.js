// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2012 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.11.2012
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * @class
 *
 * This prototype defines methods for preloading images.
 *
 * @extends M.Object
 */
M.ImagePreloader = M.Object.extend(
/** @scope M.ImagePreloader.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.ImagePreloader',

    images: null,

    refId: '',

    bodyDOM: null,

    loadCounter: 0,

    init: function(obj) {
        obj.refId = obj.refId || M.UniqueId.uuid();
        obj.bodyDOM = $('body');

        return this.extend(obj);
    },

    preload: function() {
        var that = this;
        if(this.images && this.images.length > 0) {
            _.each(this.images, function(i) {
                window.setTimeout(function() {
                    that.preloadSingleImage(i);
                }, 1);
            });
        }
    },

    preloadSingleImage: function(image) {
        var imageView = M.ImageView.design({
            value: image,
            cssClass: 'tmp-image-preloading',
            events: {
                load: {
                    target: this,
                    action: 'loadSingle'
                },
                error: {
                    target: this,
                    action: 'error'
                }
            }
        });

        this.bodyDOM.append(imageView.render());
        imageView.registerEvents();
    },

    loadSingle: function(id) {
        this.loadCounter++;

        var imageView = M.ViewManager.getViewById(id);
        var image = imageView.value;
        imageView.destroy();

        /* call load event */
        if(this.events && M.EventDispatcher.checkHandler(this.events['load'])) {
            M.EventDispatcher.callHandler(this.events['load'], null, NO, [image, this.refId]);
        }

        /* call finish event? */
        if(this.loadCounter === this.images.length) {
            this.finish();
        }
    },

    error: function(id) {
        this.loadCounter++;

        var imageView = M.ViewManager.getViewById(id);
        var image = imageView.value;
        imageView.destroy();

        /* call error event */
        if(this.events && M.EventDispatcher.checkHandler(this.events['error'])) {
            M.EventDispatcher.callHandler(this.events['error'], null, NO, [image, this.refId]);
        }

        /* call finish event? */
        if(this.loadCounter === this.images.length) {
            this.finish();
        }
    },

    finish: function() {
        /* doublecheck */
        if(this.loadCounter !== this.images.length) {
            return;
        }

        /* call finish event */
        if(this.events && M.EventDispatcher.checkHandler(this.events['finish'])) {
            M.EventDispatcher.callHandler(this.events['finish'], null, NO, [this.refId]);
        }
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      09.08.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * A dashboard itm view contains an icon and a label and can be used as the only
 * kind of childviews for a dashboard view.
 *
 * @extends M.View
 */
M.DashboardItemView = M.View.extend(
/** @scope M.DashboardItemView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DashboardItemView',

    /**
     * The path/url to the dashboard item's icon.
     *
     * @type String
     */
    icon: null,

    /**
     * The label for the dashboard item. If no label is specified, the value will be
     * displayed instead.
     *
     * @type String
     */
    label: null,

    /**
     * This property specifies the recommended events for this type of view.
     *
     * @type Array
     */
    recommendedEvents: ['click', 'tap', 'taphold'],

    /**
     * Renders a dashboard item.
     *
     * @private
     * @returns {String} The dashboard item view's html representation.
     */
    render: function() {
        //this.computeValue();

        /* reset html property */
        this.html = '';

        if(!this.icon) {
            M.Logger.log('Please provide an icon for a dashboard item view!', M.WARN);
            return this.html;
        }

        this.html += '<div id="' + this.id + '" class="tmp-dashboard-item" ' + this.style() + '>';

        /* add image */
        var image = M.ImageView.design({
            value: this.icon
        });
        this.html += image.render();

        /* add label */
        this.html += '<div class="tmp-dashboard-item-label">' + (this.label ? this.label : this.value) + '</div>';

        this.html += '</div>';

        return this.html;
    },

    /**
     * This method is responsible for registering events for view elements and its child views. It
     * basically passes the view's event-property to M.EventDispatcher to bind the appropriate
     * events.
     *
     * It extend M.View's registerEvents method with some special stuff for list item views and
     * their internal events.
     */
    registerEvents: function() {
        this.internalEvents = {
            taphold: {
                target: this.parentView,
                action: 'editDashboard'
            },
            tap: {
                target: this.parentView,
                action: 'dispatchTapEvent'
            }
        }
        this.bindToCaller(this, M.View.registerEvents)();
    },

    /**
     * Applies some style-attributes to the dashboard item.
     *
     * @private
     * @returns {String} The button's styling as html representation.
     */
    style: function() {
        var html = '';
        if(this.cssStyle) {
            html += 'style="' + this.cssStyle + '"';
        }
        return html;
    }

});

/**
 * touch for jQuery
 *
 * Copyright (c) 2008 Peter Schmalfeldt (ManifestInteractive.com) <manifestinteractive@gmail.com>
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * @license http://www.gnu.org/licenses/gpl.html
 * @project jquery.touch
 */

// DEFINE DEFAULT VARIABLES
var _target=null, _dragx=null, _dragy=null, _rotate=null, _resort=null;
var _dragging=false, _sizing=false, _animate=false;
var _rotating=0, _width=0, _height=0, _left=0, _top=0, _xspeed=0, _yspeed=0;
var _zindex=1000;

jQuery.fn.touch = function(settings) {

	// DEFINE DEFAULT TOUCH SETTINGS
	settings = jQuery.extend({
		animate: true,
		sticky: false,
		dragx: true,
		dragy: true,
		rotate: false,
		resort: true,
		scale: false
	}, settings);

	// BUILD SETTINGS OBJECT
	var opts = [];
	opts = $.extend({}, $.fn.touch.defaults, settings);

	// ADD METHODS TO OBJECT
	this.each(function(){
		this.opts = opts;
		this.ontouchstart = touchstart;
		this.ontouchend = touchend;
		this.ontouchmove = touchmove;
		this.ongesturestart = gesturestart;
		this.ongesturechange = gesturechange;
		this.ongestureend = gestureend;
	});
};
function touchstart(e){
	_target = this.id;
	_dragx = this.opts.dragx;
	_dragy = this.opts.dragy;
	_resort = this.opts.resort;
	_animate = this.opts.animate;
	_xspeed = 0;
	_yspeed = 0;

	$(e.changedTouches).each(function(){

		var curLeft = ($('#'+_target).css("left") == 'auto') ? this.pageX : parseInt($('#'+_target).css("left"));
		var curTop = ($('#'+_target).css("top") == 'auto') ? this.pageY : parseInt($('#'+_target).css("top"));

		if(!_dragging && !_sizing){
			_left = (e.pageX - curLeft);
			_top = (e.pageY - curTop);
			_dragging = [_left,_top];
			if(_resort){
				_zindex = ($('#'+_target).css("z-index") == _zindex) ? _zindex : _zindex+1;
				$('#'+_target).css({ zIndex: _zindex });
			}
		}
	});
};
function touchmove(e){

	if(_dragging && !_sizing && _animate) {

		var _lastleft = (isNaN(parseInt($('#'+_target).css("left")))) ? 0:parseInt($('#'+_target).css("left"));
		var _lasttop = (isNaN(parseInt($('#'+_target).css("top")))) ? 0:parseInt($('#'+_target).css("top"));
	}

	$(e.changedTouches).each(function(){

		e.preventDefault();

		_left = (this.pageX-(parseInt($('#'+_target).css("width"))/2));
		_top = (this.pageY-(parseInt($('#'+_target).css("height"))/2));

		if(_dragging && !_sizing) {

			if(_animate){
				_xspeed = Math.round((_xspeed + Math.round( _left - _lastleft))/1.5);
				_yspeed = Math.round((_yspeed + Math.round( _top - _lasttop))/1.5);
			}

			if(_dragx || _dragy) $('#'+_target).css({ position: "absolute" });
			if(_dragx) $('#'+_target).css({ left: _left+"px" });
			if(_dragy) $('#'+_target).css({ top: _top+"px" });
		}
	});
};
function touchend(e){
    if(e.currentTarget.id) {
        var dashboard = M.ViewManager.getViewById(e.currentTarget.id).parentView;
        var items = [];
        _.each(dashboard.items, function(item) {
            items.push({
                id: item.id,
                x: $('#' + item.id).position().left,
                y: $('#' + item.id).position().top,
                item: item
            });
            items.sort(function(a, b) {
                /* assume they are in one row */
                if(Math.abs(a.y - b.y) < 30) {
                    if(a.x < b.x) {
                        return -1;
                    } else {
                        return 1;
                    }
                /* otherwise */
                } else {
                    if(a.y < b.y) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
        });
        var objs = [];
        _.each(items, function(item) {
            objs.push(item.item);
        });
        dashboard.setValue(objs);
        dashboard.renderUpdate();
        if(dashboard.isInEditMode) {
            dashboard.editDashboard();
        }
    }
};
function gesturestart(e){
	_sizing = [$('#'+this.id).css("width"), $('#'+this.id).css("height")];
};
function gesturechange(e){
	if(_sizing){
		_width = (this.opts.scale) ? Math.min(parseInt(_sizing[0])*e.scale, 300) : _sizing[0];
		_height = (this.opts.scale) ? Math.min(parseInt(_sizing[1])*e.scale, 300) : _sizing[1];
		_rotate = (this.opts.rotate) ? "rotate(" + ((_rotating + e.rotation) % 360) + "deg)" : "0deg";
		$('#'+this.id).css({ width: _width+"px", height: _height+"px", webkitTransform: _rotate });
	}
};
function gestureend(e){
	_sizing = false;
	_rotating = (_rotating + e.rotation) % 360;
};
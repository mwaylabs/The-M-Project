// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      17.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for any button view. A button is a view element that is
 * typically.........
 *
 * @extends M.View
 */
M.SplitToolbarView = M.View.extend(
/** @scope M.SplitToolbarView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.SplitToolbarView',

    showSelectedItemInMainHeader: YES,

    showMenuButtonInPortraitMode: YES,

    /**
     * Triggers render() on all children.
     *
     * @private
     */
    renderChildViews: function() {
        if(this.childViews) {
            var childViews = $.trim(this.childViews).split(' ');
            var currentToolbar = 0;
            for(var i in childViews) {
                var toolbar = this[childViews[i]];
                if(toolbar && toolbar.type === 'M.ToolbarView') {
                    toolbar.parentView = this;
                    if(currentToolbar === 0) {
                        toolbar.cssClass = toolbar.cssClass ? toolbar.cssClass + ' ui-splitview-menu-toolbar' : 'ui-splitview-menu-toolbar'
                    } else if(currentToolbar === 1) {
                        toolbar.cssClass = toolbar.cssClass ? toolbar.cssClass + ' ui-splitview-content-toolbar' : 'ui-splitview-content-toolbar'

                        /* check if this is a simple toolbar so we can add the menu button */
                        if(!toolbar.childViews && this.showMenuButtonInPortraitMode) {
                            toolbar.cssClass = toolbar.cssClass ? toolbar.cssClass + ' ui-splitview-content-toolbar-show-menu-button' : 'ui-splitview-content-toolbar-show-menu-button';
                            toolbar.childViews = 'menuButton label';
                            var buttonLabel = this[childViews[0]].value;
                            toolbar.menuButton = M.ButtonView.design({
                                value: buttonLabel,
                                icon: 'arrow-d',
                                anchorLocation: M.LEFT
                            });
                            toolbar.label = M.LabelView.design({
                                value: toolbar.value,
                                anchorLocation: M.CENTER
                            });
                            toolbar.value = '';
                        }
                    } else {
                        M.Logger.log('Too many child views given! M.SplitToolbarView only accepts two child views of type M.ToolbarView.', M.ERROR);
                        return;
                    }
                    this.html += toolbar.render();
                    currentToolbar++;
                } else {
                    M.Logger.log(childViews[i] + ' must be of type M.ToolbarView.', M.ERROR);
                }
            }
            return this.html;
        }
    }

});
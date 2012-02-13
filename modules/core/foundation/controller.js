// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      27.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/* Available transitions for page changes */
M.TRANSITION = {};
M.TRANSITION.NONE = 'none';
M.TRANSITION.SLIDE = 'slide';
M.TRANSITION.SLIDEUP = 'slideup';
M.TRANSITION.SLIDEDOWN = 'slidedown';
M.TRANSITION.POP = 'pop';
M.TRANSITION.FADE = 'fade';
M.TRANSITION.FLIP = 'flip';

m_require('core/foundation/observable.js');

/**
 * @class
 *
 * The root class for every controller.
 *
 * Controllers, respectively their properties, are observables. Views can observe them.
 *
 * @extends M.Object
 */
M.Controller = M.Object.extend(
/** @scope M.Controller.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Controller',

    /**
     * Makes the controller's properties observable.
     */
    observable: null,

    /**
     * Switch the active tab in the application. This includes both activating this tab
     * visually and switching the page.
     *
     * @param {M.TabBarItemView} tab The tab to be activated.
     */
    switchToTab: function(tab) {
        if(!(tab.parentView && tab.parentView.type === 'M.TabBarView')) {
            M.Logger.log('Please provide a valid tab bar item to the switchToTab method.', M.WARN);
            return;
        }
        var currentTab = tab.parentView.activeTab;
        var newPage = M.ViewManager.getPage(tab.page);

        /* store the active tab in tab bar view */
        tab.parentView.setActiveTab(tab);

        if(tab === currentTab) {
            var currentPage = M.ViewManager.getCurrentPage();
            if(currentPage !== newPage) {
                this.switchToPage(newPage, null, YES, NO);
            }
        } else {
            this.switchToPage(newPage, M.TRANSITION.NONE, NO, YES);
        }
    },

    /**
     * Switch the active page in the application.
     *
     * @param {Object|String} page The page to be displayed or its name.
     * @param {String} transition The transition that should be used. Default: horizontal slide
     * @param {Boolean} isBack YES will cause a reverse-direction transition. Default: NO
     * @param {Boolean} updateHistory Update the browser history. Default: YES
     */
    switchToPage: function(page, transition, isBack, updateHistory) {
        var timeStart = M.Date.now();
        page = page && typeof(page) === 'object' ? page : M.ViewManager.getPage(page);

        if(page) {
            transition = transition ? transition : M.TRANSITION.SLIDE;
            isBack = isBack !== undefined ? isBack : NO;
            updateHistory = updateHistory !== undefined ? updateHistory : YES;

            /* Now do the page change by using a jquery mobile method and pass the properties */
            if(page.type === 'M.PageView') {
                $.mobile.changePage($('#' + page.id), {
                    transition: M.Application.getConfig('useTransitions') ? transition : M.TRANSITION.NONE,
                    reverse: M.Application.getConfig('useTransitions') ? isBack : NO,
                    changeHash: updateHistory,
                    showLoadMsg: NO
                });
            }

            /* Save the current page in the view manager */
            M.ViewManager.setCurrentPage(page);
        } else {
            M.Logger.log('Page "' + page + '" not found', M.ERR);
        }
    },

    /**
     * This method initializes the notification of all observers, that observe the property behind 'key'.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object|String} value The value to be set.
     */
    set: function(key, value) {
        var keyPath = key.split('.');

        if(keyPath.length === 1) {
            this[key] = value;
        } else {
            var t = (this[keyPath[0]] = this[keyPath[0]] ? this[keyPath[0]] : {});
            for(var i = 1; i < keyPath.length - 1; i++) {
                t = (t[keyPath[i]] = t[keyPath[i]] ? t[keyPath[i]] : {});
            }

            t[keyPath[keyPath.length - 1]] = value;
        }

        if(!this.observable) {
            return;
        }

        this.observable.notifyObservers(key);
    }

});
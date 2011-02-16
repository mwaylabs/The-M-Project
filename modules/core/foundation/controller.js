// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
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
     * Helper function to build the location href for the view to be displayed.
     *
     * @param {String} id The id of the new target.
     */
    buildLocationHref: function(id) {
        return location.pathname + '#' + id;
    },

    /**
     * Switch the active tab in the application. This includes both activating this tab
     * visually and switching the page.
     *
     * @param {M.TabBarView} tab The tab to be activated.
     */
    switchToTab: function(tab) {
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
            this.switchToPage(newPage, newPage.tabBarView.transition ? newPage.tabBarView.transition : M.TRANSITION.NONE, NO, NO);
        }
    },

    /**
     * Switch the active page in the application.
     *
     * @param {Object, String} page The page to be displayed or its name.
     * @param {String} transition The transition that should be used. Default: horizontal slide
     * @param {Boolean} isBack YES will cause a reverse-direction transition. Default: NO
     * @param {Boolean} changeLoc Update the browser history. Default: YES
     */
    switchToPage: function(page, transition, isBack, changeLoc) {
        var timeStart = M.Date.now();
        page = page && typeof(page) === 'object' ? page : M.Application.viewManager.getPage(page);

        if(page) {
            transition = transition ? transition : M.TRANSITION.SLIDE;
            isBack = isBack !== undefined ? isBack : NO;
            changeLoc = changeLoc !== undefined ? changeLoc : YES;

            /* Now do the page change by using a jquery mobile method and pass the properties */
            if(page.type === 'M.PageView') {
                //console.log('$.mobile.changePage(' + page.id + ', ' + (M.Application.useTransitions ? transition : M.TRANSITION.NONE) + ', ' + (M.Application.useTransitions ? isBack : NO) + ', ' + changeLoc + ');');
                $.mobile.changePage(page.id, M.Application.useTransitions ? transition : M.TRANSITION.NONE, M.Application.useTransitions ? isBack : NO, YES);//!isBack ? changeLoc : NO);
            } else if(page.type === 'M.AlertDialogView' || page.type === 'M.ConfirmDialogView' || page.type === 'M.ActionSheetDialogView') {
                $.mobile.changePage($('#' + page.id), M.Application.useTransitions ? transition : M.TRANSITION.NONE, M.Application.useTransitions ? isBack : NO, YES);
            }

            /* Save the current page in the view manager */
            M.Application.viewManager.setCurrentPage(page);
        } else {
            M.Logger.log('Page "' + page + '" not found', M.ERROR);
        }
    },

    /**
     * Returns the class property behind the given key and informs its observers.
     *
     * @param {String} key The key of the property to be changed.
     * @param {Object, String} value The value to be set.
     */
    set: function(key, value) {
        this[key] = value;
        this.observable.notifyObservers(key);
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      02.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('view.js');

M.ViewManager = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ViewManager',
    
    nextId: 0,

    idPrefix: 'm_',

    viewList: [],

    getNextId: function() {
        this.nextId = this.nextId + 1;
        return this.idPrefix + this.nextId;
    },

    register: function(view) {
        this.viewList.push({
            id: view.id,
            view: view
        });
    },

    getViewById: function(id) {
        for (i in this.viewList) {
            if(this.viewList[i].id === id) {
                return this.viewList[i].view;
            }
        }
        return null;
    },

    getIdByView: function(view) {
        for (i in this.viewList) {
            if(this.viewList[i].view === view) {
                return this.viewList[i].id;
            }
        }
        return null;
    }

});
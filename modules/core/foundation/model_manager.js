// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('model.js');

M.ModelManager = M.Object.extend({

    modelList: [],

    nextId: 0,

    getNextId: function() {
        this.nextId = this.nextId + 1;
        return this.nextId;
    },

    add: function(obj) {
        obj.id = this.getNextId();
        this.modelList.push(obj);
    },

    remove: function(modelId) {
        if(typeof(modelId) === 'string') {
            modelId = parseInt(modelId);
        }
        obj = this.getModelForId(modelId);
        if(obj) {
            this.modelList = _.select(this.modelList, function(m){
                return m.id !== obj.id;
            });
        }
    },

    getModelForId: function(id) {
        var model = _.detect(this.modelList, function(m){
            return m.id === id;
        });
        return model;
    },

    dumpModelList: function() {
      _.each(this.modelList, function(model){
        console.log(model.id);
      });
    }

});
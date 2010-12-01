// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/model.js');

/**
 * @class
 *
 * The root object for ModelManager.
 *
 * A ModelManager is used by a controllers and is an interface that makes it easy for him to
 * handle his model records.
 * Even if each controllers has his own Model Manager, the id for each model is not bound to this one model manager,
 * but is synchronized with the model registry to solve conflicts when saving models to storage.
 */
M.ModelManager = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ModelManager',

    /**
     * Array containing all models of this model manager.
     *
     * @property {Object}
     */
    modelList: [],

    /**
     * Add the given model to the modelList.
     *
     * @param model
     */
    add: function(model) {
        this.modelList.push(model);
    },

    addMany: function(arrOfModels) {

        if(_.isArray(arrOfModels)){
            this.modelList = this.modelList.concat(arrOfModels);

        } else if(arrOfModels.type === 'M.Model') {

            this.add(arrOfModels);
        }

    },

    removeAll: function() {
        this.modelList = [];
    },

    remove: function(id) {
        if(typeof(id) === 'string') {
            id = parseInt(id);
        }
        model = this.getModelForId(id);
        if(model) {
            this.modelList = _.select(this.modelList, function(m){
                return m.id !== model.id;
            });
        }
    },

    getModelForId: function(id) {
        var model = _.detect(this.modelList, function(m){
            return m.id === id;
        });
        return model;
    },


    /**
     * The following methods encapsulate operations to the storage system.
     *
     */

    /**
     * Saves (persists) all records in modelList to the storage system.
     */
    saveAll: function() {
        _.each(this.modelList, function(m){
            m.save();
        });
    },

    /**
     * Save the model record, identified by id, to the storage system.
     *
     * @param {Number} id Identifies the model record.
     */
    save: function(id) {
        var model = this.getModelForId(id);
        if(model) {
            model.save();
        }
    },
    
    /**
     * Deletes all records in modelList from the storage system.
     */
    delAll: function() {
        _.each(this.modelList, function(m){
            m.del();
        });
    },

    /**
     * Delete the model record, identified by id, from the storage system.
     *
     * @param {Number} id Identifies the model record.
     */
    del: function(id) {
        var model = this.getModelForId(id);
        if(model) {
            model.del();
        }
    },

    /**
     * Find stored model records.
     */
    find: function() {
        var modelName = this.model.name;
        for(var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            /* Search for keys like: Model_123 (regex: ^Model_\d+) */
            var regexResult = new RegExp('^' + this.model.name + '_(\\d+)').exec(key);
            if(regexResult && regexResult[1]) {
                var obj = JSON.parse(localStorage.getItem(key));
                obj.id = parseInt(regexResult[1]);
                var model = this.model.createRecord(obj);
                this.add(model);
            }
        };
        this.modelList = _.sortBy(this.modelList, function(m) {
            return m.id;
        });
    },


    /**
     * Debug method to print out all content from the modelList array to the console.
     */
    dumpModelList: function() {
        _.each(this.modelList, function(model){
            console.log(model.id);
        });
    }
    
});
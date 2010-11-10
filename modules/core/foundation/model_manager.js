// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('model.js');

/**
 * @class
 *
 * The root object for ModelManager.
 *
 * A ModelManager is used by a controller and is an interface that makes it easy for him to
 * handle his model records.
 * Even if each controller has his own Model Manager, the id for each model is not bound to this one model manager,
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
     * Add the given model to the modelList but first.
     *
     * @param model
     */
    add: function(model) {
        this.modelList.push(model);
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
        this.getModelForId(id).save();
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
        this.getModelForId(id).del();
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
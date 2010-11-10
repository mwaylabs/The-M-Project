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

/**
 * @class
 *
 * The root object for ModelManager.
 *
 * A ModelManager is used by a controller to manage his models. Even if each controller has his own Model Manager, the
 * id for each model is not bound to this one model manager, but is synchronized with the model registry to solve
 * conflicts when saving models to storage.
 * 
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
     */
    modelList: [],
    
    /**
     * The model manager's model. (The one it manages).
     *
     */
    model: null,
    
    getNextId: function() {
        return M.Application.modelRegistry.getNextId(this.model.name);
    },

    add: function(model) {
        model.id = this.getNextId();
        this.modelList.push(model);
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

    saveAll: function() {
        _.each(this.modelList, function(m){
           m.save(); 
        });
    },

    save: function(modelId) {
    },

    dumpModelList: function() {
        _.each(this.modelList, function(model){
            console.log(model.id);
        });
    }
    
});
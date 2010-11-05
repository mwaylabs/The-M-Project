// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      05.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('logger.js');

/**
 * @class
 *
 * The root object for ModelRegistry.
 *
 * Model Registry is a central point for all models to get their Global Unique Identifier,
 * which is important for storage (guid is primary key as default).
 * 
 */
M.ModelRegistry = M.Object.extend({

    /**
     * The type of this object.
     *
     * @property {String}
     */
    type: 'M.ModelRegistry',


    /**
     * An array containing objects that save the model's name and their next GUId.
     * Acts globally.
     */
    registry: [],

    /**
     * Calculates the next GUId for a model named by modelName.
     *
     * @param {String} modelName The name of the model, e.g. 'Person'.
     */
    nextGUId: function(modelName) {
        for(i in this.registry){
            if(this.registry[i].modelName === modelName){
                this.registry[i].nextGUId = this.registry[i].nextGUId + 1;
                return this.registry[i].nextGUId;
            }
        }  
    },

    /**
     * Register a model at the registry.
     * Set nextGUId for this model to initial value 0.
     * 
     * @param {String} modelName The name of the model, e.g. 'Person'.
     */
    register: function(modelName) {

        if(_.detect(this.registry, function(m){ return m.modelName === modelName })) {
            return;
        }

        var obj = {
            modelName: modelName,
            nextGUId: 0
        };
        this.registry.push(obj);
        
    }

});
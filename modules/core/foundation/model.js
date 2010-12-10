// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      28.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.STATE_UNDEFINED = 'state_undefined';
M.STATE_NEW = 'state_new';
M.STATE_INSYNCPOS = 'state_insyncpos';
M.STATE_INSYNCNEG = 'state_insyncneg';
M.STATE_LOCALCHANGED = 'state_localchange';
M.STATE_VALID = 'state_valid';
M.STATE_INVALID = 'state_invalid';
M.STATE_DELETED = 'state_deleted';

m_require('core/foundation/model_registry.js');

/**
 * @class
 * 
 * M.Model is the prototype for every model and for every model record (a model itself is the blueprint for a model record).
 * Models hold the business data of an application respectively the application's state. It's usually the part of an application that is persisted to storage.
 * M.Model acts as the gatekeeper to storage. It uses data provider for persistence and validators to validate its records.
 * 
 * @extends M.Object
 */
M.Model = M.Object.extend(
/** @scope M.Model.prototype */ { 
    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Model',

    /**
     * The name of the model.
     *
     * @type String
     */
    name: '',

    /**
     * Unique identifier for the model record.
     *
     * Note: Unique doesn't mean that this id is a global unique ID, it is just unique
     * for records of this type of model.
     *
     * @type Number
     */
    id: null,

    /**
     * The model's record defines the properties that are semantically bound to this model:
     * e.g. a person's record is in simplest case: firstname, lastname, age.
     *
     * @type Object record
     */
    record: null,

    /**
     * Object containing all meta information for the object's properties
     * @type Object
     */
    __meta: {},

    /**
     * Manages records of this model
     * @type Object
     */
    recordManager: null,

    /**
     *
     * @param obj
     */
    records: null,

    /**
     * A constant defining the model's state. Important e.g. for syncing storage
     * @type String
     */
    state: M.STATE_UNDEFINED,


    /**
     * determines whether model shall be validated before saving to storage or not.
     * @type Boolean
     */
    usesValidation: YES,

    /**
     * The model's data provider. A data provider persists the model to a certain storage.
     *
     * @type Object
     */
    dataProvider: null,

    /**
     * Creates a new record of the model, means an instance of the model based on the blueprint.
     * You pass the object's specific attributes to it as an object.
     *
     * @param {Object} obj The specific attributes as an object, e.g. {firstname: 'peter', lastname ='fox'}
     * @returns {Object} The model record with the passed properties set. State depends on newly creation or fetch from storage: if
     * from storage then state is M.STATE_NEW or 'state_new', if fetched from database then it is M.STATE_VALID or 'state_valid'
     */
    createRecord: function(obj) {
        var modelRecord = this.extend({
            id: obj.id ? obj.id : M.Application.modelRegistry.getNextId(this.name),
            record: obj /* properties that are added to record here, but are not part of __meta, are deleted later (see below) */
        });

        modelRecord.state = obj.state ? obj.state : M.STATE_NEW;
        delete obj.state;
        delete modelRecord.record.id;

        /* if record contains properties that are not part of __meta (means that are not defined in the model blueprint) delete them */
        for(var i in modelRecord.record) {
            if(i === 'ID') {
                continue;
            }
            if(!modelRecord.__meta.hasOwnProperty(i)) {
                delete modelRecord.record[i];
            }
        }

        this.recordManager.add(modelRecord);
        return modelRecord;
    },

    /** 
     * Create defines a new model blueprint. It is passed an object with the model's attributes and the model's business logic
     * and after it the type of data provider to use.
     *
     * @param {Object} obj An object defining the model's  
     * @param {Object} dp The data provider to use, e. g. M.LocalStorageProvider
     * @returns {Object} The model blueprint: acts as blueprint to all records created with @link M.Model#createRecord
     */
    create: function(obj, dp) {
        var model = M.Model.extend({
            __meta: {},
            name: obj.__name__,
            dataProvider: dp,
            usesValidation: obj.usesValidation === null || obj.usesValidation === undefined ? this.usesValidation : obj.usesValidation
        });
        delete obj.__name__;
        delete obj.usesValidation;

        for(var prop in obj) {
            if(typeof(obj[prop]) === 'function') {
                model[prop] = obj[prop];
            } else if(obj[prop].type === 'M.ModelAttribute') {
                model.__meta[prop] = obj[prop];    
            }
        }

        model.recordManager = M.RecordManager.extend({});
        model.records = model.recordManager.records;

        M.Application.modelRegistry.register(model.name);

        /* Re-set the just registered model's id, if there is a value stored */
        /* Model Registry stores the current id of a model type into localStorage */
        var id = localStorage.getItem(model.name);
        if(id) {
            M.Application.modelRegistry.setId(model.name, parseInt(id));
        }
        return model;
    }, 

    /**
     * Returns a M.ModelAttribute object to map an attribute in our record.
     *
     * @param {String} type type of the attribute
     * @param {Object} opts options for the attribute, like required flag and validators array
     * @returns {Object} An M.ModelAttribute object configured with the type and options passed to the function.
     */
    attr: function(type, opts) {
        return M.ModelAttribute.attr(type, opts); 
    },

    /*
     * get and set methods for encapsulated attribute access
     */

    /**
     * Get attribute propName from model
     * @param {String} propName the name of the property whose value shall be returned
     * @returns {Object|String} value of property
     */
    get: function(propName) {
        return this.record[propName];
    },

    /**
     * Set attribute propName of model with value val
     * @param {String} propName the name of the property whose value shall be set
     * @param {String|Object} val the new value
     */
    set: function(propName, val) {
        this.record[propName] = val;
        this.__meta[propName].isUpdated = YES;
    },

    /**
     * Validates the model, means calling validate for each property.
     * @returns {Boolean} Indicating whether this record is valid (YES|true) or not (NO|false).
     */
    validate: function() {
        var isValid = YES;
        var validationErrorOccured = NO;
        /* clear validation error buffer before validation */
        M.Validator.clearErrorBuffer();

        /*
        * validationBasis depends on the state of the model: if the model is in state NEW, all properties (__meta includes all)
        * shall be considered for validation. if model is in another state, the model's record is used. example: the model is loaded from
        * a database with only two properties included (select name, age FROM...). record now only contains these two properties but __meta
        * still has all properties listed. models are valid if loaded from database so when saved again only the loaded properties need to get
        * validated because all others have not been touched. that's why then record is used.
        * */
        var validationBasis = this.state === M.STATE_NEW ? this.__meta : this.record;

        for (var i in validationBasis) {
            if(i === 'ID') { // skip property ID
                continue;
            }
            var prop = this.__meta[i];
            var obj = {
                value: this.record[i],
                modelId: this.name + '_' + this.id,
                property: i
            };
            if (!prop.validate(obj)) {
                isValid = NO;
            }
        }
        /* set state of model */
        /*if(!isValid) {
            this.state = M.STATE_INVALID;
        } else {
            this.state = M.STATE_VALID;   
        }*/
        return isValid;
    },

    /* CRUD Methods below */
    /**
     * Calls the corresponding find() of the data provider to fetch data based on the passed query or key.
     *
     * @param {Object} obj The param object with query or key and callbacks.
     * @returns {Boolean|Object} Depends on data provider used. When WebSQL used, a boolean is returned, the find result is returned asynchronously,
     * because the call itself is asynchronous. If LocalStorage is used, the result of the query is returned.
     */
    find: function(obj){
        obj = obj ? obj : {};
        /* check if the record list shall be cleared (default) before new found model records are appended to the record list */
        /* TODO: needs to be placed in callback */
        obj['deleteRecordList'] = obj['deleteRecordList'] ? obj.deleteRecordList : YES;
        if(obj.deleteRecordList) {
            this.recordManager.removeAll();
        }
        
        /* extends the given obj with self as model property in obj */
        return this.dataProvider.find( $.extend(obj, {model: this}) );
    },

    /**
     * Create or update a record in storage if it is valid (first check this).
     *
     * @param {Object} obj The param object with query and callbacks.
     * @returns {Boolean} The result of the data provider function call. Is a boolean. With LocalStorage used, it indicates if the save operation was successful.
     * When WebSQL is used, the result of the save operation returns asynchronously. The result then is just the standard result returned by the web sql provider's save method
     * which does not necessarily indicate whether the operation was successful, because the operation is asynchronous, means the operation's end is not predictable. 
     */
    save: function(obj) {
        obj = obj ? obj: {};
        if(!this.id) {
            return NO;
        }
        var isValid = YES;

        if(this.usesValidation) {
            isValid = this.validate();
        }

        if(isValid) {
            return this.dataProvider.save($.extend(obj, {model: this}));
        }
    },

    /**
     * Delete a record in storage.
     * @returns {Boolean} Indicating whether deletion was successful or not (only with synchronous data providers, e.g. LocalStorage). When asynchronous data providers
     * are used, e.g. WebSQL provider the real result comes asynchronous and here just the result of the del() function call of the @link M.WebSqlProvider is used.
     */
    del: function(obj) {
        obj = obj ? obj : {};
        if(!this.id) {
            return NO;
        }

       var isDel = this.dataProvider.del($.extend(obj, {model: this}));
        if(isDel) {
            this.state = M.STATE_DELETED;
            return YES
        }
        
    }

});
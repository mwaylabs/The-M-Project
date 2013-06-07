// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2013 M-Way Solutions GmbH. All rights reserved.
//            (c) 2013 panacoda GmbH. All rights reserved.
// Creator:   Frank
// Date:      02.04.2013
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

M.DataConnectorFirebase = M.DataConnector.extend({

    _type: 'M.DataConnectorFirebase',

    _initialized: false,

    _callback: null,

    /**
     * Default configuration
     */
    config: {
        name: 'https://mway.firebaseIO.com/the-m-project',
        version: '1.0',
        entities: []
    },

    init: function( obj, callback ) {
        if( !this._callback ) {
            this._callback = callback;
        }
        var that = this;
        this._initialized = true;

        this.openDb({
            error: function( msg ) {
                M.Logger.error(M.CONST.LOGGER.TAG_FRAMEWORK_DATA, msg);
            },
            success: function() {
                that._callback(obj, callback);
            }
        });
    },

    save: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this.insertOrReplace);
        } else {
            this.insertOrReplace(obj);
        }
    },

    del: function( obj ) {
        if( !this._initialized ) {
            this._init(obj, this.delete);
        } else {
            this.delete(obj);
        }
    },

    dropEntity: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._dropEntity);
        } else {
            this._dropEntity(obj);
        }
    },

    createEntity: function( obj ) {
        if( !this._initialized ) {
            this.init(obj, this._createEntity);
        } else {
            this._createEntity(obj);
        }
    },

    openDb: function( obj ) {
        var that = this;
        var error;
        if( !this.db ) {
            try {
                this.db = new Firebase(this.config.name);
                // initialize all entities
                var entities = this.getEntityNames();
                _.each(entities, function(name) {
                    that.createEntity({ entity: name});
                });
            } catch( e ) {
                error = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
            }
        }
        if( this.db ) {
            this.handleSuccess(obj, this.db);
        } else {
            error = error || M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, "failed opening database");
            this.handleError(obj, error);
        }
    },

    _dropEntity: function( obj ) {
        var that = this;

        var entity = this.getEntity(obj);

        if (this._checkEntity(entity, obj)) {

            if (entity.ref) {
                entity.ref.off(); // remove all bindings
                entity.ref = null;
            }

            if (entity.collection) {
                entity.collection.clear();
                entity.collection = null;
            }

            var onComplete = function(error) {
                if (error) {
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, 'Remove failed.');
                    that.handleError(obj, err);
                } else {
                    that.handleSuccess(obj);
                }
            };

            if (this._checkDb(obj)) {
                try {
                    var dbEntity = this.db.child(entity.name);
                    dbEntity.remove(onComplete);
                } catch(e) {
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                    that.handleError(obj, err);
                }
            }
        }
    },

    _createEntity: function( obj ) {
        // get entity
        var entity = this.getEntity(obj);

        if (this.db && this._checkEntity(obj, entity)) {
            try {
                if (!entity.ref) {
                    this._bindEntity(entity, this.db.child(entity.name))
                }
                this.handleSuccess(obj);
            } catch(e) {
                var err = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                this.handleError(obj, err);
            }
        }
    },

    _bindEntity: function(entity, ref) {
        var that = this;
        var store = this.getCollection(entity);
        entity.ref = ref;

        entity._asRecord = function (snapshot) {
            if (snapshot) {
                var name = snapshot.name();
                var data = snapshot.val();
                var record = entity.toRecord(data);
                record.setId(name);
                return record;
            }
        };

        entity.onChildAdded = function(snapshot, prevChildName) {
            store.add(this._asRecord(snapshot));
        };

        entity.onChildChanged = function(snapshot, oldName) {
            store.set(this._asRecord(snapshot));
        };

        entity.onChildRemoved = function(snapshot) {
            store.remove(snapshot.name());
        };

        entity.onChildMoved = function(snapshot, oldName) {
            store.changeKey(oldName, snapshot.getName());
        };

        entity.onCancel = function () { };

        entity.ref.on( 'child_added',   entity.onChildAdded,   entity.onCancel, entity);
        entity.ref.on( 'child_changed', entity.onChildChanged, entity.onCancel, entity);
        entity.ref.on( 'child_removed', entity.onChildRemoved, entity.onCancel, entity);
        entity.ref.on( 'child_moved',   entity.onChildMoved,   entity.onCancel, entity);
    },

    insertOrReplace: function(obj) {
        var that = this;
        // get data
        var records = this.getRecords(obj);
        // get entity
        var entity = this.getEntity(obj);

        var count = records.length;
        var onComplete = function(error) {
            if (--count <= 0) {
                if (error) {
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, 'Update failed.');
                    that.handleError(obj, err);
                } else {
                    that.handleSuccess(obj);
                }
            }
        };

        if (this._checkDb(obj) && this._checkEntity(obj, entity) && this._checkData(obj, records)) {
            _.each(records, function(record) {
                var value = entity.fromRecord(record);
                var key   = record.getId();
                try {
                    if (key) {
                        entity.ref.child(key).set(value, onComplete);
                    } else {
                        entity.ref.push(value, onComplete );
                    }
                } catch(e) {
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                    that.handleError(obj, err);
                }
            });
        }
    },

    delete: function(obj) {
        var that = this;
        // get records
        var records  = this.getRecords(obj);
        // get entity
        var entity = this.getEntity(obj);

        var count = records.length;
        var onComplete = function(error) {
            if (--count <= 0) {
                if (error) {
                    var err = M.Error.create(M.CONST.ERROR.WEBSQL_SYNTAX, 'Delete failed.');
                    that.handleError(obj, err);
                } else {
                    that.handleSuccess(obj);
                }
            }
        };

        if (this._checkDb(obj) && this._checkEntity(obj, entity)) {
            try {
                if (records && records.length > 0) {
                    _.each(records, function(record) {
                        entity.ref.child(record.getId()).remove(onComplete);
                    });
                } else {
                    // delete all
                    entity.ref.remove(onComplete);
                }
            } catch(e) {
                var err = M.Error.create(M.CONST.ERROR.WEBSQL_DATABASE, e.message, e);
                that.handleError(obj, err);
            }
        }
    },

    getCollection: function(entity) {
        if ( _.isObject(entity) ) {
            // if entity is given, we cache the data
            if (!entity.collection) {
                entity.collection = M.Collection.create(entity.model);
            }
            return entity.collection;
        }
    },

    _checkDb: function(obj) {
        // has to be initialized first
        if( !this.db ) {
            var err = M.Error.create(M.CONST.ERROR.WEBSQL_NO_DBHANDLER, "db handler not initialized.");
            this.handleError(obj, err);
            return false;
        }
        return true;
    }

});

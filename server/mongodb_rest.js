
exports.create = function(dbName) {

    var mongodb  = require('mongodb');

    var server   = new mongodb.Server("127.0.0.1", 27017, {});

    var ObjectID = mongodb.ObjectID;

    var rest = {

        db: null,

        toId: function(id, createNewIfEmpty) {
            try {
                if (id || createNewIfEmpty) {
                    return new ObjectID(id);
                }
            } catch (e) {
            }
            return id; // parseInt(id) !== NaN ? parseInt(id) : id;
        },

        toInt: function(s) {
            try {
                return parseInt(s);
            }  catch(e) {}
        },

        fromJson: function(json) {
             var obj;
             try {
                 if (json) {
                     obj = JSON.parse(json);
                 }
             } catch (e) {
             }
             return obj || {};
        },

        //Find documents
        find: function(req, res) {
            var name    = req.params.name;
            var query   = this.fromJson(req.query.query);
            var fields  = this.fromJson(req.query.fields);
            var sort    = this.fromJson(req.query.sort);
            var limit   = this.toInt(req.query.limit);
            var offset  = this.toInt(req.query.offset);
            var collection = new mongodb.Collection(this.db, name);
            var cursor = collection.find(query, fields);
            if (sort) {
                cursor.sort(sort);
            }
            if (limit) {
                cursor.limit(limit);
            }
            if (offset) {
                cursor.skip(offset);
            }
            cursor.toArray(function(err, docs) {
                if(err){
                    res.send(400, err);
                } else {
                    if (req.query.var) {
                        var script = req.query.var + " = " + JSON.stringify(docs) + ";";
                        res.send(script);
                    } else {
                        res.send(docs);
                    }
                }
            });
        },

        //Find a specific document
        findOne: function(req, res) {
            var name = req.params.name;
            var id   = this.toId(req.params.id);
            if (typeof id === 'undefined' || id === '') {
                return res.send(400, "invalid id.");
            }
            var collection = new mongodb.Collection(this.db, name);
            collection.find({ "_id" : id }, { limit:1 }).nextObject(function(err, doc){
                    if(err){
                        res.send(400, err);
                    } else if (doc) {
                        res.send(doc);
                    } else {
                        res.send(404, 'Document not found!');
                    }
                }
            );
        },

        //Find a specific document
        findChanges: function(req, res) {
            var name = req.params.name;
            var time = parseInt(req.params.time);
            if (!time && time !== 0) {
                return res.send(400, "invalid timestamp.");
            }
            var messages = [];
            this.readMessages(name, time, function(message) {
                if (message) {
                    messages.push(message);
                } else {
                    res.send(messages);
                }
            })
        },

        //Create new document(s)
        create: function(req, res, fromMessage) {
            var name = req.params.name;
            var doc  = req.body;
            // if this is an array
            if (Array.isArray(doc)) {
                var error, data = [];
                var count = 0, len = doc.length;
                if (len > 0) {
                    var resp = {
                        send: function(code, response) {
                            count++;
                            response = response || code;
                            if (typeof response === 'object') {
                                data.push(response);
                            } else {
                                error = response;
                            }
                            if (count >= len) {
                                if (data.length > 0) {
                                    res.send(data);
                                } else {
                                    res.send(400, error);
                                }
                            }
                        }
                    };
                    for (var i = 0; i < len ; i++) {
                        this.createOne(name, doc[i], fromMessage, resp);
                    }
                } else {
                    res.send(data);
                }
            } else {
                this.createOne(name, doc, fromMessage, res);
            }
        },

        //Create new document(s)
        createOne: function(name, doc, fromMessage, res) {
            var id   = this.toId(doc._id, true);
            if (typeof id === 'undefined' || id === '') {
                return res.send(400, "invalid id.");
            }
            doc._id  = id;
            doc._time = new Date().getTime();

            var collection = new mongodb.Collection(this.db, name);
            collection.insert(
                doc,
                {safe:true},
                function(err, docs) {
                    if(err) {
                        res.send(400, err);
                    } else {
                        var doc = docs && docs.length > 0 ? docs[0] : null;
                        if (doc) {
                            var msg = {
                                method: 'create',
                                id: doc._id,
                                time: doc._time,
                                data: doc
                            };
                            rest.onSuccess(name, msg, fromMessage);
                            res.send(doc);
                        } else {
                            res.send(400, 'failed to create document.');
                        }
                    }
                }
            );
        },

        //Update a document
        update: function(req, res, fromMessage) {
            var name = req.params.name;
            var doc  = req.body;
            var id   = this.toId(req.params.id || doc._id);
            if (typeof id === 'undefined' || id === '') {
                return res.send(400, "invalid id.");
            }
            doc._id   = id;
            doc._time = new Date().getTime();
            var collection = new mongodb.Collection(this.db, name);
            collection.update(
                { "_id" : id },
                doc,
                { safe:true, upsert:true },
                function(err, n) {
                    if(err) {
                        res.send("Oops!: " + err);
                    } else {
                        if (n==0) {
                            res.send(404, 'Document not found!');
                        } else {
                            var msg = {
                                method: 'update',
                                id: doc._id,
                                time: doc._time,
                                data: doc
                            };
                            rest.onSuccess(name, msg, fromMessage);
                            res.send(doc);
                        }
                    }
                }
            );
        },

        //Delete a contact
        delete: function(req, res, fromMessage) {
            var name = req.params.name;
            var id   = this.toId(req.params.id);
            if (typeof id === 'undefined' || id === '') {
                return res.send(400, "invalid id.");
            }
            var doc   = {};
            doc._id   = id;
            doc._time = new Date().getTime();
            var collection = new mongodb.Collection(this.db, name);
            if (id === 'all' || id === 'clean') {
                collection.drop(function (err) {
                    if(err) {
                        res.send(400, err);
                    } else {
                        var msg = {
                            method: 'delete',
                            id: doc._id,
                            time: doc._time
                        };
                        rest.onSuccess(name, msg, fromMessage);
                        res.send(doc);
                    }
                });
            } else {
                collection.remove({ "_id" : id }, { }, function(err, n){
                        if(err) {
                            res.send(400, err);
                        } else {
                            if (n==0) {
                                res.send(404, 'Document not found!');
                            }
                            if (n > 0) {
                                var msg = {
                                    method: 'delete',
                                    id: doc._id,
                                    time: doc._time,
                                    data: doc
                                };
                                rest.onSuccess(name, msg, fromMessage);
                                res.send(doc);
                            }
                        }
                    }
                );
            }
        },

        //save a new change message
        saveMessage: function(entity, msg) {
            if (!msg._id) {
                msg._id = new ObjectID();
            }
            var collection = new mongodb.Collection(this.db, "__msg__" + entity);
            if (msg.method === 'delete' && (msg.id === 'all' || msg.id === 'clean')) {
                collection.remove(function () {
                    if (msg.id === 'all') {
                        collection.insert(msg, { safe: false } );
                    }
                });
            } else {
                collection.insert(msg, { safe: false } );
            }
        },

        //read the change message, since time
        readMessages: function(entity, time, callback) {
            var collection = new mongodb.Collection(this.db, "__msg__" + entity);
            time = parseInt(time);
            if (time || time === 0) {
                collection.ensureIndex(
                    { time: 1, id: 1 },
                    { unique:true, background:true, w:1 },
                    function(err, indexName) {
                        var cursor = collection.find({ time: { $gt: time } });
                        var id, lastMsg;
                        cursor.sort([['id', 1], ['time', 1]]).each(function(err, msg) {
                            if (msg && msg.id) {
                                // the same id, merge document
                                if (id && id === msg.id) {
                                    if (lastMsg) {
                                        msg = rest.mergeMessage(lastMsg, msg);
                                    }
                                } else if (lastMsg) {
                                    // send the document to the client
                                    callback(lastMsg);
                                }
                                lastMsg = msg;
                                id = msg.id;
                            } else {
                                if (lastMsg) {
                                    callback(lastMsg);
                                }
                                callback(null);
                            }
                        });
                    }
                );
            } else {
                callback(null);
            }
        },

        mergeMessage: function(doc1, doc2) {
            doc1 = doc1 || {};
            if (doc2) {
                doc1.id   = doc2.id;
                doc1.time = doc2.time;
                if (doc2.method && (doc1.method !== 'create' || doc2.method === 'delete')) {
                    doc1.method = doc2.method;
                }
                doc1.data = doc1.data || {};
                if (doc2.data) {
                    for (var key in doc2.data) {
                        doc1.data[key] = doc2.data[key];
                    }
                }
            }
            return doc1;
        },

        onSuccess: function(entity, msg, fromMessage) {
            this.saveMessage(entity, msg);
            if (!fromMessage) {
                this.sendMessage(entity, msg);
            }
        },

        sendMessage: function(entity, msg) {
        },

        handleMessage: function(entity, msg, callback) {
            if (entity && msg && msg.method) {

                var req = {
                    params: { name: entity, id: msg.id },
                    query: {},
                    body: msg.data
                };

                var resp = {
                    send: function(data, error) {
                        if (typeof callback === 'function') {
                            callback(data, error);
                        }
                    }
                };

                switch(msg.method) {

                    case 'create':
                        this.create(req, resp, true);
                        break;

                    case 'update':
                        this.update(req, resp, true);
                        break;

                    case 'patch':
                        this.update(req, resp, true);
                        break;

                    case 'delete':
                        this.delete(req, resp, true);
                        break;

                    case 'read':
                        if (msg.id) {
                            this.findOne(req, resp, true);
                        } else {
                            this.find(req, resp, true);
                        }
                        break;

                    default:
                        return;
                }
            }
        }
    };

    new mongodb.Db(dbName, server, {w: 1}).open(function (error, client) {
        if (error) throw error;
        rest.db = client;
    });

    return rest;
};

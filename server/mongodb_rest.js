
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
            var query   = this.fromJson(req.query.query);   // has to be an object
            var fields  = this.fromJson(req.query.fields);  // has to an array
            var collection = new mongodb.Collection(this.db, name);
            collection.find(query, fields).toArray(function(err, docs) {
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

        //Create new document(s)
        create: function(req, res, fromMessage) {
            var name = req.params.name;
            var doc  = req.body;
            var id   = this.toId(doc._id, true);
            if (typeof id === 'undefined' || id === '') {
                return res.send(400, "invalid id.");
            }

            doc._id  = id;
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
                            res.send(doc);
                            if (doc) {
                                rest.sendMessage(name, { method: 'create', id: id.toString(), data: doc });
                            }
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
            doc._id = id;

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
                            res.send(doc);
                            if (n > 0) {
                                rest.sendMessage(name, { method: 'update', id: id.toString(), data: doc });
                            }
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

            var collection = new mongodb.Collection(this.db, name);
            collection.remove({ "_id" : id }, { }, function(err, n){
                    if(err) {
                        res.send(400, err);
                    } else {
                        if (n==0) {
                            res.send(404, 'Document not found!');
                        } else {
                            res.send({ _id: id.toString() });
                        }
                        if (n > 0) {
                            rest.sendMessage(name, { method: 'delete', id: id.toString() });
                        }
                    }
                }
            );
        },

        sendMessage: function(entity, msg) {
        },

        handleMessage: function(entity, msg, callback) {
            if (entity && msg && msg.method) {

                var req = {
                    params: { name: entity, id: msg.id },
                    body: msg.data
                };

                var resp = {
                    send: function(data) {
                        if (typeof callback === 'function') {
                            callback(data);
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

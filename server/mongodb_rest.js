
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
            return id && id.toString ? id.toString() : '';
        },

        //Find documents
        find: function(req, res) {
            var name    = req.params.name;
            var query   = req.query.query;   // has to be an object
            var fields  = req.query.fields;  // has to an array
            var options = req.query.options; // has to be an object
            var collection = new mongodb.Collection(this.db, name);
            collection.find({}, {limit:10}).toArray(function(err, docs) {
                if(err){
                    res.send("Oops!: " + err);
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
            if (!id) {
                return res.send(400, "invalid id.");
            }
            var collection = new mongodb.Collection(this.db, name);
            collection.find({ "_id" : id }, { limit:1 }).nextObject(function(err, doc){
                    if(err){
                        res.send("Oops! " + err);
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
            if (!id) {
                return res.send(400, "invalid id.");
            }

            doc._id  = id;
            var collection = new mongodb.Collection(this.db, name);
            collection.insert(
                doc,
                {safe:true},
                function(err, doc) {
                    if(err) {
                        res.send("Oops!: " + err);
                        if (err.message.indexOf('E11000 ') !== -1) {
                            // this _id was already inserted in the database
                        }
                    } else {
                        res.send(doc);
                        if (!fromMessage && n > 0) {
                            rest.sendMessage(name, { method: 'create', id: id.toString(), data: doc });
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
            if (!id) {
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
                            if (/*!fromMessage && */n > 0) {
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
            if (!id) {
                return res.send(400, "invalid id.");
            }

            var collection = new mongodb.Collection(this.db, name);
            collection.remove({ "_id" : id }, { }, function(err, n){
                    if(err) {
                        res.send("Oops! " + err);
                    } else {
                        if (n==0) {
                            res.send(404, 'Document not found!');
                        } else {
                            res.send({ _id: id.toString() });
                        }
                        if (!fromMessage && n > 0) {
                            rest.sendMessage(name, { method: 'delete', id: id.toString() });
                        }
                    }
                }
            );
        },

        sendMessage: function(entity, msg) {
        },

        handleMessage: function(entity, msg, resp) {
            if (entity && msg && msg.method) {

                var req = {
                    params: { name: entity, id: msg.id },
                    body: msg.data
                };

                var resp = {
                    send: function(data) {
                        // Todo: callback
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

describe('M.BikiniStore', function() {

    var TEST = {};

    it('creating bikini store', function() {

        assert.typeOf(M.BikiniStore, 'function', 'M.BikiniStore is defined');

        TEST.store = M.BikiniStore.design({
            useLocalStore: true,
            useSocketNotify: false
        });

        assert.typeOf(TEST.store, 'object', 'store successfully created.');
    });

    it('creating collection', function() {

        assert.typeOf(M.Collection, 'function', 'M.Collection is defined');

        TEST.TestModel = M.Model.extend({
            idAttribute: '_id',
            entity: {
                name: 'test',
                fields:  {
                    _id:         { type: M.CONST.TYPE.STRING,  required: YES, index: YES },
                    sureName:    { name: 'USERNAME', type: M.CONST.TYPE.STRING,  required: YES, index: YES },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    age:         { type: M.CONST.TYPE.INTEGER }
                }
            }
        });

        assert.typeOf(TEST.TestModel, 'function', 'TestModel model successfully extended.');

        TEST.url = 'http://nerds.mway.io:8200/bikini/test';

        TEST.TestModelCollection = M.Collection.extend({
            model: TEST.TestModel,
            url: TEST.url,
            store: TEST.store,
            sort: { lastname: 1 },
            fields: { lastname: 1, age : 1 },
            query: { age : { $gte : 25  } }
        });

        assert.typeOf(TEST.TestModelCollection, 'function', 'Test collection successfully extended.');

        TEST.Test = TEST.TestModelCollection.create();

        assert.typeOf(TEST.Test, 'object', 'Test collection successfully created.');

        assert.ok(TEST.Test.store === TEST.store, 'Test collection has the correct store.');

        var url = TEST.Test.getUrl();

        assert.ok(url !== TEST.url, 'The base url has been extended.');

        assert.ok(url.indexOf(TEST.url)==0, 'the new url starts with the set url.');

        assert.ok(url.indexOf('query=')>0, 'query is part of the url.');

        assert.ok(url.indexOf('fields=')>0, 'fields is part of the url.');

        assert.ok(url.indexOf('sort=')>0, 'sort is part of the url.');

    });

    it('create record', function(done) {
        TEST.Test.create({
                firstName: 'Max',
                sureName: 'Mustermann',
                age: 33
            },
            {
                success: function(model) {
                    assert.ok(model, 'new record created successfully.');

                    TEST.id = model.id;

                    //assert.ok(TEST.id, 'new record has an id.');
                    done();
                },
                error: function() {
                    assert.ok(false, 'new record created successfully.');
                    done();
                }
            }
        );
    });

    it('delete record', function(done) {
        TEST.Test.get(TEST.id).destroy(
            {
                success: function(model) {
                    assert.ok(true, 'record has been deleted.');
                    done();
                },
                error: function() {
                    assert.ok(false, 'record has been deleted.');
                    done();
                }
            }
        );
    });

    it('fetching collection', function(done) {
        TEST.Test.fetch({
            success: function(collection) {
                assert.ok(true, 'Test collection fetched successfully.');
                TEST.count = TEST.Test.length;
                done();
            },
            error: function() {
                assert.ok(false, 'Test collection fetched successfully.');
                done();
            }
        });
    });

    it('cleanup records', function(done) {

        if (TEST.Test.length === 0) {
            done();
        } else {
            TEST.Test.on('all', function(event) {
                if (event === 'destroy' && TEST.Test.length == 0) {
                    done();
                }
            });
            var model;
            while (model = TEST.Test.first()) {
              model.destroy();
            }
        }
    });
});

describe.skip('M.BikiniStore', function() {

    var TEST = {
        data : {
            firstName: 'Max',
            sureName: 'Mustermann',
            age: 33
        }
    };

    it('creating bikini store', function() {

        assert.isFunction(M.BikiniStore, 'M.BikiniStore is defined');

        TEST.store = M.BikiniStore.design({
            useLocalStore: true,
            useSocketNotify: false
        });

        assert.isObject(TEST.store, 'store successfully created.');
    });

    it('creating collection', function() {

        assert.isFunction(M.Collection, 'M.Collection is defined');

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

        assert.isFunction(TEST.TestModel, 'TestModel model successfully extended.');

        TEST.url = 'http://nerds.mway.io:8200/bikini/test';

        TEST.TestsModelCollection = M.Collection.extend({
            model: TEST.TestModel,
            url: TEST.url,
            store: TEST.store,
            options: {
                sort: { sureName: 1 },
                fields: { USERNAME: 1, sureName: 1, firstName: 1, age : 1 },
                query: { age : { $gte : 25  } }
            }
        });

        assert.isFunction(TEST.TestsModelCollection, 'Test collection successfully extended.');

        TEST.Tests = TEST.TestsModelCollection.create();

        assert.isObject(TEST.Tests, 'Test collection successfully created.');

        assert.equal(TEST.Tests.store, TEST.store, 'Test collection has the correct store.');

        var url = TEST.Tests.getUrl();

        assert.ok(url !== TEST.url, 'The base url has been extended.');

        assert.equal(url.indexOf(TEST.url), 0, 'the new url starts with the set url.');

        assert.ok(url.indexOf('query=')>0, 'query is part of the url.');

        assert.ok(url.indexOf('fields=')>0, 'fields is part of the url.');

        assert.ok(url.indexOf('sort=')>0, 'sort is part of the url.');

        // try to clean everything
        TEST.store.clear(TEST.Tests);

    });

    it('create record', function(done) {
        TEST.Tests.create(TEST.data,
            {
                success: function(model) {
                    assert.isObject(model, 'new record created successfully.');

                    TEST.id = model.id;

                    assert.ok(TEST.id, 'new record has an id.');
                    done();
                },
                error: function() {
                    assert.ok(false, 'new record created successfully.');
                    done();
                }
            }
        );
    });

    it('read record', function() {
        var model = TEST.Tests.get(TEST.id);

        assert.ok(model, "record found");

        assert.equal(model.get('firstName'), TEST.data.firstName, "found record has the correct 'firstname' value");
        assert.equal(model.get('sureName'), TEST.data.sureName, "found record has the correct 'sureName' value");
        assert.equal(model.get('age'), TEST.data.age, "found record has the correct 'age' value");

    });

    it('fetching data with new model', function(done) {

        TEST.TestModel2 = M.Model.extend({
            url : TEST.url,
            idAttribute: '_id',
            store: TEST.store,
            entity: {
                name: 'test'
            }
        });

        var data  = { _id:  TEST.id };
        var model = TEST.TestModel2.create(data);

        assert.isObject(model, "new model created");

        assert.ok(_.isEqual(model.attributes, data), "new model holds correct data attributes");

        model.fetch({
            success: function() {
                assert.ok(true, 'model has been fetched.');
                assert.equal(model.get('firstName'), TEST.data.firstName, "found record has the correct 'firstname' value");
                assert.equal(model.get('USERNAME'), TEST.data.sureName, "found record has the correct 'USERNAME' value");
                assert.equal(model.get('age'), TEST.data.age, "found record has the correct 'age' value");
                done();
            },
            error: function(error) {
                assert.ok(false, 'model has been fetched.');
                done();
            }
        })
    });

    it('fetching collection', function(done) {
        TEST.Tests.reset();
        assert.equal(TEST.Tests.length, 0, 'reset has cleared the collection.');

        TEST.Tests.fetch({
            success: function(collection) {
                assert.isObject(TEST.Tests.get(TEST.id), 'The model is still there');
                done();
            },
            error: function() {
                assert.ok(false, 'Test collection fetched successfully.');
                done();
            }
        });
    });


    it('read record', function() {
        var model = TEST.Tests.get(TEST.id);

        assert.ok(model, "record found");

        assert.equal(model.get('firstName'), TEST.data.firstName, "found record has the correct 'firstname' value");
        assert.equal(model.get('sureName'), TEST.data.sureName, "found record has the correct 'sureName' value");
        assert.equal(model.get('age'), TEST.data.age, "found record has the correct 'age' value");

    });

    it('delete record', function(done) {
        var model = TEST.Tests.get(TEST.id);

        assert.isObject(model, 'model found in collection');

        assert.equal(model.id, TEST.id, 'model has the correct id');

        model.destroy(
        {
            success: function(model) {
                assert.ok(true, 'record has been deleted.');
                done();
            },
            error: function() {
                assert.ok(false, 'record has been deleted.');
                done();
            }
        });
    });

    it('cleanup records bikini', function(done) {

        if (TEST.Tests.length === 0) {
            done();
        } else {
            var model, hasError = false, isDone = false;
            while ((model = TEST.Tests.first()) && !hasError) {
              model.destroy({
                  success: function() {
                      if (TEST.Tests.length == 0 && !isDone) {
                          isDone = true;
                          assert.equal(TEST.Tests.length, 0, 'collection is empty');
                          done();
                      }
                  },
                  error: function() {
                      hasError = isDone = true;
                      assert.ok(false, 'cleanup records bikini error');
                      done();
                  }
              });
            }
        }
    });

});

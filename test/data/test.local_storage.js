describe('M.LocalStorageStore', function() {

    var TEST = {};

    it('creating local storage store', function() {

        assert.typeOf(M.LocalStorageStore, 'function', 'M.LocalStorageStore is defined');

        TEST.store = M.LocalStorageStore.design();

        assert.typeOf(TEST.store, 'object', 'store successfully created.');
    });

    TEST.dropEntityTest = function (done) {
        TEST.store.drop({
            entity: {
                name: 'test'
            },
            success: function() {
                assert.ok(true, 'drop table test');
                done();
            },
            error: function(error) {
                assert.ok(false, 'drop table test: ' + error);
                done();
            }
        });
    };

    it('simple model with LocalStorageStore', function( done ) {

        TEST.SimpleModel = M.Model.extend({
            store: M.LocalStorageStore.create(),
            entity: 'test'
        });

        assert.typeOf(TEST.SimpleModel, 'function', 'Simple model successfully extended.');

        TEST.Simple = TEST.SimpleModel.create({
            firstname: 'Max',
            lastname: 'Mustermann'
        });

        assert.typeOf(TEST.Simple, 'object', 'Simple model successfully created.');

        TEST.Simple.save({}, // save existing data
              {
                  success: function(model) {
                      assert.ok(model, 'new record exists.');

                      TEST.id = model.id;

                      assert.ok(TEST.id, 'new record has an id.');

                      done();
                  },
                  error: function(model, error) {

                      assert(false, 'error creating record: '+ error);

                      done();
                  }
              }
          );
    });


    it('simple collection with LocalStorageStore', function( done ) {

        TEST.SimpleModelCollection = M.Collection.extend({
            store: M.LocalStorageStore.create(),
            entity: 'test'
        });

        assert.typeOf(TEST.SimpleModelCollection, 'function', 'Simple collection successfully extended.');

        TEST.Simple = TEST.SimpleModelCollection.create();

        assert.typeOf(TEST.Simple, 'object', 'Simple collection successfully created.');

        TEST.Simple.create(TEST.data,
              {
                  success: function(model) {
                      assert.ok(model, 'new record exists.');

                      TEST.id = model.id;

                      assert.ok(TEST.id, 'new record has an id.');

                      done();
                  },
                  error: function(model, error) {

                      assert(false, 'error creating record: '+ error);

                      done();
                  }
              }
          );
    });

    it('drop table', TEST.dropEntityTest);

    it('creating collection', function() {

        assert.typeOf(M.Collection, 'function', 'M.Collection is defined');

        TEST.TestModel = M.Model.extend({
            idAttribute: '_id',
            entity: {
                name: 'test',
                fields:  {
                    _id:         { type: M.CONST.TYPE.STRING,  required: YES },
                    sureName:    { name: 'USERNAME', type: M.CONST.TYPE.STRING,  required: YES },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    age:         { type: M.CONST.TYPE.INTEGER }
                }
            }
        });

        assert.typeOf(TEST.TestModel, 'function', 'TestModel model successfully extended.');

        TEST.TestModelCollection = M.Collection.extend({
            model: TEST.TestModel,
            store: TEST.store
        });

        assert.typeOf(TEST.TestModelCollection, 'function', 'Test collection successfully extended.');

        TEST.Test = TEST.TestModelCollection.create();

        assert.typeOf(TEST.Test, 'object', 'Test collection successfully created.');

        assert.ok(TEST.Test.store === TEST.store, 'Test collection has the correct store.');

    });

    it('create record', function(done) {
        TEST.data = {
            firstName: 'Max',
            sureName: 'Mustermann',
            age: 33
        };

        TEST.Test.create(TEST.data,
            {
                success: function(model) {
                    assert.ok(model, 'new record created successfully.');

                    TEST.id = model.id;

                    assert.ok(TEST.id, 'new record has an id.');
                    assert.equal(model.get('firstName'), TEST.data.firstName, "created record has the correct 'firstname' value");
                    assert.equal(model.get('sureName'), TEST.data.sureName, "created record has the correct 'sureName' value");
                    assert.equal(model.get('age'), TEST.data.age, "created record has the correct 'age' value");

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
        var model = TEST.Test.get(TEST.id);

        assert.ok(model, "record found");

        assert.equal(model.get('firstName'), TEST.data.firstName, "found record has the correct 'firstname' value");
        assert.equal(model.get('sureName'), TEST.data.sureName, "found record has the correct 'sureName' value");
        assert.equal(model.get('age'), TEST.data.age, "found record has the correct 'age' value");

    });

    it('fetching data with new model', function(done) {

        TEST.TestModel2 = M.Model.extend({
            idAttribute: '_id',
            store: TEST.store,
            entity: {
                name: 'test'
            }
        });

        var model = TEST.TestModel2.create({ _id:  TEST.id });

        assert.isObject(model, "new model created");

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

    it('cleanup records local storage', function(done) {

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

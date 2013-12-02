describe('M.RadiolistView', function () {

    var $stage;
    var instance;
    var scope = M.Controller.extend({}).create();

    before(function () {
        $stage = $('<div style="opacity: 1"></div>');
        $('body').append($stage);
    });

    after(function () {
        if ($stage) {
            $stage.remove();
            $stage = null;
        }
        scope = null;
        instance = null;
    });

    it('const', function () {
        assert.equal(M.RadiolistView.prototype._type, 'M.RadiolistView');
    });

    it('basic', function () {
        assert.isDefined(M.RadiolistView);
        assert.isDefined(M.RadiolistView.design);
        assert.isDefined(M.RadiolistView.create);
        assert.isDefined(M.RadiolistView.extend);

        assert.isFunction(M.RadiolistView.design);
        assert.isFunction(M.RadiolistView.create);
        assert.isFunction(M.RadiolistView.extend);

        var instance = M.RadiolistView.create();
        assert.isDefined(instance);
        assert.isObject(instance);
        assert.isDefined(instance._type);
        assert.isString(instance._type);
    });

    describe('Different label and value Path', function () {

        it('create instance', function () {

            scope.model = M.Model.create({water: [1]});

            instance = M.RadiolistView.extend({
                scopeKey: 'model.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'Absinthe'},
                        {id: 2, name: 'Beer'},
                        {id: 3, name: 'Dr Pepper'}
                    ],
                    labelPath: 'name',
                    valuePath: 'id'
                }
            }).create(scope, null, true);

            assert.isDefined(instance.selectOptions);
            assert.isDefined(instance.selectOptions.collection);
            assert.isDefined(instance.selectOptions.labelPath);
            assert.isDefined(instance.selectOptions.valuePath);
            assert.isObject(instance.selectOptions);
            assert.isArray(instance.selectOptions.collection);
            assert.isString(instance.selectOptions.labelPath);
            assert.isString(instance.selectOptions.valuePath);
            assert.lengthOf(instance.selectOptions.collection, 3);

            instance.render();
            $stage.append(instance.$el);
        });

        it('Check selected value', function () {
            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 1);
        });

        it('Change model value', function () {
            scope.model.set('water', 3);

            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 3);
        });

        it('Change dom element', function () {
            instance.$el.find('input[value="2"]').prop('checked', true);
            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 2);
        });

    });
    describe('ValuePath and labelName is the same', function () {

        it('create instance', function () {

            scope.model = M.Model.create({water: ['Beer']});

            instance = M.RadiolistView.extend({
                scopeKey: 'model.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'Absinthe'},
                        {id: 2, name: 'Beer'},
                        {id: 3, name: 'Dr Pepper'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }
            }).create(scope, null, true);

            assert.isDefined(instance.selectOptions);
            assert.isDefined(instance.selectOptions.collection);
            assert.isDefined(instance.selectOptions.labelPath);
            assert.isDefined(instance.selectOptions.valuePath);
            assert.isObject(instance.selectOptions);
            assert.isArray(instance.selectOptions.collection);
            assert.isString(instance.selectOptions.labelPath);
            assert.isString(instance.selectOptions.valuePath);
            assert.lengthOf(instance.selectOptions.collection, 3);

            instance.render();
            $stage.append(instance.$el);
        });

        it('Check selected value', function () {
            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 'Beer');
        });

        it('Change model value', function () {
            scope.model.set('water', 'Dr Pepper');

            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 'Dr Pepper');
        });

        it('Change dom element', function () {
            instance.$el.find('input[value="Beer"]').prop('checked', true);
            assert.lengthOf(instance.$el.find('input:checked'), 1);
            assert.equal(instance.$el.find('input:checked').val(), 'Beer');


        });
    });
});

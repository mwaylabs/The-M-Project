describe('M.View Bindings', function() {

    var TEST_ATTRIBUTE_1 = 'TEST_ATTRIBUTE_1';
    var TEST_ATTRIBUTE_2 = 'TEST_ATTRIBUTE_2';
    var TEST_ATTRIBUTE_3 = 'TEST_ATTRIBUTE_3';
    var TEST_ATTRIBUTE_4 = 'TEST_ATTRIBUTE_4';

    var getTestApplication = function() {

        var ParentView = M.View.extend({}, {
            bindingTestInput: M.View.extend({
                scopeKey: 'bindingTestModel',
                template: '<div><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
            }),

            bindingTestOutput: M.View.extend({
                scopeKey: 'bindingTestModel',
                template: '<div><input value="<%= a %>"/> <input value="<%= b %>" /></div>'
            }),

            bindingTestAttributeA: M.View.extend({
                scopeKey: 'bindingTestModel.a'
            }),

            bindingTestAttributeB: M.View.extend({
                scopeKey: 'bindingTestModel.b'
            }),

            bindingTestAttributeTextfield: M.TextfieldView.extend({
                scopeKey: 'bindingTestModel.a'
            })
        });

        var bindingTestModel = M.Model.create({
            a: TEST_ATTRIBUTE_1,
            b: TEST_ATTRIBUTE_2
        });

        var scope = M.Controller.extend({
            bindingTestModel: bindingTestModel
        }).create();

        var testView = ParentView.create(scope, null, true);

        var contentBinding1 = testView.childViews.bindingTestInput;
        var contentBinding2 = testView.childViews.bindingTestOutput;

        var stickitA = testView.childViews.bindingTestAttributeA;
        var stickitB = testView.childViews.bindingTestAttributeB;

        var bindingTestAttributeTextfield = testView.childViews.bindingTestAttributeTextfield;

        return {
            view: testView,
            controller: scope,
            model: bindingTestModel,
            childViews: {
                contentBinding1: contentBinding1,
                contentBinding2: contentBinding2,
                stickitA: stickitA,
                stickitB: stickitB,
                bindingTestAttributeTextfield: bindingTestAttributeTextfield
            }
        }

    };

    var checkProperties = function( app ) {
        assert.isTrue(app.childViews.stickitA.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitA.model.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.stickitB.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitB.model.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.contentBinding1.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding1.model.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.contentBinding2.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding2.model.get('b') === TEST_ATTRIBUTE_2);
    };

    var checkPropertiesAfter = function( app ) {
        assert.isTrue(app.childViews.stickitA.model.get('a') === TEST_ATTRIBUTE_3);
        assert.isTrue(app.childViews.stickitA.model.get('b') === TEST_ATTRIBUTE_4);
        assert.isTrue(app.childViews.stickitB.model.get('a') === TEST_ATTRIBUTE_3);
        assert.isTrue(app.childViews.stickitB.model.get('b') === TEST_ATTRIBUTE_4);

        assert.isTrue(app.childViews.contentBinding1.model.get('a') === TEST_ATTRIBUTE_3);
        assert.isTrue(app.childViews.contentBinding1.model.get('b') === TEST_ATTRIBUTE_4);
        assert.isTrue(app.childViews.contentBinding2.model.get('a') === TEST_ATTRIBUTE_3);
        assert.isTrue(app.childViews.contentBinding2.model.get('b') === TEST_ATTRIBUTE_4);
    };

    it('ContentBinding general', function() {

        var app = getTestApplication();

        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.model.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.contentBinding1.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding1.model.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.contentBinding2.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding2.model.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.contentBinding1.getValue().a === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding1.getValue().b === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.contentBinding2.getValue().a === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding2.getValue().b === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.contentBinding1._value.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding1._value.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.contentBinding2._value.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding2._value.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.model === app.childViews.contentBinding1._value);
        assert.isTrue(app.model === app.childViews.contentBinding2._value);
        assert.isTrue(app.childViews.contentBinding1._value === app.childViews.contentBinding2._value);
    });

    it('Stickit general', function() {

        var app = getTestApplication();

        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.model.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.stickitA.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitA.model.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.stickitB.model.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitB.model.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.stickitA.getValue() === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitB.getValue() === TEST_ATTRIBUTE_2);

        assert.isTrue(app.childViews.stickitA._value.model === app.model);
        assert.isTrue(app.childViews.stickitA._value.attribute === 'a');
        assert.isTrue(app.childViews.stickitA._value.model.get(app.childViews.stickitA._value.attribute) === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitA._value.model.attributes[app.childViews.stickitA._value.attribute] === TEST_ATTRIBUTE_1);

        assert.isTrue(app.childViews.stickitA._value.model === app.model);
        assert.isTrue(app.childViews.stickitB._value.attribute === 'b');
        assert.isTrue(app.childViews.stickitB._value.model.get(app.childViews.stickitB._value.attribute) === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.stickitB._value.model.attributes[app.childViews.stickitB._value.attribute] === TEST_ATTRIBUTE_2);

        assert.isFalse(app.childViews.stickitA.getValue() === TEST_ATTRIBUTE_2);
        assert.isFalse(app.childViews.stickitB.getValue() === TEST_ATTRIBUTE_1);

        assert.isFalse(app.childViews.stickitB._value.attribute === 'a');
        assert.isFalse(app.childViews.stickitB._value.model.get(app.childViews.stickitB._value.attribute) === TEST_ATTRIBUTE_1);
        assert.isFalse(app.childViews.stickitB._value.model.attributes[app.childViews.stickitB._value.attribute] === TEST_ATTRIBUTE_1);

        assert.isFalse(app.childViews.stickitA._value.attribute === 'b');
        assert.isFalse(app.childViews.stickitA._value.model.get(app.childViews.stickitA._value.attribute) === TEST_ATTRIBUTE_2);
        assert.isFalse(app.childViews.stickitA._value.model.attributes[app.childViews.stickitA._value.attribute] === TEST_ATTRIBUTE_2);


        assert.isTrue(app.model.get('a') === app.childViews.stickitA.getValue());
        assert.isTrue(app.model.get('b') === app.childViews.stickitB.getValue());
        assert.isFalse(app.childViews.stickitA.getValue() === app.childViews.stickitB.getValue());

    });

    it('Values after render', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        checkProperties(app);
    });

    it('Stickit set attribute', function() {
        var app = getTestApplication();
        app.view.render();
        var jInput = app.childViews.bindingTestAttributeTextfield.$el.find('input');
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_3);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_3);
    });

    it('Stickit two way binding', function() {
        var app = getTestApplication();
        app.view.render();
        var jInput = app.childViews.bindingTestAttributeTextfield.$el.find('input');
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_3);
        app.model.set('a', TEST_ATTRIBUTE_1);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
    });

    it('M.Controller.set', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        checkProperties(app);
        var newModel = M.Model.create({a: TEST_ATTRIBUTE_3, b: TEST_ATTRIBUTE_4});
        app.controller.set('bindingTestModel', newModel);
        checkPropertiesAfter(app);
    });

    it('multiple html $el', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.$el);
        secondDOM.html(app.view.$el);
        assert.isTrue(app.view.el === secondDOM.find('.view')[0]);

        assert.isTrue(secondDOM.find('input[data-binding="a"]').first()[0] === app.view.$el.find('input[data-binding="a"]').first()[0]);
        secondDOM.find('input[data-binding="a"]').first().trigger('change');
        assert.isTrue(secondDOM.find('input[data-binding="a"]').first()[0] === app.view.$el.find('input[data-binding="a"]').first()[0]);
        app.view.$el.find('input[data-binding="a"]').first().trigger('change');
        assert.isTrue(secondDOM.find('input[data-binding="a"]').first()[0] === app.view.$el.find('input[data-binding="a"]').first()[0]);
        app.view.$el.find('input[data-binding="a"]').first().val(TEST_ATTRIBUTE_3);
        app.view.$el.find('input[data-binding="a"]').first().trigger('change');
        assert.isTrue(secondDOM.find('input[data-binding="a"]').first()[0] === app.view.$el.find('input[data-binding="a"]').first()[0]);
    });

    it('single $el set with hmlt change ', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with hmlt change ', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.append(app.view.$el);
        secondDOM.append(app.view.$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with html', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.$el);
        secondDOM.html(app.view.$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isFalse(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with html late', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();

        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_3);

        secondDOM.html(app.view.$el);

        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_3);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isFalse(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with html with render call', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.render().$el);
        secondDOM.html(app.view.render().$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isFalse(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with html clear html before', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        var secondDOM = $('<div></div>');
        secondDOM.html(app.view.render().$el);
        secondDOM.html('');
        secondDOM.html(app.view.render().$el);
        var jInput = secondDOM.find('input[data-binding="a"]').first();
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_1);
        app.model.set('a', TEST_ATTRIBUTE_2);
        assert.isTrue(jInput.val() === TEST_ATTRIBUTE_2);
        jInput.val(TEST_ATTRIBUTE_3);
        jInput.trigger('change');
        assert.isTrue(app.model.get('a') === TEST_ATTRIBUTE_3);
    });

    it('multiple $el set with html clear html before', function() {
        var mymodel = M.Model.create({value:'a'})
        var view = M.View.extend({value:mymodel, useElement: YES, tagName: 'h1'}).create().render()
        //console.log(view.$el.html());
        mymodel.set('value', 'b');
        //console.log(view.$el.html());
    });
});
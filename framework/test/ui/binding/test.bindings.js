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

        return {
            view: testView,
            controller: scope,
            model: bindingTestModel,
            childViews: {
                contentBinding1: contentBinding1,
                contentBinding2: contentBinding2,
                stickitA: stickitA,
                stickitB: stickitB
            }
        }

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

        assert.isTrue(app.childViews.contentBinding1._value_.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding1._value_.get('b') === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.contentBinding2._value_.get('a') === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.contentBinding2._value_.get('b') === TEST_ATTRIBUTE_2);

        assert.isTrue(app.model === app.childViews.contentBinding1._value_);
        assert.isTrue(app.model === app.childViews.contentBinding2._value_);
        assert.isTrue(app.childViews.contentBinding1._value_ === app.childViews.contentBinding2._value_);
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

        assert.isTrue(app.childViews.stickitA._value_.model === app.model);
        assert.isTrue(app.childViews.stickitA._value_.attribute === 'a');
        assert.isTrue(app.childViews.stickitA._value_.model.get(app.childViews.stickitA._value_.attribute) === TEST_ATTRIBUTE_1);
        assert.isTrue(app.childViews.stickitA._value_.model.attributes[app.childViews.stickitA._value_.attribute] === TEST_ATTRIBUTE_1);

        assert.isTrue(app.childViews.stickitA._value_.model === app.model);
        assert.isTrue(app.childViews.stickitB._value_.attribute === 'b');
        assert.isTrue(app.childViews.stickitB._value_.model.get(app.childViews.stickitB._value_.attribute) === TEST_ATTRIBUTE_2);
        assert.isTrue(app.childViews.stickitB._value_.model.attributes[app.childViews.stickitB._value_.attribute] === TEST_ATTRIBUTE_2);

        assert.isFalse(app.childViews.stickitA.getValue() === TEST_ATTRIBUTE_2);
        assert.isFalse(app.childViews.stickitB.getValue() === TEST_ATTRIBUTE_1);

        assert.isFalse(app.childViews.stickitB._value_.attribute === 'a');
        assert.isFalse(app.childViews.stickitB._value_.model.get(app.childViews.stickitB._value_.attribute) === TEST_ATTRIBUTE_1);
        assert.isFalse(app.childViews.stickitB._value_.model.attributes[app.childViews.stickitB._value_.attribute] === TEST_ATTRIBUTE_1);

        assert.isFalse(app.childViews.stickitA._value_.attribute === 'b');
        assert.isFalse(app.childViews.stickitA._value_.model.get(app.childViews.stickitA._value_.attribute) === TEST_ATTRIBUTE_2);
        assert.isFalse(app.childViews.stickitA._value_.model.attributes[app.childViews.stickitA._value_.attribute] === TEST_ATTRIBUTE_2);


        assert.isTrue(app.model.get('a') === app.childViews.stickitA.getValue());
        assert.isTrue(app.model.get('b') === app.childViews.stickitB.getValue());
        assert.isFalse(app.childViews.stickitA.getValue() === app.childViews.stickitB.getValue());

    });

});

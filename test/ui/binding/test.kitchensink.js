describe('Model change example', function() {

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


    it('', function() {
        var app = getTestApplication();
        checkProperties(app);
        app.view.render();
        checkProperties(app);
        var newModel = M.Model.create({a: TEST_ATTRIBUTE_3, b: TEST_ATTRIBUTE_4});
        app.controller.set('bindingTestModel', newModel);
        checkPropertiesAfter(app);
    });


});

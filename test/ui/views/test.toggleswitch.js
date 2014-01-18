describe('M.ToggleSwitchView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.ToggleSwitchView);
        assert.isFunction(M.ToggleSwitchView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ToggleSwitchView.create()));

        var testView = M.ToggleSwitchView.create();
        assert.equal(testView._type, 'M.ToggleSwitchView');
    });

    it('default instance', function() {

        var testView = M.ToggleSwitchView.extend({}).create();

        assert.equal(testView.onValue, YES);
        assert.equal(testView.offValue, NO);
        assert.equal(testView.onLabel, ' ');
        assert.equal(testView.offLabel, ' ');
        assert.isFalse(testView.getValue());


        testView = null;
    });

    it('instance on off value', function() {

        var ONVALUE = 'ONVALUE';
        var OFFVALUE = 'OFFVALUE';

        var testView = M.ToggleSwitchView.extend({
            onValue: ONVALUE
        }).create();

        assert.equal(testView.onValue, ONVALUE);
        assert.equal(testView.offValue, NO);
        assert.equal(testView.onLabel, ' ');
        assert.equal(testView.offLabel, ' ');
        assert.equal(testView._templateValues.onLabel,  ' ');
        assert.equal(testView._templateValues.offLabel, ' ');
        assert.isFalse(testView.getValue());

        var testView = M.ToggleSwitchView.extend({
            offValue: OFFVALUE
        }).create();
        assert.equal(testView.onValue, YES);
        assert.equal(testView.offValue, OFFVALUE);
        assert.equal(testView.onLabel,  ' ');
        assert.equal(testView.offLabel, ' ');
        assert.equal(testView._templateValues.onLabel,  ' ');
        assert.equal(testView._templateValues.offLabel, ' ');
        assert.equal(testView.getValue(), OFFVALUE);


        var testView = M.ToggleSwitchView.extend({
            onValue: ONVALUE,
            offValue: OFFVALUE
        }).create();

        assert.equal(testView.onValue, ONVALUE);
        assert.equal(testView.offValue, OFFVALUE);
        assert.equal(testView._templateValues.onLabel,  ' ');
        assert.equal(testView._templateValues.offLabel, ' ');
        assert.equal(testView.onLabel,  ' ');
        assert.equal(testView.offLabel, ' ');
        assert.equal(testView.getValue(), OFFVALUE);

        testView = null;
        ONVALUE = null;
        OFFVALUE = null;
    });

    it('instance on off label', function() {


        var ONLABEL = 'ONLABEL';
        var OFFLABEL = 'OFFLABEL';

        var testView = M.ToggleSwitchView.extend({
            onLabel: ONLABEL
        }).create();

        assert.equal(testView.offValue, NO);
        assert.equal(testView.onValue, YES);

        assert.equal(testView.onLabel, ONLABEL);
        assert.equal(testView._templateValues.onLabel, ONLABEL);
        assert.equal(testView.offLabel, ' ');
        assert.equal(testView._templateValues.offLabel, ' ');

        testView.render();
        //assert.lengthOf(testView.$el.find('[data-onlabel="ONLABEL"]'), 1);
        //assert.lengthOf(testView.$el.find('[data-offlabel="' + M.TOGGLE_SWITCH_OFF + '"]'), 1);

        var testView = M.ToggleSwitchView.extend({
            offLabel: OFFLABEL
        }).create();
        assert.equal(testView.offValue, NO);
        assert.equal(testView.onValue, YES);

        assert.equal(testView.onLabel,  ' ');
        assert.equal(testView._templateValues.onLabel,  ' ');
        assert.equal(testView.offLabel, OFFLABEL);
        assert.equal(testView._templateValues.offLabel, OFFLABEL);

        testView.render();
        //assert.lengthOf(testView.$el.find('[data-onlabel="' +  ' ' + '"]'), 1);
        //assert.lengthOf(testView.$el.find('[data-offlabel="OFFLABEL"]'), 1);

        var testView = M.ToggleSwitchView.extend({
            onLabel: ONLABEL,
            offLabel: OFFLABEL
        }).create();

        assert.equal(testView.offValue, NO);
        assert.equal(testView.onValue, YES);

        assert.equal(testView.onLabel, ONLABEL);
        assert.equal(testView._templateValues.onLabel, ONLABEL);
        assert.equal(testView.offLabel, OFFLABEL);
        assert.equal(testView._templateValues.offLabel, OFFLABEL);

        testView.render();
        //assert.lengthOf(testView.$el.find('[data-onlabel="ONLABEL"]'), 1);
        //assert.lengthOf(testView.$el.find('[data-offlabel="OFFLABEL"]'), 1);

        testView = null;
        ONLABEL = null;
        OFFLABEL = null;
    });

    it('_assignTemplateValues', function() {
        var testView = M.ToggleSwitchView.extend({}).create().render();
        var test = function( testText ) {
            testView.label = testText;
            testView._assignTemplateValues();
            assert.equal(testView._templateValues.label, testText);
            assert.equal(testView._templateValues.label, testView.label);
            assert.equal(testView._templateValues.onLabel,  ' ');
            assert.equal(testView._templateValues.offLabel, ' ');
        };
        test('');
        test('asdf');
        test([]);
        test({});
        test(1);

        testView = null;
        test = null;

    });

    it.skip('_setSelectOptions', function() {
        var ONVALUE = 'ONVALUE';
        var OFFVALUE = 'OFFVALUE';

        var ONLABEL = 'ONLABEL';
        var OFFLABEL = 'OFFLABEL';

        var testView = M.ToggleSwitchView.extend({
            onLabel: ONLABEL,
            offLabel: OFFLABEL,
            onValue: ONVALUE,
            offValue: OFFVALUE
        }).create();

        assert.lengthOf(testView.selectOptions.collection, 2);

        assert.equal(testView.selectOptions.collection[0].val, ONVALUE);
        assert.equal(testView.selectOptions.collection[0].label, ONLABEL);
        assert.equal(testView.selectOptions.collection[1].val, OFFVALUE);
        assert.equal(testView.selectOptions.collection[1].label, OFFLABEL);

        assert.equal(testView.selectOptions.labelPath, "label");
        assert.equal(testView.selectOptions.valuePath, "val");


        testView = null;
        ONVALUE = null;
        OFFVALUE = null;
        ONLABEL = null;
        OFFLABEL = null;
    });

    it.skip('test with models and default values', function() {

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: YES
            })
        }).create();

        var extend = M.ToggleSwitchView.extend({scopeKey: 'person.favorite'});
        var create = extend.create(scope, null, true)


        var toggleSwitch = create.render();


        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: NO
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true).render();

        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.isFalse(toggleSwitch.getValue());
        assert.isFalse(scope.person.attributes.favorite);

    });

    it.skip('test with models and custom values', function() {

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: YES
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true).render();

        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: NO
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true).render();

        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.isFalse(toggleSwitch.getValue());
        assert.isFalse(scope.person.attributes.favorite);

    });

    it.skip('test with models - change model with true and false', function() {

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: YES
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true).render();

        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);

        scope.person.set('favorite', NO);
        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.isFalse(toggleSwitch.getValue());
        assert.isFalse(scope.person.attributes.favorite);

        scope.person.set('favorite', YES);
        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);
    });

    it.skip('test with models - change view with true and false', function() {
        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: YES
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: YES,
            offValue: NO,
            onLabel: 'on',
            offLabel: 'off'
        }).create(scope, null, true).render();

        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);

        toggleSwitch.$el.find('input').removeAttr('checked');
        toggleSwitch.$el.find('input').trigger('change');
        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.isFalse(toggleSwitch.getValue());
        assert.isFalse(scope.person.attributes.favorite);

        toggleSwitch.$el.find('input').prop('checked', 'checked');
        toggleSwitch.$el.find('input').trigger('change');
        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.isTrue(toggleSwitch.getValue());
        assert.isTrue(scope.person.attributes.favorite);

    });

    it.skip('test with models - change model with pseudo values', function() {

        var ON = 'ofcourse';
        var OFF = 'noway';

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: ON
            })
        }).create();

        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: ON,
            offValue: OFF,
            onLabel: ON,
            offLabel: OFF
        }).create(scope, null, true).render();

        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), ON);
        assert.equal(scope.person.attributes.favorite, ON);

        scope.person.set('favorite', OFF);
        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), OFF);
        assert.equal(scope.person.attributes.favorite, OFF);

        scope.person.set('favorite', ON);
        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), ON);
        assert.equal(scope.person.attributes.favorite, ON);
    });

    it.skip('test with models - change view with pseudo values', function() {
        var ON = 'ofcourse';
        var OFF = 'noway';

        var scope = M.Controller.extend({
            person: M.Model.create({
                favorite: ON
            })
        }).create();


        var toggleSwitch = M.ToggleSwitchView.extend({
            scopeKey: 'person.favorite',
            onValue: ON,
            offValue: OFF,
            onLabel: ON,
            offLabel: OFF
        }).create(scope, null, true).render();

        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), ON);
        assert.equal(scope.person.attributes.favorite, ON);

        toggleSwitch.$el.find('input').removeAttr('checked');
        toggleSwitch.$el.find('input').trigger('change');
        assert.isFalse(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), OFF);
        assert.equal(scope.person.attributes.favorite, OFF);

        toggleSwitch.$el.find('input').prop('checked', 'checked');
        toggleSwitch.$el.find('input').trigger('change');
        assert.isTrue(toggleSwitch.$el.find('input').prop('checked'));
        assert.equal(toggleSwitch.getValue(), ON);
        assert.equal(scope.person.attributes.favorite, ON);

    });

});

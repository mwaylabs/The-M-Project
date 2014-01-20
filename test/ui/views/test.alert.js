describe('M.AlertView', function() {

    it('general', function() {
        // Basic
        assert.isDefined(M.AlertView);
        assert.isFunction(M.AlertView);
        assert.isDefined(M.Alert);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.AlertView.create()));
        assert.isTrue(M.ModalView.prototype.isPrototypeOf(M.AlertView.create()));
        assert.isTrue(M.View.prototype.isPrototypeOf(M.Alert));
        assert.isTrue(M.AlertView.prototype.isPrototypeOf(M.Alert));
        assert.isFunction(M.Alert.show);
        assert.isFunction(M.Alert.hide);
        assert.equal(M.Alert._shownCounter, 0);
        assert.equal(M.AlertView.create()._shownCounter, 0);
    });

    it('initialize', function(){
        var testView = null;

        var test = function (text ,title) {

            testView = M.AlertView.extend({
                text: text,
                title: title
            }).create().render();

            testView.initialize();
            if(text === null && title === null){
                assert.equal(testView.text, '');
                assert.equal(testView.title, '');
            }
            else{
                assert.equal(testView.text, text);
                assert.equal(testView.title, title);
            }
        };

        test('abc','def');
        test('','');
        test(1,2);
        test({}, {});
        test([], []);
        test(null, null);

        testView = null;
        test = null;
    });

    it('create and show alert with no parameters', function() {
        var testView = M.AlertView.extend({
        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-title'), 1);
        assert.equal($('.m-alertview-title').html(), '');
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        assert.lengthOf(testView.$el.find('.buttonContainer'),1);
        assert.lengthOf(testView.$el.find('.confirmButton'),1)
        assert.equal(testView.$el.find('.confirmButton [data-binding="value"]').html(), 'Ok');
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        testView = null;
    });

    it('create and show alert with some parameters', function() {
        var text = 'abc';

        var testView = M.AlertView.extend({
            text: text
        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-title'), 1);
        assert.equal($('.m-alertview-title').html(), '');
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), text);
        assert.lengthOf(testView.$el.find('.buttonContainer'),1);
        assert.lengthOf(testView.$el.find('.confirmButton'), 1)
        assert.equal(testView.$el.find('.confirmButton [data-binding="value"]').html(), 'Ok');
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        testView = null;
        text = null;
    });

    it('show and create alert with all parameters', function() {
        var text = 'abc';
        var title = 'def';

        var testView = M.AlertView.extend({
            text: text,
            title: title
        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-title'), 1);
        assert.equal($('.m-alertview-title').html(), title);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), text);
        assert.lengthOf(testView.$el.find('.buttonContainer'),1);
        assert.lengthOf(testView.$el.find('.confirmButton'), 1);
        assert.equal(testView.$el.find('.confirmButton [data-binding="value"]').html(), 'Ok');
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        testView = null;
        text = null;
        title = null;
    });

    it('create and show alert view and overwriting functions', function() {
        var text = 'abc';
        var title = 'def';
        var functionConfirm = function(){
            console.log('ok');
        };
        var testView = M.AlertView.extend({
            text: text,
            title: title,
            onConfirm: functionConfirm
        }).create().render();

        assert.isDefined(testView.onConfirm);
        assert.isDefined(testView._onConfirm);

        assert.equal(testView.onConfirm, functionConfirm);

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-title'), 1);
        assert.equal($('.m-alertview-title').html(), title);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), text);
        assert.lengthOf(testView.$el.find('.buttonContainer'),1);
        assert.lengthOf(testView.$el.find('.confirmButton'), 1);
        assert.equal(testView.$el.find('.confirmButton [data-binding="value"]').html(), 'Ok');
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        testView = null;
        text = null;
        title = null;
        functionConfirm = null;
    });


});

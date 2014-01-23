describe('M.ActionSheetView', function() {

    it('general', function() {
        // Basic
        assert.isDefined(M.ActionSheetView);
        assert.isFunction(M.ActionSheetView);
        assert.isDefined(M.ActionSheet);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ActionSheetView.create()));
        assert.isTrue(M.ModalView.prototype.isPrototypeOf(M.ActionSheetView.create()));
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ActionSheet));
        assert.isTrue(M.ActionSheetView.prototype.isPrototypeOf(M.ActionSheet));
        assert.isFunction(M.ActionSheet.show);
        assert.isFunction(M.ActionSheet.hide);
        assert.isFunction(M.ActionSheet.onCancel);
        assert.isFunction(M.ActionSheet._onCancel);
        assert.equal(M.ActionSheet._shownCounter, 0);
        assert.equal(M.ActionSheetView.create()._shownCounter, 0);
    });

    it('initialize', function(){
        var testView = null;

        var test = function (title) {

            testView = M.ActionSheetView.extend({
                title: title,
                cancelButton: YES
            }).create().render();

            testView.initialize();
            if(title === null){
                assert.equal(testView.title, '');
            }
            else{
                assert.equal(testView.title, title);
            }

            assert.lengthOf(testView.$el.find('.button'),1)
        };

        test('abc');
        test('');
        test(1);
        test([]);
        test({});
        test(null);

        testView = null;
        test = null;
    });

    it('create and show actionsheetview with no parameters', function() {
        var testView = M.ActionSheetView.extend({
        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.actionsheetview'), 1);
        assert.lengthOf($('.m-actionsheetview-title'), 1);
        assert.lengthOf($('.m-actionsheetview-inner'), 1);
        assert.lengthOf(testView.$el.find('[data-childviews="actionsheetChildren"]'),1)
        assert.equal($('[data-childviews="actionsheetChildren"]').html(), '');
        assert.lengthOf(testView.$el.find('.button'), 1)
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.ActionSheetView'), 0);

        testView = null;
    });

    it('create and show actionsheet with some parameters', function() {
        var title = 'abc';

        var testView = M.ActionSheetView.extend({
            title: title,
            cancelButton: NO

        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.actionsheetview'), 1);
        assert.lengthOf($('.m-actionsheetview-title'), 1);
        assert.equal($('.m-actionsheetview-title').html(), title);
        assert.lengthOf($('.m-actionsheetview-inner'), 1);
        assert.lengthOf(testView.$el.find('[data-childviews="actionsheetChildren"]'),1)
        assert.equal($('[data-childviews="actionsheetChildren"]').html(), '');
        assert.lengthOf(testView.$el.find('.button'), 0)
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.ActionSheetView'), 0);
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);

        testView = null;
        title = null;
    });

    it('show and create actionsheet with all parameters', function() {
        var title = 'abc';
        var text = 'def';

        var testView = M.ActionSheetView.extend({
            title: title,
            cancelButton: YES,
            cancelLabel: text,
            childViews: {
                testButton: M.ButtonView.extend({
                    value: 'testButton',
                    cssClass: 'testButton'
                })

            }

        }).create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.actionsheetview'), 1);
        assert.lengthOf($('.m-actionsheetview-title'), 1);
        assert.equal($('.m-actionsheetview-title').html(), title);
        assert.lengthOf($('.m-actionsheetview-inner'), 1);
        assert.lengthOf(testView.$el.find('[data-childviews="actionsheetChildren"]'),1)
        assert.lengthOf(testView.$el.find('.button'), 2)
        assert.equal(testView.$el.find('.testButton [data-binding="value"]').html(), 'testButton')
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.ActionSheetView'), 0);
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);

        testView = null;
        title = null;
    });

    it('create and show actionsheet view and overwriting functions', function() {
        var title = 'abc';
        var text = 'def';
        var testFunction = function(){
            console.log('actionview test');

        };

        var testView = M.ActionSheetView.extend({
            title: title,
            cancelButton: YES,
            cancelLabel: text,
            onCancel: testFunction,
            childViews: {
                testButton: M.ButtonView.extend({
                    value: 'testButton',
                    cssClass: 'testButton'
                })

            }

        }).create().render();

        assert.isDefined(testView);
        assert.isDefined(testView.onCancel);
        assert.isFunction(testView.onCancel);
        assert.equal(testView.onCancel, testFunction);

        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.actionsheetview'), 1);
        assert.lengthOf($('.m-actionsheetview-title'), 1);
        assert.equal($('.m-actionsheetview-title').html(), title);
        assert.lengthOf($('.m-actionsheetview-inner'), 1);
        assert.lengthOf(testView.$el.find('[data-childviews="actionsheetChildren"]'),1)
        assert.lengthOf(testView.$el.find('.button'), 2)
        assert.equal(testView.$el.find('.testButton [data-binding="value"]').html(), 'testButton')
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.ActionSheetView'), 0);
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.actionsheetview'), 0);

        testView = null;
        title = null;
        testFunction = null;
    });


});
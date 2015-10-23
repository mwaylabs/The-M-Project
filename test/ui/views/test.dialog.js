describe('M.DialogView', function() {

    it('general', function() {
        // Basic
        assert.isDefined(M.DialogView);
        assert.isFunction(M.DialogView);
        assert.isDefined(M.Dialog);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.DialogView.create()));
        assert.isTrue(M.ModalView.prototype.isPrototypeOf(M.DialogView.create()));
        assert.isTrue(M.View.prototype.isPrototypeOf(M.Dialog));
        assert.isTrue(M.DialogView.prototype.isPrototypeOf(M.Dialog));
        assert.isFunction(M.Dialog.show);
        assert.isFunction(M.Dialog.hide);
        assert.isFunction(M.Dialog.onConfirm);
        assert.isFunction(M.Dialog._onConfirm);
        assert.isFunction(M.Dialog.onDecline);
        assert.isFunction(M.Dialog._onDecline);
        assert.equal(M.Dialog._shownCounter, 0);
        assert.equal(M.DialogView.create()._shownCounter, 0);
    });

    it('initialize', function(){
        var testView = null;

        var test = function (labelText, text ,headline) {

            testView = M.DialogView.extend({
                text: text,
                headline: headline,
                confirmButton: YES,
                declineButton: YES,
                confirmLabel: labelText,
                declineLabel: labelText
            }).create().render();

            testView.initialize();
            if(text === null && labelText === null && headline === null){
                assert.equal(testView.text, '');
                assert.equal(testView.headline, '');
                assert.equal(testView.confirmLabel, 'Ok');
                assert.equal(testView.declineLabel, 'Cancel');
            }
            else{
                assert.equal(testView.text, text);
                assert.equal(testView.headline, headline);
                assert.equal(testView.confirmLabel, labelText);
                assert.equal(testView.declineLabel, labelText);
            }
        };

        test('abc','def','ghi');
        test('','','');
        test(1,2,3);
        test('', [], []);
        test('', {}, {});
        test(null, null, null);

        testView = null;
        test = null;
    });

    it('create and show dialog with no parameters', function() {
        var dialog = M.DialogView.extend({
        }).create().render();

        assert.isDefined(dialog);
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);
        dialog.show();
        assert.equal(dialog._shownCounter, 1);
        assert.lengthOf($('.dialogview'), 1);
        assert.lengthOf($('.m-dialogview-headline'), 1);
        assert.equal($('.m-dialogview-headline').html(), '');
        assert.lengthOf($('.m-dialogview-inner-message'), 1);
        assert.equal($('.m-dialogview-inner-message').html(), '');
        assert.lengthOf(dialog.$el.find('.buttons'),1)
        assert.lengthOf(dialog.$el.find('.confirmButton'), 1)
        assert.lengthOf(dialog.$el.find('.declineButton'), 0)
        dialog.hide();
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);

        dialog = null;
    });

    it('create and show dialog with some parameters', function() {
        var text = 'abc';
        var headline = 'def';
        var buttonBool = YES;
        var label = 'okeTest';

        var dialog = M.DialogView.extend({
            text: text,
            headline: headline,
            confirmButton: buttonBool,
            confirmLabel: label
        }).create().render();

        assert.isDefined(dialog);
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);
        dialog.show();
        assert.equal(dialog._shownCounter, 1);
        assert.lengthOf($('.dialogview'), 1);
        assert.lengthOf($('.m-dialogview-headline'), 1);
        assert.equal($('.m-dialogview-headline').html(), headline);
        assert.lengthOf($('.m-dialogview-inner-message'), 1);
        assert.equal($('.m-dialogview-inner-message').html(), text);
        assert.lengthOf(dialog.$el.find('.buttons'),1)
        assert.lengthOf(dialog.$el.find('.confirmButton'), 1)
        assert.lengthOf(dialog.$el.find('.declineButton'), 0)
        assert.equal(dialog.$el.find('.confirmButton [data-binding="value"]').html(), label);
        dialog.hide();
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);

        dialog = null;
        text = null;
        headline = null;
        buttonBool = null;
        label = null;
    });

    it('show and create dialog with all parameters', function() {
        var text = 'abc';
        var headline = 'def';
        var buttonBoolConfirm = YES;
        var confirmLabel = 'okeTest';
        var buttonBoolDecline = YES;
        var declineLabel = 'decline';

        var dialog = M.DialogView.extend({
            text: text,
            headline: headline,
            confirmButton: buttonBoolConfirm,
            confirmLabel: confirmLabel,
            declineButton: buttonBoolDecline,
            declineLabel: declineLabel
        }).create().render();

        assert.isDefined(dialog);
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);
        dialog.show();
        assert.equal(dialog._shownCounter, 1);
        assert.lengthOf($('.dialogview'), 1);
        assert.lengthOf($('.m-dialogview-headline'), 1);
        assert.equal($('.m-dialogview-headline').html(), headline);
        assert.lengthOf($('.m-dialogview-inner-message'), 1);
        assert.equal($('.m-dialogview-inner-message').html(), text);
        assert.lengthOf(dialog.$el.find('.buttons'),1);
        assert.lengthOf(dialog.$el.find('.confirmButton'), 1);
        assert.lengthOf(dialog.$el.find('.declineButton'), 1);
        assert.equal(dialog.$el.find('.confirmButton [data-binding="value"]').html(), confirmLabel);
        assert.equal(dialog.$el.find('.declineButton [data-binding="value"]').html(), declineLabel);
        dialog.hide();
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);

        dialog = null;
        text = null;
        headline = null;
        buttonBoolConfirm = null;
        confirmLabel = null;
        buttonBoolDecline = null;
        declineLabel = null;
    });

    it('create and show dialog view and overwriting functions', function() {
        var text = 'abc';
        var headline = 'def';
        var buttonBoolConfirm = YES;
        var confirmLabel = 'okeTest';
        var buttonBoolDecline = YES;
        var declineLabel = 'decline';
        var functionConfirm = function(){
            console.log('ok');
        };
        var functionDecline = function(){
            console.log('cancel');
        };

        var dialog = M.DialogView.extend({
            text: text,
            headline: headline,
            confirmButton: buttonBoolConfirm,
            confirmLabel: confirmLabel,
            declineButton: buttonBoolDecline,
            declineLabel: declineLabel,
            onConfirm: functionConfirm,
            onDecline: functionDecline
        }).create().render();

        assert.isDefined(dialog.onConfirm);
        assert.isDefined(dialog.onDecline);
        assert.isDefined(dialog._onConfirm);
        assert.isDefined(dialog._onDecline);

        assert.equal(dialog.onConfirm, functionConfirm);
        assert.equal(dialog.onDecline, functionDecline);

        assert.isDefined(dialog);
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);
        dialog.show();
        assert.equal(dialog._shownCounter, 1);
        assert.lengthOf($('.dialogview'), 1);
        assert.lengthOf($('.m-dialogview-headline'), 1);
        assert.equal($('.m-dialogview-headline').html(), headline);
        assert.lengthOf($('.m-dialogview-inner-message'), 1);
        assert.equal($('.m-dialogview-inner-message').html(), text);
        assert.lengthOf(dialog.$el.find('.buttons'),1);
        assert.lengthOf(dialog.$el.find('.confirmButton'), 1);
        assert.lengthOf(dialog.$el.find('.declineButton'), 1);
        assert.equal(dialog.$el.find('.confirmButton [data-binding="value"]').html(), confirmLabel);
        assert.equal(dialog.$el.find('.declineButton [data-binding="value"]').html(), declineLabel);
        dialog.hide();
        assert.equal(dialog._shownCounter, 0);
        assert.lengthOf($('.dialogview'), 0);

        dialog = null;
        text = null;
        headline = null;
        buttonBoolConfirm = null;
        confirmLabel = null;
        buttonBoolDecline = null;
        declineLabel = null;
        functionConfirm = null;
        functionDecline = null;
    });


});

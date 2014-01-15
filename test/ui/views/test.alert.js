describe('M.AlertView', function () {

    it('general', function () {
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

    it('show', function(){
        var alert = M.AlertView.create().render();
        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.show();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.show();
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.hide();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.hide();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
    });

    it('show with the static M.Alert', function(){
        var alert = M.Alert;

        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.show();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.show();
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.hide();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '');
        alert.hide();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
    });

    it('show Alert with text', function(){
        var alert = M.AlertView.create().render();
        var TEXT1 = 'abc';
        var TEXT2 = 'def';
        var TEXT3 = '!§$%&()=?1234567890ß|²³{[]}}*_:,.-#+"<>';
        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.show(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.show(TEXT2);
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT2);
        alert.show(TEXT3);
        assert.equal(alert._shownCounter, 3);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
        TEXT1 = null;
        TEXT2 = null;
        TEXT3 = null;
    });

    it('show with the static M.Loader and text', function(){
        var alert = M.Alert;

        var TEXT1 = 'abc';
        var TEXT2 = 'def';
        var TEXT3 = '!§$%&()=?1234567890ß|²³{[]}}*_:,.-#+"<>';
        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.show(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.show(TEXT2);
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT2);
        alert.show(TEXT3);
        assert.equal(alert._shownCounter, 3);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), '!§$%&amp;()=?1234567890ß|²³{[]}}*_:,.-#+"&lt;&gt;');
        alert.hide();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
        TEXT1 = null;
        TEXT2 = null;
    });

    it('toggle alert instance', function(){
        var alert = M.AlertView.create().render();

        var TEXT1 = 'abc';
        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.toggle();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
        TEXT1 = null;
    });

    it('toggle the static M.Alert', function(){
        var alert = M.Alert;

        var TEXT1 = 'abc';
        assert.isDefined(alert);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert.toggle(TEXT1);
        assert.equal(alert._shownCounter, 1);
        assert.lengthOf($('.alertview'), 1);
        assert.lengthOf($('.m-alertview-inner-message'), 1);
        assert.equal($('.m-alertview-inner-message').html(), TEXT1);
        alert.toggle();
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert = null;
        TEXT1 = null;
    });

    it('force the hidding', function(){
        var alert = M.Alert;
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.hide(true);

        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);

        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.show();
        alert.hide('');

        assert.equal(alert._shownCounter, 8);
        assert.lengthOf($('.alertview'), 1);
        alert.hide(false);
        assert.equal(alert._shownCounter, 7);
        assert.lengthOf($('.alertview'), 1);
        alert.hide({});
        assert.equal(alert._shownCounter, 6);
        assert.lengthOf($('.alertview'), 1);
        alert.hide([]);
        assert.equal(alert._shownCounter, 5);
        assert.lengthOf($('.alertview'), 1);
        alert.hide('force');
        assert.equal(alert._shownCounter, 4);
        assert.lengthOf($('.alertview'), 1);
        alert.hide('true');
        assert.equal(alert._shownCounter, 3);
        assert.lengthOf($('.alertview'), 1);
        alert.hide(1);
        assert.equal(alert._shownCounter, 2);
        assert.lengthOf($('.alertview'), 1);
        alert.hide(YES);
        assert.equal(alert._shownCounter, 0);
        assert.lengthOf($('.alertview'), 0);
        alert = null;
    });

it.('mulitple hiding', function(){
    var alert = M.Alert;
    alert.show();
    alert.show();
    assert.equal(alert._shownCounter, 2);
    assert.lengthOf($('.alertview'), 1);
    alert.hide();
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    alert.hide();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.hide();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.hide();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.hide();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.hide();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert = null;
});

it.('static show with text and without', function(){
    var alert = M.Alert;

    var TEXT1 = 'abc';
    //is the text inside of the loader
    assert.isDefined(alert);
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.show(TEXT1);
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.equal($('.m-alertview-inner-message').html(), TEXT1);
    alert.hide();
    alert.show();
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.equal($('.m-alertview-inner-message').html(), '');
    alert.hide();

    alert = null;
    TEXT1 = null;
});

it.('_cancel and _ok', function(){
    var alert = M.AlertView.create().render();

    var TEXT1 = 'abc';
    var TEXT2 = 'DEF';
    assert.isDefined(alert);
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.show(TEXT1);
    assert.equal($('.buttons .buttonview').length,2);
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.equal($('.m-alertview-inner-message').html(), TEXT1);
    alert._cancel();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.show(TEXT2);
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.lengthOf($('.buttons'), 2);
    assert.equal($('.m-alertview-inner-message').html(), TEXT2);
    alert._ok();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);

    alert = null;
    TEXT1 = null;
    TEXT2 = null;
});

it.('static _cancel and _ok', function(){
    var alert = M.Alert;

    var TEXT1 = 'abc';
    var TEXT2 = 'DEF';
    assert.isDefined(alert);
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.show(TEXT1);
    assert.equal($('.buttons .buttonview').length,2);
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.equal($('.m-alertview-inner-message').html(), TEXT1);
    alert._cancel();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);
    alert.show(TEXT2);
    assert.equal(alert._shownCounter, 1);
    assert.lengthOf($('.alertview'), 1);
    assert.lengthOf($('.m-alertview-inner-message'), 1);
    assert.equal($('.m-alertview-inner-message').html(), TEXT2);
    alert._ok();
    assert.equal(alert._shownCounter, 0);
    assert.lengthOf($('.alertview'), 0);

    alert = null;
    TEXT1 = null;
    TEXT2 = null;
});

});

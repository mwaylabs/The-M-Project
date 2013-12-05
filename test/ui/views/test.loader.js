describe('M.LoaderView', function () {

    it('general', function () {
        // Basic
        assert.isDefined(M.LoaderView);
        assert.isFunction(M.LoaderView);
        assert.isDefined(M.Loader);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.LoaderView.create()));
        assert.isTrue(M.ModalView.prototype.isPrototypeOf(M.LoaderView.create()));
        assert.isTrue(M.View.prototype.isPrototypeOf(M.Loader));
        assert.isTrue(M.LoaderView.prototype.isPrototypeOf(M.Loader));
        assert.isFunction(M.Loader.show);
        assert.isFunction(M.Loader.hide);
        assert.equal(M.Loader._shownCounter, 0);
        assert.equal(M.LoaderView.create()._shownCounter, 0);
    });

    it('show', function(){
        var loader = M.LoaderView.create().render();
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.show();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.show();
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.hide();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
    });

    it('show with the static M.Loader', function(){
        var loader = M.Loader;

        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.show();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.show();
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.hide();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
    });

    it('show with text', function(){
        var loader = M.LoaderView.create().render();
        var TEXT1 = 'abc';
        var TEXT2 = 'def';
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.show(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.show(TEXT2);
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT2);
        loader.hide();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT2);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
        TEXT1 = null;
        TEXT2 = null;
    });

    it('show with the static M.Loader and text', function(){
        var loader = M.Loader;

        var TEXT1 = 'abc';
        var TEXT2 = 'def';
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.show(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.show(TEXT2);
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT2);
        loader.hide();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT2);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
        TEXT1 = null;
        TEXT2 = null;
    });

    it('toggle loader instance', function(){
        var loader = M.LoaderView.create().render();

        var TEXT1 = 'abc';
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.toggle();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
        TEXT1 = null;
    });

    it('toggle the static M.Loader', function(){
        var loader = M.Loader;

        var TEXT1 = 'abc';
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.toggle(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.toggle();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader = null;
        TEXT1 = null;
    });

    it('force the hidding', function(){
        var loader = M.Loader;
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.hide(true);

        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);

        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.show();
        loader.hide('');

        assert.equal(loader._shownCounter, 8);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide(false);
        assert.equal(loader._shownCounter, 7);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide({});
        assert.equal(loader._shownCounter, 6);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide([]);
        assert.equal(loader._shownCounter, 5);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide('force');
        assert.equal(loader._shownCounter, 4);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide('true');
        assert.equal(loader._shownCounter, 3);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide(1);
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide(YES);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
    });

    it('mulitple hidding', function(){
        var loader = M.Loader;
        loader.show();
        loader.show();
        assert.equal(loader._shownCounter, 2);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.hide();
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
    });

    it('static show with text and without', function(){
        var loader = M.Loader;

        var TEXT1 = 'abc';
        //is the text inside of the loader
        assert.isDefined(loader);
        assert.equal(loader._shownCounter, 0);
        assert.lengthOf($('.loaderview'), 0);
        loader.show(TEXT1);
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), TEXT1);
        loader.hide();
        loader.show();
        assert.equal(loader._shownCounter, 1);
        assert.lengthOf($('.loaderview'), 1);
        assert.lengthOf($('.m-loaderview-inner-message'), 1);
        assert.equal($('.m-loaderview-inner-message').html(), '');
        loader.hide();

        loader = null;
        TEXT1 = null;
    });



});

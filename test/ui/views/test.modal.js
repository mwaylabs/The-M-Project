describe('M.ModalView', function() {

    it('general', function() {

        // Basic
        assert.isDefined(M.ModalView);
        assert.isFunction(M.ModalView);
        assert.isTrue(M.View.prototype.isPrototypeOf(M.ModalView.create()));
        var testView = M.ModalView.create();
        assert.equal(testView._type, 'M.ModalView');
    });

    it('show', function() {
        var testView = M.ModalView.create().render();
        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.show();
        assert.equal(testView._shownCounter, 2);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);
        testView = null;
    });


    it('toggle modal instance', function() {
        var testView = M.ModalView.create().render();

        assert.isDefined(testView);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        testView.toggle();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);

        testView.toggle();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);

        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);

        testView.toggle();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);

        testView.toggle();
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);

        testView = null;
    });


    it('force the hidding', function() {
        var testView = M.ModalView.create().render();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.hide(true);

        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);

        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.show();
        testView.hide('');

        assert.equal(testView._shownCounter, 8);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide(false);
        assert.equal(testView._shownCounter, 7);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide({});
        assert.equal(testView._shownCounter, 6);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide([]);
        assert.equal(testView._shownCounter, 5);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide('force');
        assert.equal(testView._shownCounter, 4);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide('true');
        assert.equal(testView._shownCounter, 3);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide(1);
        assert.equal(testView._shownCounter, 2);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);
        testView.hide(YES);
        assert.equal(testView._shownCounter, 0);
        assert.lengthOf($('.modalview'), 0);
        assert.lengthOf($('.modal-backdrop'), 0);
    });

    it('animated test', function( done ) {

        var testView = M.ModalView.create().render();
        testView.show();
        assert.equal(testView._shownCounter, 1);
        assert.lengthOf($('.modalview'), 1);
        assert.lengthOf($('.modal-backdrop'), 1);


        setTimeout(function() {
            testView.hide();
            setTimeout(function() {
                assert.equal(testView._shownCounter, 0);
                assert.lengthOf($('.modalview'), 0);
                assert.lengthOf($('.modal-backdrop'), 0);
                done();
            }, 200);
        }, 200);

    });

});

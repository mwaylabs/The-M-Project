describe.skip('M.AddCssClass implementation', function() {

    var general = function( testInterface ) {
        assert.isTrue(testInterface._type === 'M.Interface');
        assert.isDefined(testInterface.isMInterface);
        assert.isTrue(testInterface.isMInterface);
        assert.isFunction(testInterface.getInterface);
    }

    it('general', function() {
        general(M.Interface);
        assert.equal(M.AddCssClass._type, 'M.AddCssClass');
    });

    it('css classes', function() {
        var testView = M.View.extend({
            icon: 'search left'
        }).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('search'));
        assert.isTrue(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        var testView = M.View.extend({}).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isFalse(testView.$el.hasClass('search'));
        assert.isFalse(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        var testView = M.View.extend({
            icon: 'search left',
            cssClass: 'a'
        }).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('search'));
        assert.isTrue(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        var testView = M.View.extend({
            icon: 'search left',
            cssClass: 'a b'
        }).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('b'));
        assert.isTrue(testView.$el.hasClass('search'));
        assert.isTrue(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        var testView = M.View.extend({
            icon: 'search left',
            cssClass: 'a b',
            _internalCssClasses: 'c d'
        }).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('b'));
        assert.isTrue(testView.$el.hasClass('c'));
        assert.isTrue(testView.$el.hasClass('d'));
        assert.isTrue(testView.$el.hasClass('search'));
        assert.isTrue(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        var testView = M.View.extend({
            icon: 'search left',
            cssClass: 'a b',
            _internalCssClasses: 'c d',
            grid: 'e'
        }).implements([M.IconBackground]).create().render();
        assert.isTrue(testView.$el.hasClass('view'));
        assert.isTrue(testView.$el.hasClass('a'));
        assert.isTrue(testView.$el.hasClass('b'));
        assert.isTrue(testView.$el.hasClass('c'));
        assert.isTrue(testView.$el.hasClass('d'));
        assert.isTrue(testView.$el.hasClass('e'));
        assert.isTrue(testView.$el.hasClass('search'));
        assert.isTrue(testView.$el.hasClass('left'));
        assert.isFalse(testView.$el.hasClass('null'));

        testView = null;
    });

});

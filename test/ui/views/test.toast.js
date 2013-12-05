describe('M.Toast', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.Toast);
        assert.isFunction(M.Toast);
        assert.isFunction(M.Toast.show);
        assert.isTrue(Backbone.View.prototype.isPrototypeOf(M.Toast.create()));
        assert.isTrue(M.Toast.CONST.RAW === 500);
        assert.isTrue(M.Toast.CONST.MEDIUM === 2000);
        assert.isTrue(M.Toast.CONST.CRISPY === 4000);
        assert.isTrue(M.Toast.CONST.TEXT === '');

        var toast = M.Toast.create();

        assert.isDefined(toast);
        var id = _.uniqueId();
        assert.isTrue(toast.id === (id-1).toString());
        assert.isTrue(toast.text === M.Toast.CONST.TEXT);

        var toast = M.Toast.create({
            text: 'test'
        });

        assert.isTrue(toast.text === 'test');

    });

    it('M.Toast static', function(){
        $('body').find('.toastview .toast div').remove();
        M.Toast.show('test');
        assert.equal($('body').find('.toastview .toast div').text(), 'test');
    });

    it('M.Toast timeout MEDIUM', function( done ){
        this.timeout(M.Toast.CONST.MEDIUM + 500);
        M.Toast.removeAll();
        M.Toast.show('test');

        console.log(M.Toast._stack.length, $('body').find('.toastview .toast div').text());

        assert.equal($('body').find('.toastview .toast div').text(), 'test');
        setTimeout(function(){
            assert.lengthOf($('body').find('.toastview .toast div'), 0);
            done();
        }, M.Toast.CONST.MEDIUM);
    });
});

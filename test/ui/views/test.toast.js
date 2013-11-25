describe('M.Toast', function () {

    it('general', function () {

        // Basic
        assert.isDefined(M.Toast);
        assert.isFunction(M.Toast);
        assert.isFunction(M.Toast.show);
        assert.isTrue(Backbone.View.prototype.isPrototypeOf(M.Toast.create()));
        assert.isTrue(M.Toast.RAW === 500);
        assert.isTrue(M.Toast.MEDIUM === 2000);
        assert.isTrue(M.Toast.CRISPY === 4000);
        assert.isTrue(M.Toast.TEXT === '');

        var toast = M.Toast.create();

        assert.isDefined(toast);
        var id = _.uniqueId();
        assert.isTrue(toast.id === (id-1).toString());
        assert.isTrue(toast.text === M.Toast.TEXT);

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
        this.timeout(M.Toast.MEDIUM + 500);
        $('body').find('.toastview .toast div').remove();
        M.Toast.show('test');
        assert.equal($('body').find('.toastview .toast div').text(), 'test');
        setTimeout(function(){
            assert.lengthOf($('body').find('.toastview .toast div'), 0);
            done();
        }, M.Toast.MEDIUM);
    });
});

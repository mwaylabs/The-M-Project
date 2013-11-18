describe('M.PageTransitions', function () {


    it('basic', function () {
        assert.isDefined(M.ThemeVars);
        assert.isObject(M.ThemeVars);
        assert.isFunction(M.ThemeVars.get);
        assert.isDefined(M.ThemeVars._vars);
        assert.isObject(M.ThemeVars._vars);
    });

    it('check theme names', function () {
        assert.isDefined(M.ThemeVars._vars.default);
        assert.isObject(M.ThemeVars._vars.default);

        assert.isDefined(M.ThemeVars._vars.android_dark);
        assert.isObject(M.ThemeVars._vars.android_dark);

        assert.isDefined(M.ThemeVars._vars.android_light);
        assert.isObject(M.ThemeVars._vars.android_light);

        assert.isDefined(M.ThemeVars._vars.ios);
        assert.isObject(M.ThemeVars._vars.ios);
    });


    it('get variables', function () {
        M.ThemeVars._vars = {
            default: {
                "colorA": "#AAA",
                "colorB": "#BBB"
            },
            ios: {
                colorB: '#BABABA',
                colorC: '#CCC'
            }
        }

        assert.equal(M.ThemeVars.get('colorA'), '#AAA');
        assert.equal(M.ThemeVars.get('colorB'), '#BBB');
        assert.isUndefined(M.ThemeVars.get('colorC'));

        assert.equal(M.ThemeVars.get('colorA', 'ios'), '#AAA');
        assert.equal(M.ThemeVars.get('colorB', 'ios'), '#BABABA');
        assert.equal(M.ThemeVars.get('colorC', 'ios'), '#CCC');
    });
});

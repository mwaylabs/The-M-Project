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
        var themeVars = JSON.stringify(M.ThemeVars._vars);
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
        M.ThemeVars._vars = JSON.parse(themeVars);
    });

    it('theme vars', function(){
        assert.isDefined(M.ThemeVars, '1');
        assert.isFunction(M.ThemeVars.get, '2');
        assert.isDefined(M.ThemeVars._vars, '3');
        assert.isDefined(M.ThemeVars._vars.default, '4');

        assert.isDefined(M.ThemeVars._vars.default['m-menu-view-width'], JSON.stringify(M.ThemeVars._vars.default));
        assert.equal(M.ThemeVars._vars.default['m-menu-view-width'], M.ThemeVars.get('m-menu-view-width', 'default'), '6');
        assert.equal(M.ThemeVars._vars.default['m-menu-view-width'], M.ThemeVars.get('m-menu-view-width'), '7');
    });
});

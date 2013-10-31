describe('M.TemplateManager', function() {

    var uiTemplates = ['defaultTemplate', 'bootstrap', 'topcoat', 'jqm'];
    var TEST_TEMPLATE = '<div></div>';

    var ALL_M_VIEWS = _.filter(Object.keys(M.TemplateManager), function( value, key ) {
        return (value.indexOf('M.') >= 0);
    });

    var TEMPLATE_VIEW_NAME = 'M.TemplateForTestPurposes';

    it('General', function() {

        assert.isDefined(M.TemplateManager);
        assert.isObject(M.TemplateManager);
        assert.isTrue(M.Object.isPrototypeOf(M.TemplateManager));
        assert.isDefined(M.TemplateManager._currentUI);
        assert.isString(M.TemplateManager._currentUI);
        var currentUI = _.find(uiTemplates, function( value ) {
            return value === M.TemplateManager._currentUI
        });
        assert.isTrue(M.TemplateManager._currentUI === currentUI);
    });

    it('View templates', function() {

        for( var view in ALL_M_VIEWS ) {
            for( var template in uiTemplates ) {
                var viewTemplate = M.TemplateManager.get(ALL_M_VIEWS[view], uiTemplates[template]);
                assert.isString(viewTemplate);
                assert.isTrue(viewTemplate.indexOf('<') === 0);
            }
        }

    });

    it('defaultTheme is defined for every view', function() {

        for( var view in ALL_M_VIEWS ) {
            for( var template in uiTemplates ) {
                assert.isDefined(M.TemplateManager[ALL_M_VIEWS[view]]['defaultTemplate']);
            }
        }

    });

    describe('Get Function', function() {

        var testForSpecificTheme = function( theme ) {
            M.TemplateManager[TEMPLATE_VIEW_NAME] = {};
            M.TemplateManager[TEMPLATE_VIEW_NAME][theme] = TEST_TEMPLATE;


            M.TemplateManager._currentUI = 'defaultTemplate';
            assert.isUndefined(M.TemplateManager.get(TEMPLATE_VIEW_NAME));
            assert.isDefined(M.TemplateManager.get(TEMPLATE_VIEW_NAME, theme));
            M.TemplateManager._currentUI = theme;
            assert.isDefined(M.TemplateManager.get(TEMPLATE_VIEW_NAME));
        };

        var testForSpecificThemeWithOwnTemplate = function(theme){
            M.TemplateManager._currentUI = theme
            M.TemplateManager[TEMPLATE_VIEW_NAME] = {
                defaultTemplate: TEST_TEMPLATE
            };
            assert.isDefined(M.TemplateManager[TEMPLATE_VIEW_NAME]);
            M.TemplateManager[TEMPLATE_VIEW_NAME][theme] = TEST_TEMPLATE + theme;
            assert.isTrue(M.TemplateManager.get(TEMPLATE_VIEW_NAME) === TEST_TEMPLATE + theme);
            assert.isTrue(M.TemplateManager.get(TEMPLATE_VIEW_NAME, theme) === TEST_TEMPLATE + theme);
        }

        it('templates are accessable', function() {

            var testTemplate = function( view ) {
                for( var template in uiTemplates ) {
                    var viewTemplate = M.TemplateManager.get(view, uiTemplates[template]);
                    assert.isTrue(viewTemplate === TEST_TEMPLATE);
                }
            };

            assert.isUndefined(M.TemplateManager[TEMPLATE_VIEW_NAME]);
            M.TemplateManager[TEMPLATE_VIEW_NAME] = {
                defaultTemplate: TEST_TEMPLATE
            };
            testTemplate(TEMPLATE_VIEW_NAME);

        });


        it('test a pseudoTheme', function() {
            testForSpecificTheme('pseudoTheme');
        });

        it('test for specific theme', function() {
            for( var view in ALL_M_VIEWS ) {
                testForSpecificTheme(ALL_M_VIEWS[view]);
            }
        });

        it('test for specific theme with own template', function() {
            for( var view in ALL_M_VIEWS ) {
                testForSpecificThemeWithOwnTemplate(ALL_M_VIEWS[view]);
            }
        });

        after(function() {
            delete M.TemplateManager[TEMPLATE_VIEW_NAME];
            assert.isUndefined(M.TemplateManager[TEMPLATE_VIEW_NAME]);
        });

    });


});

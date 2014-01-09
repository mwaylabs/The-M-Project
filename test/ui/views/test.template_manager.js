describe('M.TemplateManager', function() {

    var uiTemplates = ['default'];
    var TEST_TEMPLATE = '<div></div>';
    var TEMPLATE_VIEW_NAME = 'templateForTestPurposes.ejs';
    var ALL_M_VIEWS = [
        'View',
        'TextfieldView',
        'SearchfieldView',
        'TextareaView',
        'ListItemView',
        'ButtonView',
        'ListView',
        'SliderView',
        'DialogView',
        'ToggleView',
        'ImageView',
        'ToolbarView',
        'SelectView',
        'ButtonGroupView',
        'RadiolistView',
        'CheckboxlistView',
        'ToggleSwitchView',
        'ModalView',
        'TextView',
        'DebugView',
        'MovableView',
        'MenuView'
    ];

    var convertFilename = function( filename ) {
        if( filename != 'View' ) {
            filename = filename.slice(0, filename.lastIndexOf('View'));
        }
        return filename.toLowerCase() + '.ejs';
    }


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

        for( var theme in M.Templates ) {

            for( var template in M.Templates[theme] ) {
                var viewTemplate = M.TemplateManager.get(template, theme);
                assert.isString(viewTemplate);
                assert.isTrue(viewTemplate.indexOf('<') === 0);
            }
        }

    });

    it('defaultTheme is defined for every view', function() {
        _.each(ALL_M_VIEWS, function( item ) {
            var filename = convertFilename(item)
            var instanceTemplate = M[item].create()._templateString;
            assert.equal(instanceTemplate, M.TemplateManager.get(filename), filename);
        });
    });

    describe('Get Function', function() {

        var testForSpecificTheme = function( theme ) {
            M.Templates[theme] = {};
            M.Templates[theme][TEMPLATE_VIEW_NAME] = TEST_TEMPLATE;

            M.TemplateManager._currentUI = 'default';
            assert.isNull(M.TemplateManager.get(TEMPLATE_VIEW_NAME));
            assert.isDefined(M.TemplateManager.get(TEMPLATE_VIEW_NAME, theme));
            M.TemplateManager._currentUI = theme;
            assert.isDefined(M.TemplateManager.get(TEMPLATE_VIEW_NAME));
        };

        var testForSpecificThemeWithOwnTemplate = function( theme ) {
            M.TemplateManager._currentUI = theme
            M.Templates[theme] = {};
            M.Templates[theme][TEMPLATE_VIEW_NAME] = TEST_TEMPLATE;

            assert.isDefined(M.Templates[theme][TEMPLATE_VIEW_NAME]);
            assert.isTrue(M.TemplateManager.get(TEMPLATE_VIEW_NAME) === TEST_TEMPLATE);
            assert.isTrue(M.TemplateManager.get(TEMPLATE_VIEW_NAME, theme) === TEST_TEMPLATE);
        }

        it('test a pseudoTheme', function() {
            testForSpecificTheme('pseudoTheme');
        });

        it('templates are accessable', function() {

            var testTemplate = function( view ) {
                for( var template in uiTemplates ) {
                    var viewTemplate = M.TemplateManager.get(view, uiTemplates[template]);
                    assert.equal(viewTemplate, TEST_TEMPLATE);
                }
            };

            M.Templates.default[TEMPLATE_VIEW_NAME] = TEST_TEMPLATE
            testTemplate(TEMPLATE_VIEW_NAME);
        });



        it('test for specific theme with own template', function() {
            for( var view in ALL_M_VIEWS ) {
               testForSpecificThemeWithOwnTemplate(convertFilename(ALL_M_VIEWS[view]));
            }
        });

        it('get a not defined template', function() {
           assert.isTrue(M.TemplateManager.get('IamNotDefined') === M.TemplateManager.get('View'));
        });

        after(function() {
            delete M.TemplateManager[TEMPLATE_VIEW_NAME];
            assert.isUndefined(M.TemplateManager[TEMPLATE_VIEW_NAME]);
        });

    });
});

//TODO DO THIS NICE
(function() {

    M.TemplateManager = M.Object.extend({

        containerTemplates: {
            default: '<div><div data-binding="value" contenteditable="true"><%= value %></div><div data-child-view="main"></div>'
        },

        buttonTemplates: {
            default: '<div>Button: <div data-binding="value"<% if(value) {  } %>><%= value %></div></div>',
            topcoat: '<button class="topcoat-button--large" ><%= value %></button>',
            bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star"></span><%= value %></button>',
            jqm: '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><%= value %></span></span></a>'
        },

        toolbarTemplates: {
            default: '<div><div data-child-view="left"></div> <div class="center" data-binding="value"><%= value %></div> <div data-child-view="right"></div></div>',
            bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= value %></h1><div data-child-view="right"></div></div>',
            jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= value %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
        },

        currentTemplate: 'jqm',

        get: function( template ) {
            if( this[template] ) {
                var tpl = this[template][this.currentTemplate];
                if( !tpl ) {
                    return this[template]['default'];
                } else {
                    return tpl;
                }
            }
        }
    });


    M.Button = M.View.extend({

        _type: 'M.Button',

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        },

        afterRender: function(){
            this.el
            M.View.prototype.afterRender.apply(this, arguments);
        },

        contenteditable: true,

        template: _.template(M.TemplateManager.get('buttonTemplates'))

    });

    M.Toolbar = M.View.extend({

        _type: 'M.Toolbar',

        template: _.template(M.TemplateManager.get('toolbarTemplates'))

    });

    M.ContainerView = M.View.extend({

        _type: 'M.ContainerView',

        template: _.template(M.TemplateManager.get('containerTemplates'))

    });


    M.Fragment = M.View.extend({

        _type: 'M.Fragment',

        onPageSwitch: function(){

        },

        initialLoad: function(){

        }

    });

})();
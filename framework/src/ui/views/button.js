//TODO DO THIS NICE
(function() {

    var templates = {
        default: '<div>Button: <div class="<%= contenteditable %>" <% if(contenteditable) {  } %>><%= value %></div></div>',
        topcoat: '<button class="topcoat-button--large" ><%= value %></button>',
        bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star"></span><%= value %></button>',
        jqm: '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><%= value %></span></span></a>'
    };

    var toolbarTemplates = {
        default: '<div id="<%= value %>"><div data-child-view="left"></div> <div class="center"><%= value %></div> <div data-child-view="right"></div></div>'
    };

    M.TemplateManager = M.Object.extend({

        containerTemplates: {
            default: '<div id="<%= value %>"><div data-child-view="main"></div><div><%= value %></div></div>'
        },

        currentTemplate: 'default',

        get: function( template ) {
            if( this[template] ) {
                return this[template][this.currentTemplate];
            }
        }
    });


    M.Button = M.View.extend({

        _type: 'M.Button',

        initialize: function() {
            M.View.prototype.initialize.apply(this, arguments);
        },

        contenteditable: true,

        template: _.tpl(templates[uiframework])

    });

    M.Toolbar = M.View.extend({

        _type: 'M.Toolbar',

        template: _.tpl(toolbarTemplates['default'])


    });

    M.ContainerView = M.View.extend({

        _type: 'M.ContainerView',

        template: _.tpl(M.TemplateManager.get('containerTemplates'))

    });

})();
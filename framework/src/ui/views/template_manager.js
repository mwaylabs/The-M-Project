M.TemplateManager = M.Object.extend({

    containerTemplates: {
        defaultTemplate: '<div><div data-binding="value" contenteditable="true"><%= value %></div><div data-child-view="main"></div>'
    },

    buttonTemplates: {
        defaultTemplate: '<div>Button: <div data-binding="value"<% if(value) {  } %>><%= value %></div></div>',
        topcoat: '<button class="topcoat-button--large" data-binding="value"><%= value %></button>',
        bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star" data-binding="value"></span><%= value %></button>',
        jqm: '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="value"><%= value %></span></span></a>'
    },

    toolbarTemplates: {
        defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="value"><%= value %></div> <div data-child-view="right"></div></div>',
        bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= value %></h1><div data-child-view="right"></div></div>',
        topcoat: '<div><h2><%= value %></h2><div data-childviews="right"></div></div>',
        jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= value %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
    },

    imageTemplates: {
        defaultTemplate: '<div><%= value %></div>',
        bootstrap: '<div><%= value %></div>',
        topcoat: '<div><%= value %></div>',
        jqm: '<div><%= value %></div>'
    },

    textfieldTemplates: {
        defaultTemplate: '<div><%= value %></div>',
        bootstrap: '<div><%= value %></div>',
        topcoat: '<div><%= value %></div>',
        jqm: '<div><%= value %></div>'
    },

    listTemplates: {
        defaultTemplate: '<div data-childviews="list"></div>',
        bootstrap: '<div data-childviews="list"></div>',
        topcoat: '<div data-childviews="list"></div>',
        jqm: '<div data-childviews="list"></div>'
    },

    modelTemplates: {
        defaultTemplate: '<ul><%= value %></ul>',
        bootstrap: '<div><%= value %></div>',
        topcoat: '<div><%= value %></div>',
        jqm: '<div><%= value %></div>'
    },

    labelTemplates: {
        defaultTemplate: '<div contenteditable="true"><%= value %></div>',
        bootstrap: '<div contenteditable="true"><%= value %></div>',
        topcoat: '<div contenteditable="true"><%= value %></div>',
        jqm: '<div contenteditable="true"><%= value %></div>'
    },

    currentTemplate: 'topcoat',

    get: function( template ) {
        if( this[template] ) {
            var tpl = this[template][M.TemplateManager.currentTemplate];
            if( !tpl ) {
                return this[template]['defaultTemplate'];
            } else {
                return tpl;
            }
        }
    }
});
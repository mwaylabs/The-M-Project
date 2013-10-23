M.TemplateManager = M.Object.extend({

    "M.View": {
        defaultTemplate: '<div><%= _value_ %></div>'
    },

    "M.ButtonView": {
        defaultTemplate: '<div>Button: <div data-binding="_value_"<% if(_value_) {  } %>><%= _value_ %></div></div>',
        topcoat: '<button class="topcoat-button--large" data-binding="_value_"><%= _value_ %></button>',
        bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star"></span><%= _value_ %></button>',
        jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="_value_"><%= _value_ %></span></span></a>'
    },

    "M.ToolbarView": {
        defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="_value_"><%= _value_ %></div> <div data-child-view="right"></div></div>',
        bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= _value_ %></h1><div data-child-view="right"></div></div>',
        topcoat: '<div><h2><%= _value_ %></h2><div data-childview="right"></div></div>',
        jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= _value_ %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
    },

    "M.ImageView": {
        defaultTemplate: '<div><%= _value_ %></div>',
        bootstrap: '<div><%= _value_ %></div>',
        topcoat: '<div><%= _value_ %></div>',
        jqm: '<div><%= _value_ %></div>'
    },

    //TODO implement label for=""
    "M.TextfieldView": {
        defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><input type="text" value="<%= _value_ %>"><% if(label) {  %></label><% } %></div>',
        bootstrap: '<div><% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" value="<%= _value_ %>"></div>',
        topcoat: '<input value="<%= _value_ %>"/>',
        jqm: '<input value="<%= _value_ %>" />'
    },

    "M.ListView": {
        defaultTemplate: '<div data-childviews="list"></div>',
        bootstrap: '<ul class="list-group" data-childviews="list"></ul>',
        topcoat: '<div data-childviews="list"></div>',
        jqm: '<div data-childviews="list"></div>'
    },

    "M.ListItemView": {
        defaultTemplate: '<div data-childviews="list"><%= _value_ %></div>',
        bootstrap: '<li class="list-group-item"><%= _value_ %></li>',
        topcoat: '<div data-childviews="list"><%= _value_ %></div>',
        jqm: '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-first-child ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a class="ui-link-inherit"><%= _value_ %></a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>'
    },

    "M.ModelView": {
        defaultTemplate: '<ul><%= _value_ %></ul>',
        bootstrap: '<div><%= _value_ %></div>',
        topcoat: '<div><%= _value_ %></div>',
        jqm: '<div><%= _value_ %></div>'
    },

    "M.LabelView": {
        defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
        bootstrap: '<div contenteditable="true"><%= _value_ %></div>',
        topcoat: '<div contenteditable="true"><%= _value_ %></div>',
        jqm: '<div contenteditable="true"><%= _value_ %></div>'
    },

    "M.SearchfieldView": {
        defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
        bootstrap: '<div contenteditable="true"><%= _value_ %></div>',
        topcoat: '<div contenteditable="true"><%= _value_ %></div>',
        jqm: '<div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c ui-focus"><input type="text" data-type="search" name="password" id="search" _value_="" placeholder="<%= placeholder %>" class="ui-input-text ui-body-c"><%= _value_ %><a class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
    },

    "M.AccordionView": {
        defaultTemplate: '<ul><%= _value_ %></ul>',
        bootstrap: '<div><%= _value_ %></div>',
        topcoat: '<div><%= _value_ %></div>',
        jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
    },

    "M.AccordionItemView": {
        defaultTemplate: '<ul><%= _value_ %></ul>',
        bootstrap: '<div><%= _value_ %></div>',
        topcoat: '<div><%= _value_ %></div>',
        jqm: '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" class="ui-collapsible-set ui-corner-all" data-childviews="list"></div>'
    },

    _currentUI: 'bootstrap',

    get: function( template ) {

        if( this[template] ) {
            //use TMP.TemplateManager._currentUI because this function is called in another this context
            var tpl = this[template][M.TemplateManager._currentUI];
            if( !tpl ) {
                return this[template]['defaultTemplate'];
            } else {
                return tpl;
            }
        }
    }
});
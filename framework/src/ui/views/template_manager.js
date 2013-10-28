M.TemplateManager = M.Object.extend({

    "M.View": {
        defaultTemplate: '<div><%= _value_ %></div>'
    },

    "M.ButtonView": {
        defaultTemplate: '<div>Button: <div data-binding="_value_"<% if(_value_) {  } %>><%= _value_ %></div></div>',
        topcoat: '<button class="topcoat-button--large" data-binding="_value_"><%= _value_ %></button>',
        bootstrap: '<button type="button" class="btn btn-lg"><%= _value_ %></button>',
        jqm: '<a data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text" data-binding="_value_"><%= _value_ %></span></span></a>'
    },

    "M.ToolbarView": {
        defaultTemplate: '<div>AAA<div data-child-view="left"></div> <div class="center" data-binding="_value_"><%= _value_ %></div> <div data-child-view="right"></div></div>',
        bootstrap: '<div class="page-header"><div data-child-view="left"></div><h1><%= _value_ %></h1><div data-child-view="right"></div></div>',
        topcoat: '<div><h2><%= _value_ %></h2><div data-childview="right"></div></div>',
        jqm: '<div data-role="header" class="ui-header ui-bar-a" role="banner"><div data-child-view="left" class="ui-btn-left"></div><h1 class="ui-title" role="heading" aria-level="1"><%= _value_ %></h1><div data-child-view="right" class="ui-btn-right"></div></div>'
    },


    //TODO implement label for=""
    "M.TextfieldView": {
        defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><input type="text" value="<%= _value_ %>"><% if(label) {  %></label><% } %></div>',
        bootstrap: '<div><% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" value="<%= _value_ %>"></div>',
        topcoat: '<input value="<%= _value_ %>"/>',
        jqm: '<% if(label) {  %><label for="text-1" class="ui-input-text"><%= label %></label><% } %><div class="ui-input-text ui-shadow-inset ui-corner-all ui-btn-shadow ui-body-c"><input type="text" name="text-1" id="text-1" value="" class="ui-input-text ui-body-c"></div>'
    },

    "M.SearchfieldView": {
        defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>',
        bootstrap: '<div><% if(label) {  %><label><%= label %></label><% } %><input type="text" class="form-control" placeholder="<%= placeholder %>"></div>',
        topcoat: '<div contenteditable="true"><%= _value_ %></div>',
        jqm: '<% if(label) {  %><label for="text-1" class="ui-input-text"><%= label %></label><% } %><div class="ui-input-search ui-shadow-inset ui-btn-corner-all ui-btn-shadow ui-icon-searchfield ui-body-c"><input type="text" data-type="search" name="search-1" id="search-1" value="" class="ui-input-text ui-body-c"><a href="#" class="ui-input-clear ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize ui-btn-icon-notext ui-input-clear-hidden" title="clear text" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="delete" data-iconpos="notext" data-theme="c" data-mini="false"><span class="ui-btn-inner"><span class="ui-btn-text">clear text</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></div>'
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

    "M.SliderView": {
        defaultTemplate: '<input type="range">',
        bootstrap: '<input type="range">',
        topcoat: '<input type="range">',
        jqm: '<div class="ui-slider"><input type="number" data-type="range" name="slider-1" id="slider-1" min="0" max="100" value="50" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-slider-input"><div role="application" class="ui-slider-track ui-btn-down-c ui-btn-corner-all"><a href="#" class="ui-slider-handle ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="74" aria-valuetext="74" title="74" aria-labelledby="slider-1-label" style="left: 74%;"><span class="ui-btn-inner"><span class="ui-btn-text"></span></span></a></div></div>'
    },

    "M.ToggleView": {
        defaultTemplate: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>',
        bootstrap: '<div><div data-childviews="first">first</div><div data-childviews="second">second</div></div>',
        topcoat: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>',
        jqm: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>'
    },

    "M.ImageView": {
        defaultTemplate: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
        bootstrap: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
        topcoat: '<img src="<%= _value_ %>" alt="<%= alt %>" />',
        jqm: '<img src="<%= _value_ %>" alt="<%= alt %>" />'
    },

    "M.LoaderView": {
        defaultTemplate: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
        bootstrap: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
        topcoat: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>',
        jqm: '<div class="ui-loader ui-corner-all ui-body-d ui-loader-default"><span class="ui-icon ui-icon-loading"></span><h1>loading</h1></div>'
    },

    "M.DialogView": {
        defaultTemplate: '<div></div>',
        bootstrap: '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button> <h4 class="modal-title" id="myModalLabel"><%= header %></h4> </div> <div class="modal-body"><%= message %></div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal"><%= cancel %></button> <button type="button" class="btn btn-primary"><%= ok %></button> </div> </div><!-- /.modal-content --> </div>',
        topcoat: '<input type="range">',
        jqm: '<div role="dialog" class="ui-dialog-contain ui-overlay-shadow ui-corner-all">'+
        		'<div data-role="header" data-theme="d" class="ui-header ui-bar-d" role="banner"><a href="#" class="ui-btn-left ui-btn ui-btn-up-d ui-shadow ui-btn-corner-all ui-btn-icon-notext" data-icon="delete" data-iconpos="notext" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="d" title="Close"><span class="ui-btn-inner"><span class="ui-btn-text"><%= close %></span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>'+
        			'<h1 class="ui-title" role="heading" aria-level="1"><%= header %></h1>'+
        		'</div>'+
        		'<div data-role="content" class="ui-content ui-body-c" role="main">'+
        			'<p><%= message %></p>'+
        			'<a href="dialog/index.html" data-role="button" data-rel="back" data-theme="b" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b"><span class="ui-btn-inner"><span class="ui-btn-text"><%= ok %></span></span></a>'+
        			'<a href="dialog/index.html" data-role="button" data-rel="back" data-theme="c" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><%= cancel %></span></span></a>'+
        		'</div>'+
        	  '</div>'
    },


    _currentUI: (typeof m_config !== 'undefined' && typeof m_config.ui !== 'undefined') ? m_config.ui : 'bootstrap',

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

// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * The M.TemplateManager is a singleton instance which
 * contain all our templates for the framework views.
 * You can retrieves a template with the get() method.
 *
 * @module M.TemplateManager
 *
 * @type {*}
 * @extends M.Object
 * @example
 *
 * var tpl = M.TemplateManager.get('M.ListView');
 * console.log( tpl ); // <ul data-childviews="list"></ul>
 *
 */
M.TemplateManager = M.Object.design({

    'M.View': {
        defaultTemplate: '<div><%= _value_ %></div>'
    },

    'M.TextView': {
        defaultTemplate: '<div><% if(label) {  %><div class="label"><%= label %></div><% } %><div><% if(icon) {  %><div class="input-icon-addon"><i class="fa <%= icon %> fa-fw"></i><% } %><%= _value_ %></div>'
    },

    'M.ButtonView': {
        defaultTemplate: '<div class="button"><% if(icon) { %> <i class="fa <%= icon %>"></i> <% } %> <div data-binding="_value_"<% if(_value_) {  } %>><%= _value_ %></div></div>'
    },

    'M.ToolbarView': {
        defaultTemplate: '<div><div data-childviews="first"></div> <div class="center" data-binding="_value_"><%= _value_ %></div> <div data-childviews="second"></div></div>'
    },

    //TODO implement label for=""
    'M.TextfieldView': {
        defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><div class="<% if(icon) {  %> input-icon-addon<% } %>"><% if(icon) {  %><i class="fa <%= icon %> fa-fw"></i><% } %><input type="<%= type %>" <% if(placeholder) { %> placeholder="<%= placeholder %>"<% } %> value="<%= _value_ %>"></div><% if(label) {  %></label><% } %></div>'
    },
    'M.TextareaView': {
        defaultTemplate: '<div><% if(label) {  %><label><%= label %><% } %><textarea><%= _value_ %></textarea><% if(label) {  %></label><% } %></div>'
    },

    'M.ButtonGroupView': {
        defaultTemplate: '<div class="clearfix" data-childviews="buttons"></div>'
    },

    'M.SearchfieldView': {
        defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>'
    },

    'M.ListView': {
        defaultTemplate: '<ul data-childviews="list"></ul>'
    },

    'M.ListItemView': {
        defaultTemplate: '<li><%= _value_ %></li>'
    },

    'M.ListItemViewLinked': {
        defaultTemplate: '<li><span><%= _value_ %></span><i class="fa <%= icon %>"></i></li>'
    },

    'M.ModelView': {
        defaultTemplate: '<ul><%= _value_ %></ul>'
    },

    'M.LabelView': {
        defaultTemplate: '<div contenteditable="true"><%= _value_ %></div>'
    },

    'M.DebugView': {
        defaultTemplate: '<div><div data-childviews="debug-menu"></div><div data-childviews="debug-grid"></div></div>'
    },

    'M.AccordionView': {
        defaultTemplate: '<ul><%= _value_ %></ul>'
    },

    'M.AccordionItemView': {
        defaultTemplate: '<ul><%= _value_ %></ul>'
    },

    'M.SliderView': {
        defaultTemplate: '<input type="range">'
    },

    'M.ToggleView': {
        defaultTemplate: '<div><div data-childviews="first"></div><div data-childviews="second"></div></div>'
    },

    'M.ImageView': {
        defaultTemplate: '<img src="<%= _value_ %>" alt="<%= alt %>" />'
    },

    'M.LoaderView': {
        defaultTemplate: '<div class="m-view m-overlayview m-loaderview m-loaderview-show" style="display: block;"> <div class="m-view m-overlayview-inner m-loaderview-inner"> <div class="m-view m-labelview m-loaderview-inner-message"></div> <div class="m-view m-loaderview-inner-icon m-loaderview-inner-icon-only"> <div class="m-view m-loaderview-inner-icon-1"></div> <div class="m-view m-loaderview-inner-icon-2"></div> <div class="m-view m-loaderview-inner-icon-3"></div> <div class="m-view m-loaderview-inner-icon-4"></div> <div class="m-view m-loaderview-inner-icon-5"></div> <div class="m-view m-loaderview-inner-icon-6"></div> <div class="m-view m-loaderview-inner-icon-7"></div> <div class="m-view m-loaderview-inner-icon-8"></div> </div> </div> </div>'
    },

    'M.DialogView': {
        defaultTemplate: '<div></div>'
    },

    'M.SelectView': {
        defaultTemplate: '<div class="selection-list<% if(isMultiple){ %> multiple<% } %>"><select<% if(isMultiple){ %> multiple<% } %>><%= _value_ %></select></div>'
    },

    'M.RadiolistView': {
        defaultTemplate: '<div><%= label %><div data-childviews="radio-options"></div></div>'
    },

    'M.RadioOptionView': {
        defaultTemplate: '<label><input type="radio" name="<%= name %>" value="<%= _value_ %>"><i class="needsclick fa"></i><%= label %></label>'
    },

    'M.CheckboxlistView': {
        defaultTemplate: '<div><%= label %><div data-childviews="checkbox-options"></div></div>'
    },

    'M.CheckboxOptionView': {
        defaultTemplate: '<label><input type="checkbox" name="<%= name %>" value="<%= _value_ %>"><i class="needsclick fa"></i> <%= label %></label>'
    },

    'M.ToggleSwitchView': {
        defaultTemplate: '<div><label><% if(label){%> <span class="needsclick label-descr"> <%= label %> <% }%> </span> <div class="toggleswitch"><input value="<%= _value_ %>" type="checkbox"><span class="switch-labels needsclick" data-onLabel="<%= onLabel %>" data-offLabel="<%= offLabel %>">switchlabel<span class="switch-handle"></span></span></div></label></div>'
    },

    'M.ModalView': {
        defaultTemplate: '<div data-childviews="content"><div>'
    },

    'M.MovableView': {
        defaultTemplate: '<div class="movable-element"><%= _value_ %></div>'
    },

    'M.MenuView': {
        defaultTemplate: '<div class="movable-backdrop fade"></div><div class="movable-container"><span><%= _value_ %></span><div class="menu-content" data-childviews="menu-content"></div></div>'
    },

    _currentUI: 'defaultTemplate',

    /**
     * Returns the template with the given name or
     * the default template for M.View if there is no such template.
     *
     * @param {String} name
     * @returns {String}
     */
    get: function( template, ui ) {

        ui = ui || M.TemplateManager._currentUI;

        if( !this[template] ) {
            template = 'M.View';
        }

        if( this[template] ) {
            //use TMP.TemplateManager._currentUI because this function is called in another this context
            var tpl = this[template][ui];
            if( !tpl ) {
                return this[template].defaultTemplate;
            } else {
                return tpl;
            }
        }
    }
});

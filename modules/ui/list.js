// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      03.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../core/foundation/view.js');

/**
 * @class
 *
 * The root object for ListViews.
 *
 */
M.ListView = M.View.extend({

    type: 'M.ListView',

    removeItemsOnUpdate: YES,

    render: function() {
        var listTagName = this.isNumberedList ? 'ol' : 'ul';
        var html = '<' + listTagName + ' id="' + this.id + '" data-role="listview"></' + listTagName + '>';
        document.write(html);
    },

    items: null,

    inEditMode: NO,

    editOptions: null,

    /**
     * Defines if the ListView is rendered with prefixed numbering for each item.
     *
     * @property {Boolean}
     */
    isNumberedList: NO,

    renderChildViews: function() {

    },

    addItem: function(item) {
        $('#' + this.id).append(item);
    },

    removeItem: function(id) {

    },

    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    renderUpdate: function() {

        /* Remove all list items if the removeItemsOnUpdate property is set to YES */
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }

        /* Save this in variable that for later use within an other scope (e.g. _each()) */
        that = this;

        /* Get the list view's content as an object from the assigned content binding */
        var content = eval(this.contentBinding);

        /* Get the list view's template view for each list item */
        templateView = this.listItemTemplateView;
        
        /* If there is an items property, re-assign this to content, otherwise iterate through content itself */ 
        if(this.items) {
            content = content[this.items];
        }
        _.each(content, function(item) {

            /* Create a new object for the current template view */
            var obj = templateView.design({});

            /* Get the child views as an array of strings */
            var childViewsArray = obj.childViews.split(' ');

            /* If the item is a model, read the values from the 'record' property instead */
            var record = item.type === 'M.Model' ? item.record : item;

            /* Iterate through all views defined in the template view */
            for(var i in childViewsArray) {

                /* Create a new object for the current view */
                obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});

                /* Set renderToDOM to NO, since we push the HTML directly to the addItem method later on */
                obj[childViewsArray[i]].renderToDOM = NO;

                /* This regex looks for a variable inside the template view (<%= ... %>) ... */
                var regexResult = /^<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].value);

                /* ... if a match was found, the variable is replaced by the corresponding value inside the record */
                if(regexResult) {
                    switch (obj[childViewsArray[i]].type) {
                        case 'M.LabelView':
                        case 'M.ButtonView':
                        case 'M.ImageView':
                            obj[childViewsArray[i]].value = record[regexResult[1]];
                            break;
                    }
                }
            }

            /* If edit mode is on, render a delete button */
            if(that.inEditMode) {
                obj.inEditMode = that.inEditMode;
                obj.deleteButton = obj.deleteButton.design({
                    modelId: item.id,
                    target: that.editOptions.target,
                    action: that.editOptions.action
                });
            }

            /* Add the current list view item to the list view ... */
            that.addItem(obj.render());

            /* ... once it is in the DOM, make it look nice */
            for(var i in childViewsArray) {
                obj[childViewsArray[i]].applyTheme();
            }
        });

        /* Finally let the whole list look nice */
        this.applyTheme();
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the button.
     */
    applyTheme: function() {
        $('#' + this.id).listview('refresh');
    },

    /**
     * This method activates the edit mode and forces the list view to re-render itself
     * and to display a remove button for every list view item.
     *
     * @param {Object} options The options for the remove button.
     */
    toggleRemove: function(options) {
        if(eval(this.contentBinding)) {
            this.inEditMode = !this.inEditMode;

            if(options.disableOnEdit) {
                var views = $.trim(options.disableOnEdit).split(' ');
                _.each(views, function(view) {
                    var view = eval(view);
                    view.isEnabled = !view.isEnabled;
                    view.renderUpdate();
                });
            }

            this.editOptions = options;
            this.renderUpdate();
        }
    }

});
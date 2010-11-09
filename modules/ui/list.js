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
        var html = '<ul id="' + this.id + '" data-role="listview"></ul>';
        document.write(html);
    },

    items: null,

    inEditMode: NO,

    editOptions: null,

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
        if(this.removeItemsOnUpdate) {
            this.removeAllItems();
        }
        that = this;    
        var content = eval(this.contentBinding);
        templateView = this.listItemTemplateView;
        /* If there is an items property, re-assign this to content.
           Otherwise just iterate through content itself */ 
        if(this.items) {
            content = content[this.items];
        }
        _.each(content, function(item) {
            var obj = templateView.design({});
            var childViewsArray = obj.childViews[0].split(' ');
            for(var i in childViewsArray) {
                obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});
                obj[childViewsArray[i]].renderToDOM = NO;
                var regexResult = /^<%=\s+([.|_|-|$|¤|a-zA-Z]+[0-9]*[.|_|-|$|¤|a-zA-Z]*)\s*%>$/.exec(obj[childViewsArray[i]].value);
                if(regexResult) {
                    switch (obj[childViewsArray[i]].type) {
                        case 'M.LabelView':
                        case 'M.ButtonView':
                        case 'M.ImageView':
                            obj[childViewsArray[i]].value = item[regexResult[1]];
                            break;
                    }
                }
            }
            if(that.inEditMode) {
                obj.inEditMode = that.inEditMode;
                obj.deleteButton = obj.deleteButton.design({
                    modelId: item.id,
                    target: that.editOptions.target,
                    action: that.editOptions.action
                });
            }
            that.addItem(obj.render());
            for(var i in childViewsArray) {
                obj[childViewsArray[i]].applyTheme();
            }
        });
        this.applyTheme();
    },

    /**
     * Triggers rendering engine, e.g. jQuery mobile, to style the button.
     */
    applyTheme: function() {
        $('#' + this.id).listview('refresh');
    },

    /**
     *
     */
    toggleRemove: function(options) {
        if(eval(this.contentBinding)) {
            this.inEditMode = !this.inEditMode;

            if(options.disableOnEdit[0]) {
                var views = options.disableOnEdit[0].split(' ');
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
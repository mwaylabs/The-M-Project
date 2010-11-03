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

    render: function() {
        var html = '<ul id="' + this.id + '" data-role="listview"></ul>';
        document.write(html);
    },

    renderChildViews: function() {

    },

    addItem: function(item) {
        $('#' + that.id).append(item);
    },

    removeItem: function(id) {

    },

    removeAllItems: function() {
        $('#' + this.id).empty();
    },

    renderUpdate: function() {
        that = this;
        var content = eval(this.contentBinding);
        templateView = eval(that.templateView);
        _.each(content[templateView.items], function(item) {
            var obj = templateView.design({});
            var childViewsArray = obj.childViews[0].split(' ');
            for(var i in childViewsArray) {
                obj[childViewsArray[i]] = obj[childViewsArray[i]].design({});
                obj[childViewsArray[i]].renderToDOM = NO;
                var regexResult = /^<%=\s*(\w*[_|.|-]*\w*)+\s*%>$/.exec(obj[childViewsArray[i]].value);
                if(regexResult) {
                    switch (obj[childViewsArray[i]].type) {
                        case 'M.LabelView':
                            obj[childViewsArray[i]].value = eval('item.' + regexResult[1]);
                            break;
                        case 'M.ButtonView':
                            obj[childViewsArray[i]].value = eval('item.' + regexResult[1]);
                            break;
                    }
                }
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
    }

});
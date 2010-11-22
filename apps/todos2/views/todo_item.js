// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos.TodoItemView = M.ListItemView.design({

    target: Todos.TodoController,

    action: 'showDetails',

    childViews: 'title text date',

    title : M.LabelView.design({
        valuePattern: '<%= title %>'
    }),

    text : M.LabelView.design({
        valuePattern: '<%= text %>',
        cssClass: 'listText'
    }),

    date : M.LabelView.design({
        computedValue: {
            valuePattern: '<%= date %>',
            operation: function(v, label) {
                return 'Due Date: ' + M.Date.format(M.Date.create(v), 'mm/dd/yyyy HH:MM');
            }
        },
        cssClass: 'listDate'
    })    

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Todos.TodoController = M.Controller.extend({

    todos: null,

    counter: 0,

    init: function() {
        Todos.Task.find();
        this.set('todos', Todos.Task.records);
        this.calculateCounter();
    },

    addTodo: function() {
        var text = M.ViewManager.getView('page', 'inputField').value;
        if(!text) {
            return;
        }

        Todos.Task.createRecord( { title: text } ).save();
        this.set('todos', Todos.Task.records);

        this.calculateCounter();

        M.ViewManager.getView('page', 'inputField').setValue('');
    },

    removeTodo: function(domId, modelId) {
        var doDelete = confirm('Do you really want to delete this item?');
        if(doDelete) {
            var record = Todos.Task.recordManager.getRecordForId(modelId);
            record.del();
            this.set('todos', Todos.Task.records);
            this.calculateCounter();
        }
    },

    calculateCounter: function() {
        this.set('counter', this.todos.length);
    },

    edit: function() {
        M.ViewManager.getView('page', 'todoList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});
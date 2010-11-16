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

    notes: M.ModelManager.extend({
        model: Todos.Note
    }),

    todos: null,

    counter: 0,

    init: function() {
        this.notes.modelList = Todos.Note.findAll();
        this.set('todos', this.notes.modelList);
        this.calculateCounter();
    },

    addTodo: function() {
        var text = Todos.app.page.content.inputField.value;
        if(!text) {
            return;
        }

        var note = Todos.Note.newRecord( { text: text } );
        this.notes.add(note);
        note.save();
        this.set('todos', this.notes.modelList);

        this.calculateCounter();

        Todos.app.page.content.inputField.setValue('');
    },

    removeTodo: function(domId, modelId) {
        var doDelete = confirm('Do you really want to delete this item?');
        if(doDelete) {
            this.notes.del(modelId);
            this.notes.remove(modelId);
            this.set('todos', this.notes.modelList);
            this.calculateCounter();
        }
    },

    calculateCounter: function() {
        this.set('counter', this.todos.length);
    },

    edit: function() {
        Todos.app.page.content.todoList.toggleRemove({
            target: this,
            action: 'removeTodo',
            disableOnEdit: 'Todos.app.page.content.inputField'
        });
    }

});
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

    init: function(isFirst) {
        if(isFirst) {
            this.notes.find();
            this.set('todos', this.notes.modelList);
            this.calculateCounter();
        }
    },

    addTodo: function() {
        var title = Todos.app.page2.content.title.value;
        var text = Todos.app.page2.content.text.value;
        var date = null;
        if(typeof(Todos.app.page2.content.date.value) === 'number') {
            date = M.Date.daysFromNow(Todos.app.page2.content.date.value).getTime();
        }
        if(!title || !text || !date) {
            return;
        }

        var note = Todos.Note.newRecord( { title: title, text: text, date: date } );
        this.notes.add(note);
        note.save();
        this.set('todos', this.notes.modelList);

        this.calculateCounter();

        Todos.app.page2.content.title.setValue('');
        Todos.app.page2.content.text.setValue('');
        Todos.app.page2.content.date.setValue('');

        this.switchToPage(Todos.app.page1);
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
        Todos.app.page1.content.todoList.toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});
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

    notes: M.ModelManager.extend({}),

    todos: null,

    counter: 0,

    addTodo: function() {
        var text = Todos.app.page.content.grid.inputField.value;
        if(!text) {
            return;
        }

        var note = Todos.Note.create( { text: text } );
        this.notes.add(note);
        this.set('todos', this.notes.modelList);

        this.calculateCounter();

        Todos.app.page.content.grid.inputField.setValue('');
    },

    removeTodo: function(modelId) {
        this.notes.remove(modelId);
        this.set('todos', this.notes.modelList);
        this.calculateCounter();
    },

    calculateCounter: function() {
        this.set('counter', this.todos.length);
    }

});
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

    selId: null,

    selTitle: null,

    selText: null,

    selDate: null,

    counter: 0,

    init: function(isFirst) {
        if(isFirst) {
            this.notes.find();
            this.set('todos', this.notes.modelList);
        }
    },

    addTodo: function() {
        var title = Todos.app.page2.content.title.value;
        var text = Todos.app.page2.content.text.value;
        var date = null;
        if(Todos.app.page2.content.date.value) {
            date = M.Date.create(Todos.app.page2.content.date.value);
        }
        if(!title || !text || !date) {
            return;
        }

        var note = Todos.Note.createRecord( { title: title, text: text, date: date } );
        this.notes.add(note);
        note.save();
        this.set('todos', this.notes.modelList);

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
        }
    },

    remove: function() {
        this.removeTodo(null, this.selId);
        this.switchToPage(Todos.app.page1);        
    },

    showDetails: function(viewId, modelId) {
        var record = this.notes.getModelForId(modelId);
        this.selId = modelId;

        this.set('selTitle', record.record.title);
        this.set('selText', record.record.text);

        var date = M.Date.create(record.record.date);
        var dateFormat = M.Date.format(date, 'mm/dd/yyyy HH:MM:ss');
        var days = M.Math.round(M.Date.timeBetween(M.Date.now(), M.Date.create(record.record.date), M.DAYS));
        this.set('selDate', dateFormat + ' (in ' + days + ' day' + (days !== 1 ? 's' : '') + ')');
        this.switchToPage(Todos.app.subpage1);
    },

    edit: function() {
        Todos.app.page1.content.todoList.toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    },

    editItem: function() {
        Todos.app.subpage1.content.toggleView();
    },

    saveTodo: function() {
        var title = Todos.app.subpage1.content.content2.title.value;
        var text = Todos.app.subpage1.content.content2.text.value;
        var date = null;
        if(Todos.app.subpage1.content.content2.date.value) {
            date = M.Date.create(Todos.app.subpage1.content.content2.date.value);
        }
        if(!title || !text || !date) {
            return;
        }

        var note = this.notes.getModelForId(this.selId);
        note.record.title = title;
        note.record.text = text;
        note.record.date = date;
        note.save();
        this.set('todos', this.notes.modelList);

        this.set('selTitle', note.record.title);
        this.set('selText', note.record.text);
        var days = M.Date.format(M.Date.create(note.record.date), 'mm/dd/yyyy HH:MM:ss');
        this.set('selDate', days);

        Todos.app.page2.content.title.setValue('');
        Todos.app.page2.content.text.setValue('');
        Todos.app.page2.content.date.setValue('');

        Todos.app.subpage1.content.toggleView();
    }

});
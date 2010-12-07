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

    noteToDelete: null,

    init: function(isFirst) {
        if(isFirst) {
            var notes = Todos.Note.find();
            this.set('todos', notes);
        }

        if(M.ViewManager.getView('page1', 'todoList').inEditMode) {
            M.ViewManager.getView('page1', 'todoList').toggleRemove({
                target: this,
                action: 'removeTodo'
            });
            M.ViewManager.getView('page1', 'toggleView').toggleView();
        }
    },

    init2: function() {
        if(!M.ViewManager.getView('subpage1', 'toggleView').isInFirstState) {
            M.ViewManager.getView('subpage1', 'content').toggleView();
            M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        }
    },

    addTodo: function() {
        if(!M.ViewManager.getView('page2', 'form1').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('page2', 'form1').showErrors();
                return;
            }
        }

        var title = M.ViewManager.getView('page2', 'title').value;
        var text = M.ViewManager.getView('page2', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('page2', 'date').value);

        var note = Todos.Note.createRecord( { title: title, text: text, date: date } );
        this.notes.add(note);
        note.save();
        this.set('todos', this.notes.modelList);

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        this.switchToPage(M.ViewManager.getPage('page1'));
    },

    removeTodo: function(domId, modelId) {
        this.noteToDelete = modelId;

        M.DialogView.confirm({
            title: 'Delete?',
            message: 'Do you really want to delete this item?',
            onOk: {
                target: this,
                action: 'doDelete'
            },
            onCancel: {
                target: this,
                action: 'cancelDelete'
            }
        });
    },

    doDelete: function() {
        if(this.noteToDelete) {
            this.notes.del(this.noteToDelete);
            this.notes.remove(this.noteToDelete);
            this.set('todos', this.notes.modelList);
            this.noteToDelete = null;
        }
    },

    doDeleteFromSubView: function() {
        if(this.noteToDelete) {
            this.notes.del(this.noteToDelete);
            this.notes.remove(this.noteToDelete);
            this.set('todos', this.notes.modelList);
            this.noteToDelete = null;

            M.ViewManager.getView('subpage1', 'toggleView').toggleView();
            M.ViewManager.getView('subpage1', 'content').toggleView();
            this.switchToPage(M.ViewManager.getPage('page1'));
        }
    },

    cancelDelete: function() {
        if(this.noteToDelete) {
            this.noteToDelete = null;
        }
    },

    remove: function() {
        this.noteToDelete = this.selId;

        M.DialogView.confirm({
            title: 'Delete?',
            message: 'Do you really want to delete this item?',
            onOk: {
                target: this,
                action: 'doDeleteFromSubView'
            },
            onCancel: {
                target: this,
                action: 'cancelDelete'
            }
        });
    },

    showDetails: function(viewId, modelId) {
        var record = this.notes.getModelForId(modelId);
        this.selId = modelId;

        this.set('selTitle', record.record.title);
        this.set('selText', record.record.text);

        var date = M.Date.create(record.record.date);
        var dateFormat = M.Date.format(date, M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.timeBetween(M.Date.now(), date, M.DAYS));
        this.set('selDateFormat', dateFormat + ' (' + days + ' ' + M.I18N.l('days') + ')');
        this.set('selDate', dateFormat);
        this.switchToPage(M.ViewManager.getPage('subpage1'));
    },

    edit: function() {
        M.ViewManager.getView('page1', 'todoList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    },

    editItem: function() {
        M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        M.ViewManager.getView('subpage1', 'content').toggleView();
    },

    saveTodo: function() {
        if(!M.ViewManager.getView('subpage1', 'form2').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('subpage1', 'form2').showErrors();
                return;
            }
        }

        var title = M.ViewManager.getView('subpage1', 'title').value;
        var text = M.ViewManager.getView('subpage1', 'text').value;
        var date = date = M.Date.create(M.ViewManager.getView('subpage1', 'date').value);
        
        var note = this.notes.getModelForId(this.selId);
        note.record.title = title;
        note.record.text = text;
        note.record.date = date;
        note.save();
        this.set('todos', this.notes.modelList);

        this.set('selTitle', note.record.title);
        this.set('selText', note.record.text);

        var date = M.Date.create(note.record.date);
        var dateFormat = M.Date.format(date, M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.timeBetween(M.Date.now(), date, M.DAYS));
        this.set('selDateFormat', dateFormat + ' (' + days + ' ' + M.I18N.l('days') + ')');
        this.set('selDate', dateFormat);

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        M.ViewManager.getView('subpage1', 'content').toggleView();
    }

});
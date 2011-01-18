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

    selId: null,

    selTitle: null,

    selText: null,

    selDate: null,

    counter: 0,

    noteToDelete: null,

    init: function(isFirst) {
        if(isFirst) {
            this.set('todos', Todos.Note.find());
        }

        if(M.ViewManager.getView('page1', 'todoList').inEditMode) {
            M.ViewManager.getView('page1', 'todoList').toggleRemove({
                target: this,
                action: 'removeTodo'
            });
            M.ViewManager.getView('page1', 'toggleView').toggleView();
        }
    },

    hide: function() {
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

        Todos.Note.createRecord( { title: title, text: text, date: date } ).save();
        this.set('todos', Todos.Note.records());

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        this.switchToTab(Todos.tabs.tabItem1);
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
            var record = Todos.Note.recordManager.getRecordForId(this.noteToDelete);
            record.del();
            this.set('todos', Todos.Note.records());
            this.noteToDelete = null;
        }
    },

    doDeleteFromSubView: function() {
        if(this.noteToDelete) {
            var record = Todos.Note.recordManager.getRecordForId(this.noteToDelete);
            record.del();
            this.set('todos', Todos.Note.records());
            this.noteToDelete = null;
            
            this.switchToPage(M.ViewManager.getPage('page1'), null, YES, YES);
            this.switchToPage(M.ViewManager.getPage('page1'), null, YES, YES);
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
        var record = Todos.Note.recordManager.getRecordForId(modelId);
        this.selId = modelId;

        this.set('selTitle', record.get('title'));
        this.set('selText', record.get('text'));

        var date = record.get('date');
        var dateFormat = date.format(M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.now().timeBetween(date, M.DAYS));
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
                this.set('selDate', this.selDate);
                this.set('selDateFormat', this.selDateFormat);
                this.set('selText', this.selText);
                this.set('selTitle', this.selTitle);
                return;
            }
        }

        var title = M.ViewManager.getView('subpage1', 'title').value;
        var text = M.ViewManager.getView('subpage1', 'text').value;
        var date = M.Date.create(M.ViewManager.getView('subpage1', 'date').value);
        
        var note = Todos.Note.recordManager.getRecordForId(this.selId);
        note.set('title', title);
        note.set('text', text);
        note.set('date', date);
        note.save();
        this.set('todos', Todos.Note.records());

        this.set('selTitle', note.get('title'));
        this.set('selText', note.get('text'));

        var date = note.get('date');
        var dateFormat = date.format(M.I18N.l('due_date_format'));
        var days = M.Math.round(M.Date.now().timeBetween(date, M.DAYS));
        this.set('selDateFormat', dateFormat + ' (' + days + ' ' + M.I18N.l('days') + ')');
        this.set('selDate', dateFormat);

        M.ViewManager.getView('page2', 'title').setValue('');
        M.ViewManager.getView('page2', 'text').setValue('');
        M.ViewManager.getView('page2', 'date').setValue('');

        M.ViewManager.getView('subpage1', 'toggleView').toggleView();
        M.ViewManager.getView('subpage1', 'content').toggleView();
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataWebSqlTaskAppController = M.Controller.extend({

    tasks: null,
    currentTask:null,

    init: function() {
        KitchenSink.TaskWebSql.find({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });

    },

    addTask: function() {

         if(!M.ViewManager.getView('dataWebSqlTaskApp', 'form').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('dataWebSqlTaskApp', 'form').showErrors();
                return;
            }
        }

        var text = M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').value

        task = KitchenSink.TaskWebSql.createRecord({
            text: M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').value
        });

        task.save({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });
        M.ViewManager.getView('dataWebSqlTaskApp', 'taskField').setValue('');
    },

    removeTodo: function(domId, modelId) {
        this.currentTask = KitchenSink.TaskWebSql.recordManager.getRecordForId(modelId);

        /*M.DialogView.confirm({
            title: 'Delete a Task',
            message: 'Do you really want to delete this item?',

            onOk: {
                target: this,
                action: 'deleteTodo'
            }
        });*/

        if(confirm("Do you really want to delete this item?")) {
            this.deleteTodo();
        }
    },

    deleteTodo: function() {
        this.currentTask.del({
            onSuccess: {
                target: this,
                action: 'setTasks'
            }
        });
    },

    setTasks: function() {
        this.set('tasks', KitchenSink.TaskWebSql.records());
    },

    edit: function() {
        M.ViewManager.getView('dataWebSqlTaskApp', 'taskList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});

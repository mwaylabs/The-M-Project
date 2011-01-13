// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.DataLocalStorageTaskAppController = M.Controller.extend({

    tasks: null,
    currentTask:null,

    init: function() {
        KitchenSink.Task.find();
        this.setTasks();
    },

    addTask: function() {

         if(!M.ViewManager.getView('dataLocalStorageTaskApp', 'form').validate()) {
            if(M.Validator.validationErrors) {
                M.ViewManager.getView('dataLocalStorageTaskApp', 'form').showErrors();
                return;
            }
        }

        var text = M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').value

        task = KitchenSink.Task.createRecord({
            text: M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').value
        });

        task.save();
        this.setTasks();
        M.ViewManager.getView('dataLocalStorageTaskApp', 'taskField').setValue('');
    },

    removeTodo: function(domId, modelId) {  
        this.currentTask = KitchenSink.Task.recordManager.getRecordForId(modelId);
        
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
        this.currentTask.del();
        this.setTasks();
    },

    setTasks: function() {
        this.set('tasks', KitchenSink.Task.records());
    },

    edit: function() {
        M.ViewManager.getView('dataLocalStorageTaskApp', 'taskList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});

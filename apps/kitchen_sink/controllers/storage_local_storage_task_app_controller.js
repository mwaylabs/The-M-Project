// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

KitchenSink.StorageLocalStorageTaskAppController = M.Controller.extend({

    tasks: null,
    currentTask:null,

    init: function() {
        KitchenSink.Task.find();
        this.setTasks();
    },

    addTask: function() {
        task = KitchenSink.Task.createRecord({
            text: M.ViewManager.getView('storageLocalStorageTaskApp', 'taskField').value
        });

        task.save();
        this.setTasks();
        M.ViewManager.getView('storageLocalStorageTaskApp', 'taskField').setValue('');
    },

    removeTodo: function(domId, modelId) {  
        console.log('### m_id: ' + modelId);
        this.currentTask = KitchenSink.Task.recordManager.getRecordForId(modelId);
        
        M.DialogView.confirm({
            title: 'Delete a Task',
            message: 'Do you really want to delete this item?',

            onOk: {
                target: this,
                action: 'deleteTodo'
            }
        });
    },

    deleteTodo: function() {
        this.currentTask.del();
        this.setTasks();
    },

    setTasks: function() {
        this.set('tasks', KitchenSink.Task.records());
    },

    edit: function() {
        M.ViewManager.getView('storageLocalStorageTaskApp', 'taskList').toggleRemove({
            target: this,
            action: 'removeTodo'
        });
    }

});

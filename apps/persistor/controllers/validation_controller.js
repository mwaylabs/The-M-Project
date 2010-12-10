// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      23.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Persistor.ValidationController = M.Controller.extend({

    validationResults : [],

    tasks: [],

    startTime: null,
    time: null,

    init: function() {
        this.tasks.length = 0;
        Persistor.Task.recordManager.removeAll();
        localStorage.clear();
        this.startTime = null;
        this.startTime = M.Date.now();
        var numModels = parseInt(M.ViewManager.getView('page2', 'input').value) ? parseInt(M.ViewManager.getView('page2', 'input').value) : 10;
        for(var i=0; i < numModels; i++) {
            this.tasks.push(Persistor.Task.createRecord({
                title: 'Title' + i,
                subtitle: 'Subtitle' + i,
                text: 'Das ist Eintrag Nr. ' + i,
                email: i%2 === 0 ? 'email' + i + '@de.email.com' : 'email' + i + 'de.email.com'
            }));
        }
        this.createAndValidateModels();
        M.ViewManager.getView('page2', 'input').disable();
    },

    createAndValidateModels: function() {
        var arr = [];
        for(var i in this.tasks) {
            var res = this.tasks[i];
            var result = res.save();
            if(result) {
                arr.push({result: 'Model ' + res.name + '_' + res.id + ' was saved.'});
            } else {
                arr.push({result: 'Model ' + res.name + '_' + res.id + ' was NOT saved.'});
            }
        }

        this.set('validationResults', arr);
        this.set('time', M.Date.timeBetween(this.startTime, M.Date.now(), M.MILLISECONDS));
    },

    clearLocalStorage: function() {
        this.set('validationResults', []);
        localStorage.clear();
        M.ViewManager.getView('page2', 'input').enable();
    }

});
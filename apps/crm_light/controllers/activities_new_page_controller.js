CRMLight.ActivitiesNewPageController = M.Controller.extend({

    activity: null,

    activityName: null,

    activityStatus: null,

    activityReason: null,

    activityResult: null,

    init: function(isFirstTime) {

        this.set('activityName', this.activity.name);
        this.set('activityStatus', this.activity.values['status']);
        this.set('activityReason', this.activity.values['activity_reason']);
        this.set('activityResult', this.activity.values['result']);

    },

    openActivitiesNewSelectPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesNewSelectPage'), null, YES);

    },

    cancelNewActivity: function() {

        M.ViewManager.getView('activitiesNewPage', 'form').clearForm();

        /* TODO: needs to be refactored, so that the selection list knows its default value*/
        this.set('activityStatus', this.activity.values['status']);
        this.set('activityReason', this.activity.values['activity_reason']);
        this.set('activityResult', this.activity.values['result']);

        this.openActivitiesNewSelectPage();

    },

    saveNewActivity: function() {

        /* TODO: validate and save... */

    }

});
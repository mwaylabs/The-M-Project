CRMLight.ActivitiesNewPageController = M.Controller.extend({

    activity: null,

    activityName: null,

    activityStatus: null,

    activityReason: null,

    activityResult: null,

    init: function(isFirstTime) {

        if(isFirstTime) {
            this.set('activityName', this.activity.name);
            this.set('activityStatus', this.activity.values['status']);
            this.set('activityReason', this.activity.values['activity_reason']);
            this.set('activityResult', this.activity.values['result']);
        }

    },

    openActivitiesPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesPage'), null, YES);

    },

    cancelNewActivity: function() {

        

    }

});
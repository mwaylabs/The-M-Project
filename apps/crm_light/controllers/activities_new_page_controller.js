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

    cancelNewActivity: function(pageSwitch) {

        pageSwitch = pageSwitch === NO ? NO : YES;

        M.ViewManager.getView('activitiesNewPage', 'form').clearForm();

        /* TODO: needs to be refactored, so that the selection list knows its default value*/
        this.set('activityStatus', this.activity.values['status']);
        this.set('activityReason', this.activity.values['activity_reason']);
        this.set('activityResult', this.activity.values['result']);

        if(pageSwitch) {
            this.openActivitiesNewSelectPage();
        }

    },

    saveNewActivity: function() {

        var a = CRMLight.Activity.createRecord({
            beginDate: M.Date.create(M.ViewManager.getView('activitiesNewPage', 'beginDate').value),
            endDate: M.Date.create(M.ViewManager.getView('activitiesNewPage', 'endDate').value),
            createDate: M.Date.now(),
            modifyDate: M.Date.now(),
            category: 'Aktivität',
            processType: M.ViewManager.getView('activitiesNewPage', 'processType').value,
            status: M.ViewManager.getView('activitiesNewPage', 'status').getSelection(),
            activityReason: M.ViewManager.getView('activitiesNewPage', 'activityReason').getSelection(),
            goal: M.ViewManager.getView('activitiesNewPage', 'goal').value,
            result: M.ViewManager.getView('activitiesNewPage', 'result').getSelection(),
            resultReason: M.ViewManager.getView('activitiesNewPage', 'resultReason').value,
            text: M.ViewManager.getView('activitiesNewPage', 'text').value,
            customerId: M.ViewManager.getView('activitiesNewPage', 'customerId').value
        });

        M.LoaderView.show();
        a.save({
            onSuccess: {
                target: this,
                action: 'saveDone'
            },
            onError: function() {
                M.LoaderView.hide();
            }
        });

    },

    saveDone: function() {        
        this.cancelNewActivity(NO);
        M.LoaderView.hide();
        CRMLight.ActivitiesPageController.init(YES);
        this.switchToPage(M.ViewManager.getPage('activitiesPage'), null, YES);
    }

});
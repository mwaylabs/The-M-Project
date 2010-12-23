CRMLight.ActivitiesEditPageController = M.Controller.extend({

    activity: null,

    customer: null,

    activityBeginDate: '',
    
    activityEndDate: '',
    
    activityCreateDate: '',

    activityCategory: '',

    activityProcess: '',

    activityStatus: '',

    activityReason: '',

    activityGoal: '',

    activityResult: '',

    activityResultReason: '',

    activityText: '',

    activityCustomerId: '',

    activityCompanyName: '',

    activity_selection: null,

    init: function() {

        var that = this;
        var activity = _.detect(this.activity_selection, function(activity) {
            return activity.name === M.Cypher.utf8_decode(that.activity.get('processType'));
        });
        this.activity_selection = _.clone(activity);

        this.set('activityBeginDate', this.activity.get('beginDate').format('dd.mm.yyyy HH:MM'));
        this.set('activityEndDate', this.activity.get('beginDate').format('dd.mm.yyyy HH:MM'));
        this.set('activityCreateDate', this.activity.get('createDate').format('dd.mm.yyyy HH:MM'));
        this.set('activityCategory', this.activity.get('category'));
        this.set('activityProcess', this.activity.get('processType'));
        this.set('activityStatus', this.activity.get('status'));
        this.set('activityGoal', this.activity.get('goal'));
        this.set('activityResult', this.activity.get('result'));
        this.set('activityResultReason', this.activity.get('resultReason'));
        this.set('activityText', this.activity.get('text'));
        this.set('activityCustomerId', this.activity.get('customerId'));
        this.set('activityDescription', this.activity.get('description'));
        this.set('activityResponsiblePerson', M.Cypher.utf8_decode(this.activity.get('responsiblePerson')));
        this.set('activityCompanyName', M.Cypher.utf8_decode(this.customer.get('customerName')));

        this.set('activityStatus', this.activity_selection.values['status']);
        this.set('activityReason', this.activity_selection.values['activity_reason']);
        this.set('activityResult', this.activity_selection.values['result']);

        var view = M.ViewManager.getView('activitiesEditPage', 'activityReason');
        view.setSelection(M.Cypher.utf8_decode(this.activity.get('activityReason')));

        view = M.ViewManager.getView('activitiesEditPage', 'status');
        view.setSelection(M.Cypher.utf8_decode(this.activity.get('status')));

        view = M.ViewManager.getView('activitiesEditPage', 'result');
        view.setSelection(M.Cypher.utf8_decode(this.activity.get('result')));

    },

    cancelEditActivity: function() {

        M.ViewManager.getView('activitiesEditPage', 'form').clearForm();

        /* TODO: needs to be refactored, so that the selection list knows its default value*/
        /*this.set('activityStatus', this.activity.values['status']);
        this.set('activityReason', this.activity.values['activity_reason']);
        this.set('activityResult', this.activity.values['result']);*/

        this.openActivitiesPage();

    },

    openActivitiesPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesPage'), null, YES);

    },

    saveEditActivity: function() {

        this.activity.set('beginDate', M.Date.create(M.ViewManager.getView('activitiesEditPage', 'beginDate').value));
        this.activity.set('endDate', M.Date.create(M.ViewManager.getView('activitiesEditPage', 'endDate').value));
        this.activity.set('createDate', M.Date.now());
        this.activity.set('modifyDate', M.Date.now());
        this.activity.set('processType', M.ViewManager.getView('activitiesEditPage', 'processType').value);
        this.activity.set('status', M.Cypher.utf8_encode(M.ViewManager.getView('activitiesEditPage', 'status').getSelection()));
        this.activity.set('activityReason', M.Cypher.utf8_encode(M.ViewManager.getView('activitiesEditPage', 'activityReason').getSelection()));
        this.activity.set('goal', M.ViewManager.getView('activitiesEditPage', 'goal').value);
        this.activity.set('result', M.Cypher.utf8_encode(M.ViewManager.getView('activitiesEditPage', 'result').getSelection()));
        this.activity.set('resultReason', M.ViewManager.getView('activitiesEditPage', 'resultReason').value);
        this.activity.set('text', M.ViewManager.getView('activitiesEditPage', 'text').value);
        this.activity.set('customerId', M.ViewManager.getView('activitiesEditPage', 'customerId').value);
        this.activity.set('responsiblePerson', M.ViewManager.getView('activitiesEditPage', 'responsiblePerson').value);

        M.LoaderView.show();
        this.activity.save();

        CRMLight.ActivitiesPageController.init(YES);

        this.openActivitiesPage();

    }

});
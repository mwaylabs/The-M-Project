CRMLight.ActivitiesNewSelectPageController = M.Controller.extend({

    activity_selection: null,

    init: function(isFirstTime) {

        if(isFirstTime) {

            M.Request.init({
                url: '../fixtures/select_lists.json',
                isJSON: YES,
                beforeSend: function(req) {
                    M.LoaderView.show();
                },
                onSuccess: function(data){
                    M.LoaderView.hide();
                    CRMLight.ActivitiesNewSelectPageController.set('activity_selection', data);
                },
                onError: function(request, message){
                    M.LoaderView.hide();
                }
            }).send();

        }

    },

    openActivitiesPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesPage'), null, YES);

    },

    openActivitiesNewPage: function(id) {
        var textField = M.ViewManager.getView(id, 'activityName');
        var activityName = textField ? textField.value : '';
        var activity = _.detect(this.activity_selection, function(activity) {
            return activity.name === activityName;
        });
        CRMLight.ActivitiesNewPageController.set('activity', _.clone(activity));

        this.switchToPage(M.ViewManager.getPage('activitiesNewPage'));

    }

});
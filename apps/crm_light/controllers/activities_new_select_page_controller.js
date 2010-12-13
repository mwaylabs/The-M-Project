CRMLight.ActivitiesNewSelectPageController = M.Controller.extend({

    activity_selection: null,

    init: function(isFirstTime) {

        if(isFirstTime) {

            M.Request.init({
                url: 'activities.json',
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

    }

});
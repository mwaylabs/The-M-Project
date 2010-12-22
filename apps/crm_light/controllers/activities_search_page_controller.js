CRMLight.ActivitiesSearchPageController = M.Controller.extend({

    activitiesSearch: null,

    init: function(isFirstTime) {

        if(isFirstTime) {
            this.set('activitiesSearch', CRMLight.ActivitiesPageController.activities);
        }

    },

    search: function() {

        /* get the search string */
        var searchstring = M.ViewManager.getView('activitiesSearchPage', 'searchbar').value;

        /* get all loaded activities */
        var results = _.clone(CRMLight.ActivitiesPageController.activities);
        /* iterate through all activities */
        for(var i in results) {
            var day = results[i];
            day = _.select(day, function(activity) {
                return (activity.activityName.lastIndexOf(searchstring) > -1 || activity.companyName.lastIndexOf(searchstring) > -1 || activity.companyCity.lastIndexOf(searchstring) > -1);
            });
            if(day.length > 0) {
                results[i] = day;
            } else {
                delete results[i];
            }
        }
        this.set('activitiesSearch', results);
        
    },

    openActivitiesPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesPage'), null, YES);
        
    }

});
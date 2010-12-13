CRMLight.ActivitiesPageController = M.Controller.extend({

    activities: null,

    init: function() {
        for(var i in CRMLight.ActivityFixtures.content) {
            var activity = CRMLight.ActivityFixtures.content[i];
            var activityRecord = CRMLight.Activity.createRecord(activity);
        }
    },

    openStartPage: function() {

        this.switchToPage(M.ViewManager.getPage('startPage'), null, YES);

    },

    parseDate: function(dateStr) {
        // $1: year: 2010
        // $2: month: 11
        // $3: day: 09
        // $4: hour: 07
        // $5: minutes: 45
        // $6: seconds: 13
        var dateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/
        var res = dateRegex.exec(dateStr);
        return M.Date.create(res[1]+'/'+res[2]+'/'+res[3]+' '+res[4]+':'+res[5]+':'+res[6]);
    }


});
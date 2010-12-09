CRMLight.ActivitiesPageController = M.Controller.extend({

    openStartPage: function() {

        this.switchToPage(M.ViewManager.getPage('startPage'), null, YES);

    }

});
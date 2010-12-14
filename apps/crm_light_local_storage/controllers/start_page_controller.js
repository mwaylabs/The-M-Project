CRMLight.StartPageController = M.Controller.extend({

    openActivitiesPage: function() {

        this.switchToPage(M.ViewManager.getPage('activitiesPage'));

    },

    openInformationPage: function() {

        this.switchToPage(M.ViewManager.getPage('informationPage'));

    }

});
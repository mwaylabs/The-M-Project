KitchenSink.UtilitiesI18nController = M.Controller.extend({

    i18nList: null,

    init: function(isFirstLoad) {

        if(isFirstLoad) {

            var i18nList = [
                {
                    name: "Localizing Label",
                    page: "utilitiesI18nLocalizingLabel"
                }
            ];
            this.set('i18nList', i18nList);
        }

    },

    i18nSelected: function(id) {

        var i18nName = M.ViewManager.getView(id, 'name').value;
        var i18n = _.detect(this.i18nList, function(i18n) {
            return i18n.name === i18nName;
        });

        this.switchToPage(i18n.page);
    },

    here: function() {
        this.switchToPage('utilitiesI18n', M.TRANSITION.SLIDE, YES);
    }

});
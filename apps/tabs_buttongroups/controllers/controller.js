Tabbar.Controller = M.Controller.extend({

   selChanged: function(id) {
       var currentPage = M.ViewManager.getCurrentPage();
       var view = M.ViewManager.getView(currentPage, 'buttonGroup');
       var color = view.getActiveButton().value;
       $('#' + currentPage.id).css('background-color', color);
   }

});
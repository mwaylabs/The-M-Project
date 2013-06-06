SampleApp.ApplicationController = M.Controller.extend({

    init: function(){
        SampleApp.Main.set('value', 'changed the value by calling:<br>SampleApp.Main.set("value", "I made a change!")');
    }
});
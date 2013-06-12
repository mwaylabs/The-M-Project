Addressbook.Main = M.View.create({

    valueView: M.View.extend({
        valuePattern: "<%= firstname %>, <%= lastname %>",

        /*CLONE EVENT ON create*/
        events: {
            click: function(a,b,c) {
            }
        }
    })



});

Addressbook.Detail = M.View.create({

    valuePattern: "<%= firstname %>, <%= lastname %>",
    events: {
        "click" : function(){
            Addressbook.ApplicationController.gotoMain(this);
        }
    }

});
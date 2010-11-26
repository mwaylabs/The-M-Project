DividedList.ListController = M.Controller.extend({

    contacts: null,

    init: function() {

        M.Request.init({
            url: 'contacts.json',
            isJSON: YES,
            beforeSend: function(req) {
                //...
            },
            onSuccess: function(data){
                DividedList.ListController.set('contacts', data);
            },
            onError: function(request, message){
                console.log(message);
            }
        }).send();

    },

    searchStringDidChange: function(searchString) {
        console.log(searchString);
    }

});
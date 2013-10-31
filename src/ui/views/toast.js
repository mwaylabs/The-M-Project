(function( scope ) {

    M.Toast = M.View.extend({

        _type: 'M.ToastView',

        template: '<div class="toast"><div id="<%= id %>"><%= text %></div></div>',

        id: null,

        initialize: function( settings ){
            var that = this;
            that.id = _.uniqueId();
            that.text = settings.text || M.Toast.TEXT;
            $('body').append(this.render().$el);

            setTimeout(function(){
                that.remove();
            }, settings.timeout || M.Toast.MEDIUM);
        },

        _assignTemplateValues: function(){
            this._templateData = {
                id: this.id,
                text: this.text
            };
        }

    });

    M.Toast.show = function(settings){
        if(typeof settings === 'string'){
            settings = {
                text: settings
            }
        }
        return M.Toast.create(settings);
    };

    M.Toast.RAW = 500;
    M.Toast.MEDIUM = 2000;
    M.Toast.CRISPY = 4000;
    M.Toast.TEXT = '';


})(this);
(function( scope ) {

    Teaser.Controllers.MainController = M.Controller.extend({

        header: null,

        content: null,

        client: M.Model.create({
            mail: 'E-Mail'
        }),

        applicationStart: function() {

            console.log(M.I18N.l('global.welcome_coder'));

            Teaser.layout = M.AppLayout.extend().create(this, null, true);

            this.content = Teaser.Views.ApplicationView.create(this, null, true);

            this.header = M.View.extend({

                cssClass: 'button-container'
            }, {

                whatsnew: M.ButtonView.extend({
                    value: M.I18NItem.create('global.whats_new'),
                    extendTemplate: '<a href="#whatsnew"><%= _value_ %></a>'
                }),

                contact: M.ButtonView.extend({
                    value: M.I18NItem.create('global.contact'),
                    extendTemplate: '<a href="https://groups.google.com/forum/#!forum/themproject"><%= _value_ %></a>'
                }),

                tmp: M.ButtonView.extend({
                    value: M.I18NItem.create('global.themprojectorg'),
                    extendTemplate: '<a href="http://the-m-project.org"><%= _value_ %></a>'
                })
            }).create(this, null, true);

            Teaser.layout.applyViews({
                header: this.header,
                content: this.content
            }).render();
            $('body').html(Teaser.layout.$el);
        },

        show: function() {

        },

        changeLanguage: function( event, element ) {
            var lang = element.getValue().key.split('global.')[1]
            if( lang ) {
                M.I18N.setLocale(lang);
                window.scrollTo(0, 0);
            }
        },

        signUp: function( event, element ) {
            if( this.validateEmail(this.client.get('mail')) ) {
                var that = this;
                $.ajax('http://www.the-m-project.org/signup.php?mail=' + this.client.get('mail'), {
                    success: function() {
                        M.Toast.show(M.I18N.l('global.thanks_for_signup') + ' ' + that.client.get('mail'));
                    },
                    error: function() {
                        M.Toast.show(M.I18N.l('global.thanks_for_signup') + ' ' + that.client.get('mail'));
                    }
                });

            } else {
                M.Toast.show(M.I18N.l('global.not_valid'));
            }
        },

        validateEmail: function( email ) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }


    });


})(this);
(function (scope) {

    Addressbook.Controllers.DetailController = M.Controller.extend({

        detailView: null,

        currentModel: M.Model.create(),

        applicationStart: function (settings) {
            Addressbook.layout = M.AppLayout.extend().create(this, null, true);

            this._initView(settings);
            Addressbook.layout.applyViews({
                header: this.header,
                content: this.detailView
            });

            Addressbook.layout.render();

            $('body').html(Addressbook.layout.$el);
        },

        show: function (settings) {
            this._initView(settings);

            Addressbook.layout.applyViews({
                header: this.header,
                content: this.detailView
            });
            Addressbook.startTransition();
        },

        gotoEditPage: function(){
             Addressbook.navigate({
                route: 'edit/' + this.currentModel.id,
                transition: M.PageTransitions.MOVE_TO_BOTTOM_FROM_TOP
            });
        },

        _initView: function (settings) {
            var that = this;
            var userId = settings.id;

            if (Addressbook.contactCollection && Addressbook.contactCollection.models.length > 1) {
                this._setModel(userId);
            } else {
                Addressbook.contactCollection = new Addressbook.Collections.ContactsCollection(/*dummy*/);
                Addressbook.contactCollection.fetch({
                    success: function () {
                        that._setModel(userId);
                    }
                });
            }

            if (!this.detailView) {
                this.detailView = Addressbook.Views.DetailView.create(this, null, true);
            }

            if( !this.header ) {
                this.header = M.ToolbarView.extend({
                    scopeKey: 'currentModel',
                    extendTemplate: '<span><%= firstname %></span> <span><%= lastname %></span>'
                },{
                    second: M.View.extend({},{
                        btn: M.ButtonView.extend({
                            value: 'edit',
                            events: {
                                tap: 'gotoEditPage'
                            }
                        })
                    })
                });
                this.header = this.header.create(this, null, true);
            }
        },

        _setModel: function (userId) {
            var userModel = Addressbook.contactCollection.get(userId);
            if(userModel){
//                this.currentModel.set('firstname', userModel.get('firstname'));
//                this.currentModel.set('lastname', userModel.get('lastname'));
                this.set('currentModel', userModel);
            }

        }

    });

})(this);
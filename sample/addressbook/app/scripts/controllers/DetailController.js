(function (scope) {

    Addressbook.Controllers.DetailController = M.Controller.extend({

        detailView: null,

        currentModel: M.Model.create(),

        applicationStart: function (settings) {
            Addressbook.setLayout(M.AppLayout.design(this, null, true));

            this._initView(settings);
            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });
        },

        show: function (settings) {
            this._initView(settings);
            Addressbook.getLayout().applyViews({
                header: this.header,
                content: this.detailView
            });

            Addressbook.getLayout().startTransition();
        },

        gotoEditPage: function(){
             Addressbook.navigate({
                route: 'edit/' + this.currentModel.id,
                transition: M.PageTransitions.CONST.MOVE_TO_BOTTOM_FROM_TOP
            });
        },

        _initView: function (settings) {
            var that = this;
            var userId = settings.id;
            console.log(userId);

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
                    first: M.ButtonView.extend({
                        cssClass: 'btn-default',
                        value: M.I18N.get('global.back'),
                        useElement: YES,
                        events: {
                            tap: function(){
                                Addressbook.navigate({
                                    route: '/',
                                    transition: M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT
                                })
                            }
                        }
                    }),
                    second: M.View.extend({},{
                        btn: M.ButtonView.extend({
                            value: M.I18N.get('global.edit'),
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
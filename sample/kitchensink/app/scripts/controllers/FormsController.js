(function( scope ) {

    Kitchensink.Controllers.FormsController = M.Controller.extend({

        person: M.Model.create({
            name: 'egon',
            birthday: '1383751054966',
            favorite: NO
        }),

        consoleModel: M.Model.create({
            _value_: ''
        }),

        bindingTestModel: M.Model.create({
            a: 'first attribute',
            b: 'second attribute'
        }),

        selectionListModel: M.Model.create({water: 'evian'}),

        multipleSelectionListModel: M.Model.create({water: ['evian']}),

        content: null,

        /**
         * The application start (after reload)
         */
        applicationStart: function() {
            var _layout = M.SwitchHeaderContentLayout.design(this, null, true);
            Kitchensink.setLayout(_layout);
            this._initViews();
        },

        show: function( settings ) {
            this._initViews();
            Kitchensink.getLayout().startTransition();
        },

        _initViews: function(){
            if(!this.content){
                this.content = Kitchensink.Views.Forms.create(this, null, true);
            }
            if(!this.header){
                this.header = Kitchensink.Views.BackHeader.create(this, null, true);
            }

            Kitchensink.getLayout().applyViews({
                header: this.header,
                content: this.content
            });
        }
    });

})(this);
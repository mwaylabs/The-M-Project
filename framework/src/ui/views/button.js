//TODO DO THIS NICE
(function(){

    var templates = {
        default : '<div>Button: <div class="<%= contenteditable %>" <% if(contenteditable) {  } %>><%= value %></div></div>',
        topcoat: '<button class="topcoat-button--large" ><%= value %></button>',
        bootstrap: '<button type="button" class="btn btn-default btn-lg"> <span class="glyphicon glyphicon-star"></span><%= value %></button>',
        jqm: '<a href="#" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner"><span class="ui-btn-text"><%= value %></span></span></a>'
    };

    M.Button = M.View.extend({

        _type: 'M.Button',

        initialize: function(){
            M.View.prototype.initialize.apply(this, arguments);
        },

        contenteditable: true,

        template: _.tpl(templates[uiframework])

    });

    M.UltraStefanCustomMegaViewWithHyperFunctionalty = M.View.extend({

        _type: 'M.UltraStefanCustomMegaViewWithHyperFunctionalty',

        // a
        initialize: function(){
            M.View.prototype.initialize.apply(this, arguments);
            _.each(this.childViews, function(child){
                this.$el.find('[data-child-views["first"]]').append(child.render());
            }, this);
        },
        template: _.tpl('<div><%= value %><div data-child-views="first"></div></div>'),


        // b
        template: _.tpl('<div><%= value %><% childViews %></div>'),

        // b2
        template: _.tpl('<div><%= value %>@@@([childViews])@@@</div>'),


        // c
        initialize: function(){
            M.View.prototype.initialize.apply(this, arguments);
            _.each(this.childViews, function(child){
                this.$el.append($('div'))
                this.$el.find('div span').append(child.render());
            }, this);
        },
        template: _.tpl('<div><%= value %><span></span></div>'),


        // d
        template: _.tpl('<div><%= value %></div>'),





        value: 'default button value'

    });

})();

(function(){

    var template = '<div>Complex View: <div><%= value %></div></div>';

    M.ModelView = M.View.extend({

        _type: 'M.ModelView',

        template: _.tpl(template),

        value: 'default ModelView'

    });


})();
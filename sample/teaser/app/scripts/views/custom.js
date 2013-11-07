M.BackgroundImageView = M.View.extend({
    _type: 'M.BackgroundImageView',
    template: '<div class="backgroundimageview <%= _value_ %>"></div>'
});

M.ClearView = M.View.extend({
    _type: 'M.ClearView',
    template: '<div><h3><%= _value_ %></h3><div data-childviews="children"></div><div class="clear"></div></div>'
});

M.FooterView = M.View.extend({
    _type: 'M.FooterView',
    template: '<div><div data-childviews="footer-left"></div><div data-childviews="footer-center"></div><div data-childviews="footer-right"></div></div>'
});

M.AnkerView = M.View.extend({
    _type: 'M.AnkerView',
    template: '<div><a name="<%= anker %>"></a><div><%= _value_ %></div></div>',

    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this, arguments);
        if( this.anker ) {
            this._templateValues['anker'] = this.anker;
        }
    }
});


/* TWITTER thanks to bchanx from http://www.bchanx.com/logos-in-pure-css-demo */
M.TwitterView = M.View.extend({
    _type: 'M.TwitterView',
    template: '<div class="logo-twitter-small"> <div class="body"></div> <div class="body-none"></div> <div class="beak-bottom"></div> <div class="beak-bottom-none"></div> <div class="wing-bottom"></div> <div class="wing-bottom-none"></div> <div class="wing-middle"></div> <div class="wing-middle-none"></div> <div class="wing-top"></div> <div class="wing-top-none"></div> <div class="beak-top"></div> <div class="beak-top-none"></div> <div class="head"></div> </div>'
});

M.LeftRightView = M.View.extend({

    _type: 'M.LeftRightView',

    template: '<div><div class="leftrightview-first"><div data-childviews="headline"></div><div data-childviews="text"></div></div><div class="leftrightview-second"><div data-childviews="image"></div></div></div>',

    postRender: function() {
        var that = this;
        setTimeout(function() {
            try {
                var height = that.$el.height() / 2;
                var imageHeight = that.$el.find('img').height() / 2;
                that.$el.find('img').css('margin-top', parseInt((height - imageHeight)/2) + 'px');
            } catch( e ) {

            }

        }, 20)

    }

}, {});

M.LeftImageRightText = M.LeftRightView.extend({

    _type: 'M.LeftImageRightText',

    useAsScope: YES

}, {

    headline: M.View.extend({
        scopeKey: 'headline'
    }),

    text: M.View.extend({
        scopeKey: 'text'
    }),

    image: M.ImageView.extend({
        scopeKey: 'image'
    })

});


M.LeftTextRightImage = M.LeftRightView.extend({

    _type: 'M.LeftTextRightImage',

    useAsScope: YES

}, {

    headline: M.View.extend({
        scopeKey: 'headline'
    }),

    text: M.View.extend({
        scopeKey: 'text'
    }),

    image: M.ImageView.extend({
        scopeKey: 'image'
    })

});


//M.Test = M.View.extend({}, {c1: M.View.extend()})
//a1 = M.Test.extend({a:'b'}, {c2: M.View.extend()})
//a2 = M.Test.extend({a:'b'})
//console.log(a1.create().childViews);
//console.log(a2.create().childViews);
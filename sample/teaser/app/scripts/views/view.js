/*global tmp, The-M-Project, JST*/

Teaser.Views = Teaser.Views || {};

(function() {
    'use strict';

    Teaser.Views.ApplicationView = M.View.extend({

    }, {

        header: M.View.extend({
            cssClass: 'content-header',
            anker: 'top'
        }, {

            background: M.View.extend({
                cssClass: 'content-header-bg'
            }),

            contentHeaderContent: M.View.extend({
                cssClass: 'content-header-content'
            }, {

                headline: M.View.extend({

                    extendTemplate: '<strong><%= highlight %></strong><span><%= subline %></span>',

                    tagName: 'h1',

                    value: {

                        highlight: M.I18NItem.create('global.highlight'),

                        subline: M.I18NItem.create('global.subline')

                    }

                }),

                subline: M.View.extend({

                    tagName: 'h2',

                    value: M.I18NItem.create('global.tmp')

                }),

                contactForm: M.View.extend({

                    cssClass: 'contact-form'
                }, {

                    mail: M.TextfieldView.extend({
                        label: M.I18NItem.create('global.sign_up'),
                        placeholder: M.I18NItem.create('global.email'),
                        scopeKey: 'client.mail',
                        events: {
                            enter: 'signUp'
                        }
                    }),

                    send: M.ButtonView.extend({
                        value: M.I18NItem.create('global.sign_up_now'),
                        events: {
                            tap: 'signUp'
                        }
                    })

                }),

                scrollDown: M.View.extend({
                    cssClass: 'scrolldown',
                    value: M.I18NItem.create('global.scoll_down_please')
                })
            }),

            scrollDown: M.View.extend({
                cssClass: 'scrolldown-triangle'
            })

        }),

        contentTop: M.View.extend({
            cssClass: 'content-content'
        }, {

            contentHeadline: M.AnkerView.extend({
                tagName: 'h2',
                anker: 'whatsnew',
                value: M.I18NItem.create('global.create')
            }),

            v2: M.LeftImageRightText.extend({
                headline: M.I18NItem.create('global.v2'),
                text: M.I18NItem.create('global.v2text'),
                image: 'ressources/v2absinthimg@2x.png'
            }, null, true),

            intro: M.LeftTextRightImage.extend({
                headline: M.I18NItem.create('global.intro_tmp2'),
                text: M.I18NItem.create('global.intro_tmp2_text'),
                image: 'ressources/screensimg@2x.png'
            }),

            //                        newUIFramework: M.View.extend({
            //                            tagName: 'h2',
            //                            value: M.I18NItem.create('global.newUIFramework')
            //                        }),
            //
            //                        newUIFrameworkText: M.View.extend({
            //                            value: M.I18NItem.create('global.newUIFrameworkText')
            //                        }),

            businessdata: M.LeftImageRightText.extend({
                headline: M.I18NItem.create('global.businessdata'),
                text: M.I18NItem.create('global.bd_text'),
                image: 'ressources/bikiniimg@2x.png'
            })


        }),

        logosContainer: M.View.extend({

            cssClass:'content-banner logos'

        },{
            tmp_coming_soon: M.View.extend({

                tagName: 'h2',

                value: M.I18NItem.create('global.tmp_coming_soon')
            }),

            logosWebTechnologie: M.ClearView.extend({

                cssClass: 'logos',

                value: M.I18NItem.create('global.logosWebTechnologie')

            }, {

                children: M.View.extend({}, {

                    html: M.BackgroundImageView.extend({
                        value: 'html5'
                    }),

                    javascript: M.BackgroundImageView.extend({
                        value: 'javascript'
                    }),

                    css3: M.BackgroundImageView.extend({
                        value: 'css3'
                    })
                })

            }),

            logosTechnologie: M.ClearView.extend({
                cssClass: 'logos',

                value: M.I18NItem.create('global.logosTechnologie')

            }, {

                children: M.View.extend({}, {

                    bikini: M.BackgroundImageView.extend({
                        value: 'bikini'
                    }),

                    backbone: M.BackgroundImageView.extend({
                        value: 'stack'
                    }),

                    jquerymobile: M.BackgroundImageView.extend({
                        value: 'jquerymobile'
                    })
                })

            }),

            logosToolchain: M.ClearView.extend({
                cssClass: 'logos',

                value: M.I18NItem.create('global.logosToolchain')

            }, {

                children: M.View.extend({}, {

                    grunt: M.BackgroundImageView.extend({
                        value: 'grunt'
                    }),

                    bower: M.BackgroundImageView.extend({
                        value: 'bower'
                    }),

                    yeoman: M.BackgroundImageView.extend({
                        value: 'yeoman'
                    })
                })

            }),

            logosTools: M.ClearView.extend({
                cssClass: 'logos',

                value: M.I18NItem.create('global.logosTools')

            }, {

                children: M.View.extend({}, {

                    opensource: M.BackgroundImageView.extend({
                        value: 'opensource'
                    }),

                    github: M.BackgroundImageView.extend({
                        value: 'github'
                    }),

                    webstorm: M.BackgroundImageView.extend({
                        value: 'webstorm'
                    })
                })

            })
        }),

        contentBanner: M.View.extend({
            cssClass: 'content-banner',
            extendTemplate: '<div><a href="https://twitter.com/_themproject"><div data-childviews="bannerContent"></div></a></div>'
        }, {

            bannerContent: M.View.extend({
                cssClass: 'content-banner-content'
            }, {

                twitter: M.TwitterView.extend({

                }),
                join: M.View.extend({
                    value: M.I18NItem.create('global.join')
                })
            })

        }),

        contentFooter: M.FooterView.extend({
            cssClass: 'content-content'
        }, {

            "footer-left": M.View.extend({}, {
                love: M.View.extend({
                    value: M.I18NItem.create('global.love')
                })
            }),
            "footer-center": M.View.extend({}, {
                google: M.View.extend({
                    cssClass: 'google',
                    extendTemplate: '<a href="https://groups.google.com/forum/#!forum/themproject"><%= _value_ %></a>'
                }),
                twitter: M.View.extend({
                    cssClass: 'twitter',
                    extendTemplate: '<a href="https://twitter.com/_themproject"><%= _value_ %></a>'
                }),
                copyright: M.View.extend({
                    value: M.I18NItem.create('global.copyright')
                })

            }),
            "footer-right": M.View.extend({}, {

                de: M.View.extend({
                    value: M.I18NItem.create('global.de'),
                    events: {
                        tap: 'changeLanguage'
                    }
                }),
                en: M.View.extend({
                    value: M.I18NItem.create('global.en'),
                    events: {
                        tap: 'changeLanguage'
                    }
                })

            })


        })


    });

})();

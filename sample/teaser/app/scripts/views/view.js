/*global tmp, The-M-Project, JST*/

Teaser.Views = Teaser.Views || {};

(function() {
    'use strict';

    Teaser.Views.ApplicationView = M.View.extend({
        //        template: '<div><div data-childviews="toolbar"></div><div data-childviews="header"></div><div data-childviews="content"></div></div>',
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

            intro: M.LeftTextRightImage.extend({
                headline: M.I18NItem.create('global.intro_tmp2'),
                text: 'asldkfgnkladmsfkj alksdjfkljasdflkj',
                image: 'ressources/screensimg@2x.png'
            }),

            v2: M.LeftImageRightText.extend({
                headline: M.I18NItem.create('global.v2'),
                text: 'asldkfgnkladmsfkj alksdjfkljasdflkj',
                image: 'ressources/v2absinthimg@2x.png'
            }, null, true),

            //                        newUIFramework: M.View.extend({
            //                            tagName: 'h2',
            //                            value: M.I18NItem.create('global.newUIFramework')
            //                        }),
            //
            //                        newUIFrameworkText: M.View.extend({
            //                            value: M.I18NItem.create('global.newUIFrameworkText')
            //                        }),

            businessdata: M.LeftTextRightImage.extend({
                headline: M.I18NItem.create('global.businessdata'),
                text: 'asldkfgnkladmsfkj alksdjfkljasdflkj',
                image: 'ressources/bikiniimg@2x.png'
            }),

            //            roadmap: M.View.extend({
            //                value: M.I18NItem.create('global.roadmap')
            //            }),

            //            togo: M.View.extend({
            //                tagName: 'h2',
            //                value: M.I18NItem.create('global.togo')
            //            }),

            //            togoText: M.View.extend({
            //                value: M.I18NItem.create('global.togoText')
            //            }),

            tmp_coming_soon: M.View.extend({

                tagName: 'h2',

                value: M.I18NItem.create('global.tmp_coming_soon')
            }),

            logos: M.ClearView.extend({
                cssClass: 'logos',

                value: M.I18NItem.create('global.logos')

            }, {

                children: M.View.extend({}, {
                    backbone: M.BackgroundImageView.extend({
                        value: 'stack'
                    }),

                    html: M.BackgroundImageView.extend({
                        value: 'html5'
                    }),

                    grunt: M.BackgroundImageView.extend({
                        value: 'grunt'
                    }),

                    bower: M.BackgroundImageView.extend({
                        value: 'bower'
                    }),

                    yeoman: M.BackgroundImageView.extend({
                        value: 'yeoman'
                    }),

                    jquerymobile: M.BackgroundImageView.extend({
                        value: 'jquerymobile'
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
                    cssClass: 'google'
                }),
                twitter: M.View.extend({
                    cssClass: 'twitter'
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

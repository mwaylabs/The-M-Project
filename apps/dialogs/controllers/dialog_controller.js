// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

Dialogs.TodoController = M.Controller.extend({

    notification: '',

    openAlert: function() {

        M.DialogView.alert({
            message: 'I am the super cool alert dialog of The M-Project. For example you can use me to provide a user with some important information or to display an error. Once you click the OK button, a callback is triggered.',
            title: 'Alert Dialog',
            onOk: {
                target: this,
                action: 'alertOnOk'
            }
        });

    },

    alertOnOk: function() {

        this.set('notification', 'You just clicked on the \'OK\' button of the alert dialog!');

    },

    openConfirm: function() {

        M.DialogView.confirm({
            message: 'Hi, I am a pretty sweet confirm dialog of The M-Project. You can use me to provide the user with a possibility to accept or decline something. For example you could aks the user\'s permission to open an external hyperlink or to delete a photo.',
            title: 'Confirm Dialog',
            onOk: {
                target: this,
                action: 'confirmOnOk'
            },
            onCancel: {
                target: this,
                action: 'confirmOnCancel'
            }
        });

    },

    confirmOnOk: function() {

        this.set('notification', 'You just clicked on the \'OK\' button of the confirm dialog!');

    },

    confirmOnCancel: function() {

        this.set('notification', 'You just clicked on the \'Cancel\' button of the confirm dialog!');

    },

    openActionSheet: function() {

        M.DialogView.actionSheet({
            title: 'Action Sheet Dialog',
            message: 'Welcome to The M-Project\'s awesome action sheet dialog. I can be used to offer the user not only the possibility to accept or decline something, as with the confirm dialog, but to choose between several options by simply clicking on the according button.',
            onCancel: {
                target: this,
                action: 'actionSheetOnCancel'
            },
            buttons: {
                facebook: {
                    title: 'Facebook',
                    target: this,
                    action: 'facebook'
                },
                twitter: {
                    title: 'Twitter',
                    target: this,
                    action: 'twitter'
                },
                flickr: {
                    title: 'Flickr',
                    target: this,
                    action: 'flickr'
                }
            }
        });

    },

    facebook: function() {

        this.set('notification', 'You just clicked on the \'Facebook\' button of the action sheet dialog!');

    },

    twitter: function() {

        this.set('notification', 'You just clicked on the \'Twitter\' button of the action sheet dialog!');

    },

    flickr: function() {

        this.set('notification', 'You just clicked on the \'Flickr\' button of the action sheet dialog!');

    },

    actionSheetOnCancel: function() {

        this.set('notification', 'You just clicked on the \'Cancel\' button of the action sheet dialog!');

    }

});
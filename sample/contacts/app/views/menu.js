define([
    // Application.
    'themproject', 'app', "text!templates/menu.html"
],

    function( M, app, menuTemplate ) {

        var btn = M.Button.create({

            value: 'toggle ui framework',

            events: {
                click: 'click'
            },

            click: function() {
                if( currentUI >= uiframeworks.length - 1 ) {
                    currentUI = -1;
                }
                localStorage.setItem('uiframework', ++currentUI);
                location.reload();

            }

        });

        return btn;
    });
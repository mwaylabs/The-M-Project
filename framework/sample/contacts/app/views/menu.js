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
                console.log('click');
                return;
                if( currentUI >= uiframeworks.length - 1 ) {
                    currentUI = -1;
                }
                localStorage.setItem('uiframework', ++currentUI);
                location.reload();

            }

        });

        var label = M.ModelView.create({
            value: 'ich bin ein label'
        });

        BBB = btn;

        return btn;
    });
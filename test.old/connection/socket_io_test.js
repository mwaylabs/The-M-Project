asyncTest("M.SocketIO: Testing socket processing", function() {

    TEST.socktTest1 = M.SocketIO.create({

        host: 'http://test.the-m-project.org:8100',

        path: 'test',

        events: {

            connected: {
                action: function(data) {
                    ok(data, 'connected for "test1" received.');
                    console.log(data);
                    this.emit('news', 'Meine neue News...' );
                }
            },

            news: {
                action: function(data) {
                    ok(data, 'news received.');
                    console.log(data);
                }
            }
        }
    });

    TEST.socktTest2 = M.SocketIO.create({

        host: 'http://test.the-m-project.org:8100',

        path: 'test',

        events: {

            connected: {
                action: function(data) {
                    ok(data, 'connected of "test2" received.');
                    console.log(data);
                    this.emit('log', new Date().toLocaleString() + ' - Test of The-M-Project TMP2' );
                    this.disconnect();
                }
            },

            disconnect: {
                action: function() {
                    ok(true, 'disconnect of "test2" received.');
                }
            }
        }
    });

    setTimeout(function() {
        ok( true, "Passed and ready to resume!" );
        start();
    }, 500);

});


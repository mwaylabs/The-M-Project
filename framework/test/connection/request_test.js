test('M.Request Test', function() {

    ok(M.hasOwnProperty('Request'), 'M.Request is defined.');

    ok(M.Request.getObjectType() === 'M.Request', 'The type of M.Request is M.Request.');

    ok(typeof M.Request.init === 'function', 'M.Request implements a init function.');

    ok(typeof M.Request._normalize === 'function', 'M.Request implements a _normalize function.');

    ok(typeof M.Request._init === 'function', 'M.Request implements a _init function.');

    ok(typeof M.Request.getId === 'function', 'M.Request implements a getId function.');

    ok(typeof M.Request.send === 'function', 'M.Request implements a send function.');

    ok(typeof M.Request.cancel === 'function', 'M.Request implements a cancel function.');

    ok(typeof M.Request._handleBeforeSend === 'function', 'M.Request implements a _handleBeforeSend function.');

    ok(typeof M.Request._handleError === 'function', 'M.Request implements a _handleError function.');

    ok(typeof M.Request.cancel === 'function', 'M.Request implements a cancel function.');

    var request = M.Request.init({
        url: 'http://www.the-m-project.org'
    });
    ok(request.getId() === request._id , 'M.Request.getId() returns the request\'s id.');

    request = null;
    request = M.Request.init({
        url: 'http://www.the-m-project.org'
    });
    ok(typeof request === 'object' && request.getObjectType() === 'M.Request' && Object.getPrototypeOf(request) === M.Request, 'M.Request.init() returns an instance of M.Request (with at least a given url property).');

    throws(function() {
        M.Request.init();
    }, /^M.Exception.NO_REQUEST_URL_SPECIFIED/, 'Calling M.Request.init() without an URL, throws an exception: ' + M.Exception.NO_REQUEST_URL_SPECIFIED.name + ' (' + M.Exception.NO_REQUEST_URL_SPECIFIED.message + ')');

    request = null;
    request = M.Request.init({
        url: 'http://www.the-m-project.org',
        timeout: 5000
    });
    ok(request.hasOwnProperty('timeout'), 'If a timeout is specified as a number, the instance has its own timeout property.');

    request = null;
    request = M.Request.init({
        url: 'http://www.the-m-project.org',
        timeout: 'test'
    });
    ok(!request.hasOwnProperty('timeout'), 'If a timeout is specified as a string, the instance has no own property called timeout.');

    ok(!request.hasOwnProperty('timeout'), 'If no timeout is specified, the instance has no own property called timeout.');

});

asyncTest("M.Request: Testing request processing (success)", function() {

    var request = M.Request.init({
        url: location.href,
        timeout: 5000,
        callbacks: {
            beforeSend: function(obj) {
                ok(obj && obj.xhr, "Event handler \'before send\' is called properly.");
            },
            success: function(obj) {
                ok(obj && obj.data, "Event handler \'success\' is called properly.");
                start();
            }
        }
    });
    request.send();

});

asyncTest("M.Request: Testing request processing (cancel)", function() {

    var request = M.Request.init({
        url: location.href,
        timeout: 5000,
        callbacks: {
            error: function(obj) {
                ok(obj && obj.status === 'abort', "Request can be canceled by calling cancel().");
                start();
            }
        }
    });
    request.send();
    request.cancel();

});

asyncTest("M.Request: Testing request processing (timeout)", function() {

    var request = M.Request.init({
        url: '_requestable/dummyTXT.txt?d=' + new Date(),
        timeout: 1,
        callbacks: {
            error: function(obj) {
                ok(obj && obj.status === 'timeout', "Request was automatically canceled due to a timeout (1ms in this case).");
                start();
            },
            success: function() {
                start();
            }
        }
    });
    request.send();

});
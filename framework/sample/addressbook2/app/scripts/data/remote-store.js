define([
    'themproject'
], function( M ) {

    var RemoteStore = M.BikiniStore.create({
        // socketPath: 'bikini/live',
        useSocketNotify: false
    });

    return RemoteStore;
});
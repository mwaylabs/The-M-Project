define([
    'themproject'
], function( M ) {

    var RemoteStore = M.BikiniStore.create({
        // socketPath: 'bikini/live',
        useSocketNotify: false,
        useLocalStore: false
    });

    return RemoteStore;
});
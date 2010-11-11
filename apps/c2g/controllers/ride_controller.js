// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

C2G.RideController = M.Controller.extend({

    rides: M.ModelManager.extend({
        model: C2G.Ride
    }),

    myRides: null,

    addRideAsDriver: function() {
        var ride =  C2G.Ride.newRecord({
            start: C2G.app.mainPage.content.startField.value,
            destination: C2G.app.mainPage.content.destinationField.value,
            date: M.Date.now()
        });

        this.rides.add(ride);
        this.set('myRides', this.rides.modelList);

        C2G.app.mainPage.content.startField.setValue('');
        C2G.app.mainPage.content.destinationField.setValue('');
    },

    /*addRideAsCoDriver: function() {
        var ride = this.createRide();
        this.rides.add(ride);
    },*/

    showRides: function() {
        this.switchToView(C2G.app.ridesView);
    }

});
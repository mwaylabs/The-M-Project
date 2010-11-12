// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('../foundation/object.js');

/* definition of some date specific constants */
M.MILLISECONDS = 'milliseconds';
M.SECONDS = 'seconds';
M.MINUTES = 'minutes';
M.HOURS = 'hours';
M.DAYS = 'days';

/**
 * @class
 * 
 * Object for simpler handling of dates.
 */
M.Date = M.Object.extend({

    /**
     * Returns the current date, e.g.
     * Thu Nov 11 2010 14:20:55 GMT+0100 (CET)
     */
    now: function() {
        return new Date();
    },

    /**
     * This method returns the date, 24h in the future.
     */
    tomorrow: function() {
        return this.daysFromNow(1);
    },

    /**
     * This method returns the date, 24h in the past.
     */
    yesterday: function() {
        return this.daysFromNow(-1);
    },

    /**
     * This method returns a date in the future, based on 'days'. Basically it adds x times the
     * milliseconds of a day, but also checks for clock changes and automatically includes these
     * into the calculation of the future date.
     *
     * @param {Number} days The number of days that should be added to the current date.
     */
    daysFromNow: function(days) {
        var now = this.now();
        var future = new Date(Date.parse(now) + days * (24 * 60 * 60 * 1000));
        return new Date(Date.parse(future) + (future.getTimezoneOffset() - now.getTimezoneOffset()) * (60 * 1000));
    },

    /**
     * This method returns the time between two dates, based on the given returnType.
     *
     * Possible returnTypes are:
     * - M.MILLISECONDS: milliseconds
     * - M.SECONDS: seconds
     * - M.MINUTES: minutes
     * - M.HOURS: hours
     * - M.DAYS: days
     *
     * @param {Object} firstDate The first date.
     * @param {Object} secondDate The second date.
     * @param {String} returnType The return type for the call.
     */
    timeBetween: function(firstDate, secondDate, returnType) {
        var firstDateInMilliseconds = Date.parse(firstDate);
        var secondDateInMilliseconds = Date.parse(secondDate);

        switch (returnType) {
            case M.DAYS:
                return (secondDateInMilliseconds - firstDateInMilliseconds) / (24 * 60 * 60 * 1000);
                break;
            case M.HOURS:
                return (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 60 * 1000);
                break;
            case M.MINUTES:
                return (secondDateInMilliseconds - firstDateInMilliseconds) / (60 * 1000);
                break;
            case M.SECONDS:
                return (secondDateInMilliseconds - firstDateInMilliseconds) / 1000;
                break;
            case M.MILLISECONDS:
            default:            
                return (secondDateInMilliseconds - firstDateInMilliseconds);
                break;
        }
    }

});
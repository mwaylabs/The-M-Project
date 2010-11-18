// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

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
     * This method returns a date for a given date string. It is based on JS Date's parse
     * method.
     *
     * The following formats are accepted (time and timezone are optional):
     * - 11/12/2010
     * - 11/12/2010 15:28:15
     * - 11/12/2010 13:28:15 GMT
     * - 11/12/2010 15:28:15 GMT+0200
     * - 12 November 2010
     * - 12 November 2010 15:28:15
     * - 12 November 2010 13:28:15 GMT
     * - 12 November 2010 15:28:15 GMT+0200
     * - 12 Nov 2010
     * - 12 Nov 2010 15:28:15
     * - 12 Nov 2010 13:28:15 GMT
     * - 12 Nov 2010 15:28:15 GMT+0200
     *
     * If a wrong formatted date string is given, the method will return null. Otherwise a
     * JS Date object will be returned.
     */
    create: function(dateString) {
        var milliseconds = Date.parse(dateString);
        if(!milliseconds) {
            M.Logger.log('Invalid dateString \'' + dateString + '\'.', M.WARN);
            return null;
        }
        return new Date(milliseconds);
    },

    /**
     * This method returns the date, 24h in the past.
     */
    yesterday: function() {
        return this.daysFromNow(-1);
    },

    /**
     * This method returns a date in the future or past, based on 'days'. Basically it adds or
     * subtracts x times the milliseconds of a day, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     */
    daysFromNow: function(days) {
        return this.daysFromDate(days, this.now());
    },

    /**
     * This method returns a date in the future or past, based on 'days' and a given date. Basically
     * it adds or subtracts x days, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     * @param {Object} inputDate The input date as a date object.
     */
    daysFromDate: function(days, inputDate) {
        return this.millisecondsFromDate(days * 24 * 60 * 60 * 1000, inputDate);
    },

    /**
     * This method returns a date in the future or past, based on 'hours'. Basically it adds or
     * subtracts x times the milliseconds of an hour, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     */
    hoursFromNow: function(hours) {
        return this.hoursFromDate(hours, this.now());
    },

    /**
     * This method returns a date in the future or past, based on 'hours' and a given date. Basically
     * it adds or subtracts x hours, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     * @param {Object} inputDate The input date as a date object.
     */
    hoursFromDate: function(hours, inputDate) {
        return this.millisecondsFromDate(hours * 60 * 60 * 1000, inputDate);
    },

    /**
     * This method returns a date in the future or past, based on 'minutes'. Basically it adds or
     * subtracts x times the milliseconds of a minute, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     */
    minutesFromNow: function(minutes) {
        return this.minutesFromDate(minutes, this.now());
    },

    /**
     * This method returns a date in the future or past, based on 'minutes' and a given date. Basically
     * it adds or subtracts x minutes, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     * @param {Object} inputDate The input date as a date object.
     */
    minutesFromDate: function(minutes, inputDate) {
        return this.millisecondsFromDate(minutes * 60 * 1000, inputDate);
    },

    /**
     * This method returns a date in the future or past, based on 'seconds'. Basically it adds or
     * subtracts x times the milliseconds of a second, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     */
    secondsFromNow: function(seconds) {
        return this.secondsFromDate(seconds, this.now());
    },

    /**
     * This method returns a date in the future or past, based on 'seconds' and a given date. Basically
     * it adds or subtracts x seconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     * @param {Object} inputDate The input date as a date object.
     */
    secondsFromDate: function(seconds, inputDate) {
        return this.millisecondsFromDate(seconds * 1000, inputDate);
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds'. Basically it adds or
     * subtracts x milliseconds, but also checks for clock changes and automatically includes these
     * into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     */
    millisecondsFromNow: function(milliseconds) {
        return this.millisecondsFromDate(milliseconds, this.now());
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds' and a given date. Basically
     * it adds or subtracts x milliseconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     * @param {Object} inputDate The input date as a date object.
     */
    millisecondsFromDate: function(milliseconds, inputDate) {
        var outputDate = new Date(Date.parse(inputDate) + milliseconds);
        return new Date(Date.parse(outputDate) + (outputDate.getTimezoneOffset() - inputDate.getTimezoneOffset()) * (60 * 1000));
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
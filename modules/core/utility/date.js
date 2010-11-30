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

M.DAY_NAMES = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
M.MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

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
        var milliseconds = typeof(dateString) === 'number' ? dateString : Date.parse(dateString);
        if(!milliseconds) {
            M.Logger.log('Invalid dateString \'' + dateString + '\'.', M.WARN);
            return null;
        }
        return new Date(milliseconds);
    },

    /**
     * This method formats a given JS Date object according to the passed 'format' property and
     * returns it as a String.
     *
     * The following list defines the special characters that can be used in the 'format' property
     * to format the given date:
     *
     * d        Day of the month as digits; no leading zero for single-digit days.
     * dd 	    Day of the month as digits; leading zero for single-digit days.
     * ddd 	    Day of the week as a three-letter abbreviation.
     * dddd 	Day of the week as its full name.
     * m 	    Month as digits; no leading zero for single-digit months.
     * mm 	    Month as digits; leading zero for single-digit months.
     * mmm 	    Month as a three-letter abbreviation.
     * mmmm 	Month as its full name.
     * yy 	    Year as last two digits; leading zero for years less than 10.
     * yyyy 	Year represented by four digits.
     * h 	    Hours; no leading zero for single-digit hours (12-hour clock).
     * hh 	    Hours; leading zero for single-digit hours (12-hour clock).
     * H 	    Hours; no leading zero for single-digit hours (24-hour clock).
     * HH 	    Hours; leading zero for single-digit hours (24-hour clock).
     * M 	    Minutes; no leading zero for single-digit minutes.
     * MM 	    Minutes; leading zero for single-digit minutes.
     * s 	    Seconds; no leading zero for single-digit seconds.
     * ss 	    Seconds; leading zero for single-digit seconds.
     * l or L 	Milliseconds. l gives 3 digits. L gives 2 digits.
     * t 	    Lowercase, single-character time marker string: a or p.
     * tt   	Lowercase, two-character time marker string: am or pm.
     * T 	    Uppercase, single-character time marker string: A or P.
     * TT 	    Uppercase, two-character time marker string: AM or PM.
     * Z 	    US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500
     * o 	    GMT/UTC timezone offset, e.g. -0500 or +0230.
     * S 	    The date's ordinal suffix (st, nd, rd, or th). Works well with d.
     *
     * @param date {Object} The date to be formatted.
     * @param format {String} The format.
     * @param utc {Boolean} Determines whether to convert to UTC time or not. Default: NO.
     */
    format: function(date, format, utc) {
        if(isNaN(date)) {
            M.Logger.log('Invalid date!', M.WARN);   
        }

        var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
        var	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var	timezoneClip = /[^-+\dA-Z]/g;
        var	pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

		if(arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			format = date;
			date = undefined;
		}

		var	_ = utc ? "getUTC" : "get";
        var	d = date[_ + "Date"]();
        var	D = date[_ + "Day"]();
        var	m = date[_ + "Month"]();
        var	y = date[_ + "FullYear"]();
        var	H = date[_ + "Hours"]();
        var	Min = date[_ + "Minutes"]();
        var	s = date[_ + "Seconds"]();
        var	L = date[_ + "Milliseconds"]();
        var	o = utc ? 0 : date.getTimezoneOffset();
        var	flags = {
            d:    d,
            dd:   pad(d),
            ddd:  M.DAY_NAMES[D],
            dddd: M.DAY_NAMES[D + 7],
            m:    m + 1,
            mm:   pad(m + 1),
            mmm:  M.MONTH_NAMES[m],
            mmmm: M.MONTH_NAMES[m + 12],
            yy:   String(y).slice(2),
            yyyy: y,
            h:    H % 12 || 12,
            hh:   pad(H % 12 || 12),
            H:    H,
            HH:   pad(H),
            M:    Min,
            MM:   pad(Min),
            s:    s,
            ss:   pad(s),
            l:    pad(L, 3),
            L:    pad(L > 99 ? Math.round(L / 10) : L),
            t:    H < 12 ? "a"  : "p",
            tt:   H < 12 ? "am" : "pm",
            T:    H < 12 ? "A"  : "P",
            TT:   H < 12 ? "AM" : "PM",
            Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };
        
		return format.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
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
        var firstDateInMilliseconds = firstDate.valueOf();
        var secondDateInMilliseconds = secondDate.valueOf();

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
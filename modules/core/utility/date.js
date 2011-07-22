// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      11.11.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/foundation/object.js');

/**
 * A constant value for milliseconds.
 *
 * @type String
 */
M.MILLISECONDS = 'milliseconds';

/**
 * A constant value for seconds.
 *
 * @type String
 */
M.SECONDS = 'seconds';

/**
 * A constant value for minutes.
 *
 * @type String
 */
M.MINUTES = 'minutes';

/**
 * A constant value for hours.
 *
 * @type String
 */
M.HOURS = 'hours';

/**
 * A constant value for days.
 *
 * @type String
 */
M.DAYS = 'days';

/**
 * A constant array for day names.
 *
 * @type String
 */
M.DAY_NAMES = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

/**
 * A constant array for month names.
 *
 * @type String
 */
M.MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

/**
 * @class
 * 
 * M.Date defines a prototype for creating, handling and computing dates. It is basically a wrapper
 * to JavaScripts own date object that provides more convenient functionalities.
 *
 * @extends M.Object
 */
M.Date = M.Object.extend(
/** @scope M.Date.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.Date',
    /**
     * The native JavaScript date object.
     *
     * @type Object
     */
    date: null,

    /**
     * Returns the current date, e.g.
     * Thu Nov 11 2010 14:20:55 GMT+0100 (CET)
     *
     * @returns {M.Date} The current date.
     */
    now: function() {
        return this.extend({
            date: new Date()
        });
    },

    /**
     * This method returns the date, 24h in the future.
     *
     * @returns {M.Date} The current date, 24 hours in the future.
     */
    tomorrow: function() {
        return this.daysFromNow(1);
    },

    /**
     * This method returns the date, 24h in the past.
     *
     * @returns {M.Date} The current date, 24 hours in the past.
     */
    yesterday: function() {
        return this.daysFromNow(-1);
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
     *
     * @param {String} dateString The date string specifying a certain date.
     * @returns {M.Date} The date, specified by the given date string.
     */
    create: function(dateString) {
        var milliseconds = typeof(dateString) === 'number' ? dateString : null;

        if(!milliseconds) {
            var regexResult = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/.exec(dateString);
            if(regexResult && regexResult[1] && regexResult[2] && regexResult[3]) {
                var date = $.trim(dateString).split(' ');
                dateString = regexResult[2] + '/' + regexResult[1] + '/' + regexResult[3] + (date[1] ? ' ' + date[1] : '');
            }
            milliseconds = Date.parse(dateString);
        }

        if(dateString && !milliseconds) {
            M.Logger.log('Invalid dateString \'' + dateString + '\'.', M.WARN);
            return null;
        } else if(!dateString) {
            return this.now();
        }

        return this.extend({
            date: new Date(milliseconds)
        });
    },

    /**
     * This method formats a given date object according to the passed 'format' property and
     * returns it as a String.
     *
     * The following list defines the special characters that can be used in the 'format' property
     * to format the given date:
     *
     * d        Day of the month as digits; no leading zero for single-digit days.
     * dd 	    Day of the month as digits; leading zero for single-digit days.
     * ddd 	    Day of the week as a three-letter abbreviation.
     * dddd 	Day of the week as its full name.
     * D 	    Day of the week as number.
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
     * @param {String} format The format.
     * @param {Boolean} utc Determines whether to convert to UTC time or not. Default: NO.
     * @returns {String} The date, formatted with a given format.
     */
    format: function(format, utc) {
        if(isNaN(this.date)) {
            M.Logger.log('Invalid date!', M.WARN);
        }

        var	token = /d{1,4}|D{1}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g;
        var	timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var	timezoneClip = /[^-+\dA-Z]/g;
        var	pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

		if(arguments.length == 1 && Object.prototype.toString.call(this.date) == "[object String]" && !/\d/.test(this.date)) {
			format = this.date;
			date = undefined;
		}

		var	_ = utc ? "getUTC" : "get";
        var	d = this.date[_ + "Date"]();
        var	D = this.date[_ + "Day"]();
        var	m = this.date[_ + "Month"]();
        var	y = this.date[_ + "FullYear"]();
        var	H = this.date[_ + "Hours"]();
        var	Min = this.date[_ + "Minutes"]();
        var	s = this.date[_ + "Seconds"]();
        var	L = this.date[_ + "Milliseconds"]();
        var	o = utc ? 0 : this.date.getTimezoneOffset();
        var	flags = {
            d:    d,
            dd:   pad(d),
            ddd:  M.DAY_NAMES[D],
            dddd: M.DAY_NAMES[D + 7],
            D:    D,
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
            Z:    utc ? "UTC" : (String(this.date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

		return format.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
    },

    /**
     * This method returns a timestamp.
     *
     * @returns {Number} The current date as a timestamp.
     */
    getTimestamp: function() {
        if(this.date) {
            return this.date.getTime();
        }
        return null
    },

    /**
     * This method returns a date in the future or past, based on 'days'. Basically it adds or
     * subtracts x times the milliseconds of a day, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x days in the future (based on parameter 'days').
     */
    daysFromNow: function(days) {
        var date = this.now();
        return date.daysFromDate(days);
    },

    /**
     * This method returns a date in the future or past, based on 'days' and a given date. Basically
     * it adds or subtracts x days, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} days The number of days to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x days in the future (based on parameter 'days').
     */
    daysFromDate: function(days) {
        return this.millisecondsFromDate(days * 24 * 60 * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'hours'. Basically it adds or
     * subtracts x times the milliseconds of an hour, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x hours in the future (based on parameter 'hours').
     */
    hoursFromNow: function(hours) {
        var date = this.now();
        return date.hoursFromDate(hours);
    },

    /**
     * This method returns a date in the future or past, based on 'hours' and a given date. Basically
     * it adds or subtracts x hours, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} hours The number of hours to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x hours in the future (based on parameter 'hours').
     */
    hoursFromDate: function(hours) {
        return this.millisecondsFromDate(hours * 60 * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'minutes'. Basically it adds or
     * subtracts x times the milliseconds of a minute, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x minutes in the future (based on parameter 'minutes').
     */
    minutesFromNow: function(minutes) {
        var date = this.now();
        return date.minutesFromDate(minutes);
    },

    /**
     * This method returns a date in the future or past, based on 'minutes' and a given date. Basically
     * it adds or subtracts x minutes, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} minutes The number of minutes to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x minutes in the future (based on parameter 'minutes').
     */
    minutesFromDate: function(minutes) {
        return this.millisecondsFromDate(minutes * 60 * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'seconds'. Basically it adds or
     * subtracts x times the milliseconds of a second, but also checks for clock changes and
     * automatically includes these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x seconds in the future (based on parameter 'seconds').
     */
    secondsFromNow: function(seconds) {
        var date = this.now();
        return date.secondsFromDate(seconds);
    },

    /**
     * This method returns a date in the future or past, based on 'seconds' and a given date. Basically
     * it adds or subtracts x seconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} seconds The number of seconds to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x seconds in the future (based on parameter 'seconds').
     */
    secondsFromDate: function(seconds) {
        return this.millisecondsFromDate(seconds * 1000);
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds'. Basically it adds or
     * subtracts x milliseconds, but also checks for clock changes and automatically includes these
     * into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     * @returns {M.Date} The current date, x milliseconds in the future (based on parameter 'milliseconds').
     */
    millisecondsFromNow: function(milliseconds) {
        var date = this.now();
        return date.millisecondsFromDate(milliseconds);
    },

    /**
     * This method returns a date in the future or past, based on 'milliseconds' and a given date. Basically
     * it adds or subtracts x milliseconds, but also checks for clock changes and automatically includes
     * these into the calculation of the future or past date.
     *
     * @param {Number} milliseconds The number of milliseconds to be added to or subtracted from the current date.
     * @returns {M.Date} The date, x milliseconds in the future (based on parameter 'milliseconds').
     */
    millisecondsFromDate: function(milliseconds) {
        if(!this.date) {
            M.Logger.log('no date specified!', M.ERR);
        }

        return this.extend({
            date: new Date(this.getTimestamp() + milliseconds)
        });
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
     * @param {Object} date The date.
     * @param {String} returnType The return type for the call.
     * @returns {Number} The time between the two dates, computed as what is specified by the 'returnType' parameter.
     */
    timeBetween: function(date, returnType) {
        var firstDateInMilliseconds = this.date ? this.getTimestamp() : null;
        var secondDateInMilliseconds = date.date ? date.getTimestamp() : null;
        
        if(firstDateInMilliseconds && secondDateInMilliseconds) {
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
        } else if(firstDateInMilliseconds) {
            M.Logger.log('invalid date passed.', M.ERR);
        } else {
            M.Logger.log('invalid date.', M.ERR);
        }
    },


    /**
     * This method computes the calendar week of a date. It can either be executed on a M.Date object,
     * to get the calendar week of that date, or you can pass parameters to get the calendar week
     * for the specified date.
     *
     * @param {Number} year The year part of the date, e.g. 2011. Must be four digits.
     * @param {Number} month The month part of the date: 0-11. Must be one/two digit.
     * @param {Number} day The day part of the date: 1-31. Must be one/two digits.
     *
     * @returns {Number} The calendar week: 1-52.
     */
    getCalendarWeek: function(year, month, day){
        if(!year) {
            year = parseInt(this.format('yyyy'));
            month = parseInt(this.format('m'));
            day = parseInt(this.format('d'));
        } else {
            month += 1;
        }

        var a = Math.floor((14 - (month)) / 12);
        var y = year + 4800 - a;
        var m = (month) + (12 * a) - 3;
        var jd = day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        var d4 = (jd + 31741 - (jd % 7)) % 146097 % 36524 % 1461;
        var L = Math.floor(d4 / 1460);
        var d1 = ((d4 - L) % 365) + L;
        var calendarWeek = Math.floor(d1 / 7) + 1;

        return calendarWeek;
    },

    /**
     * This method returns an array containing all dates within one calendar week. If no parameters are given,
     * the calendar week of the current date is taken.
     *
     * @param {Number} calendarWeek The calendar week. Note: Pass 'null' if you use this method on an existing M.Date object.
     * @param {Boolean} startWeekOnMonday Determines whether a week starts on monday or sunday (optional, default is NO).
     * @param {Number} year The year (optional, default is current year).
     *
     * @returns {Array} An array containing all dates within the specified calendar week.
     */
    getDatesOfCalendarWeek: function(calendarWeek, startWeekOnMonday, year) {
        year = year && !isNaN(year) ? year : (this.date ? this.format('yyyy') : M.Date.now().format('yyyy'));
        var newYear = M.Date.create('01/01/' + year);
        var newYearWeekDay = newYear.format('D');

        var firstWeek = null;
        if(startWeekOnMonday) {
            firstWeek = newYearWeekDay == 1 ? newYear : newYear.daysFromDate(8 - (newYearWeekDay == 0 ? 7 : newYearWeekDay));
        } else {
            firstWeek = newYearWeekDay == 0 ? newYear : newYear.daysFromDate(7 - newYearWeekDay);
        }

        calendarWeek = calendarWeek ? calendarWeek : this.getCalendarWeek();

        var requiredWeek = firstWeek.daysFromDate((calendarWeek - 1) * 7);

        var dates = [];
        for(var i = 0; i < 7; i++) {
            var date = requiredWeek.daysFromDate(i);
            date = M.Date.create(date.format('mm') + '/' + date.format('dd') + '/' + date.format('yyyy'));
            dates.push(date);
        }

        return dates;
    },

    /**
     * This method returns a date for a given calendar week and day of this week.
     *
     * @param {Number} calendarWeek The calendar week.
     * @param {Number} dayOfWeek The day of the week (0 = sunday, ..., 7 = saturday).
     * @param {Number} year The year (optional, default is current year).
     *
     * @returns {M.Date} The date.
     */
    getDateByWeekdayAndCalendarWeek: function(calendarWeek, dayOfWeek, year) {
        if(calendarWeek && !isNaN(calendarWeek) && ((dayOfWeek && !isNaN(dayOfWeek)) || dayOfWeek === 0)) {
            var dates = M.Date.getDatesOfCalendarWeek(calendarWeek, NO, year);
            if(dates && dates.length > 0 && dates[dayOfWeek]) {
                return dates[dayOfWeek];
            } else {
                M.Logger.log('Day ' + dayOfWeek + ' of calendar week ' + calendarWeek + ' could not be found!', M.ERR);
            }
        } else {
            M.Logger.log('Please pass a valid calendarWeek and a valid day of the week!', M.ERR);
        }
    },

    /**
     * This method is used for stringify an M.Date object, e.g. when persisting it into locale storage.
     *
     * @private
     * @returns {String} The date as a string.
     */
    toJSON: function() {
        return String(this.date);
    }

});
// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.Logger defines the prototype for any logging object.
 * It is used to log messages out of the application.
 * @module M.Logger
 *
 * @extends M.Object
 */
M.Logger = M.Object.design(/** @scope M.Logger.prototype */ {

    /**
     * Specifies which tags are displayed in the console.
     * Leave this properties empty to display all logs.
     *
     * M.Logger.filter('tag1');
     *
     * M.Logger.log('Init Module', 'tag1');               // will displayed
     * M.Logger.log('Get environment', 'tag2');           // will not displayed
     * M.Logger.log('Loading data', ['tag1', 'tag2']);    // will displayed
     * M.Logger.log('Loading images', ['tag2', 'tag3']);  // will not displayed
     *
     * @type Array
     */
    filter: [],

    /**
     * The type of this object.
     *
     * @type String
     */
    _type: 'M.Logger',

    /**
     * A constant value for logging output: log.
     *
     * @type Number
     * @private
     */
    _OUTPUT_LOG: 0,

    /**
     * A constant value for logging output: warning.
     *
     * @type Number
     * @private
     */
    _OUTPUT_DEBUG: 1,

    /**
     * A constant value for logging output: warning.
     *
     * @type Number
     * @private
     */
    _OUTPUT_WARN: 2,

    /**
     * A constant value for logging output: error.
     *
     * @type Number
     * @private
     */
    _OUTPUT_ERROR: 3,

    /**
     * A constant value for logging level: timeEnd.
     *
     * @type Number
     * @private
     */
    _LEVEL_TIME_END: 4,

    /**
     * This property holds the fallback entries for _time() / _timeEnd()
     *
     * @type Array
     */
    _times: [],

    /**
     * This property holds the fallback entries for _count()
     *
     * @type Array
     */
    _counts: [],

    /**
     * This property holds the debugMode from the config
     *
     * @type Boolean
     */
    _appRunsInNotDebugMode: NO,

    /**
     * Constructor method for M.Logger
     */
    _init: function() {

        // Prevent a console.log from blowing things up if we are on a browser that doesn't support this.
        if( _.isUndefined(console) ) {
            window.console = {};
            console.log = console.debug = console.warn = console.error = function() {
            };
        }

        // Check if app runs in debug mode
        // TODO: Get debugMode form config
        this._appRunsInNotDebugMode = NO;
    },

    /**
     * This method is used to log a message on logging level debug.
     *
     * @param {String/Array} tag
     * @param {...*} message The logging message.
     */
    log: function( ) {
        this._print(this._OUTPUT_LOG, arguments);
    },

    /**
     * This method is used to log a message on logging level warning.
     *
     * @param {String/Array} tag
     * @param {...*} message The logging message.
     */
    warn: function( ) {
        this._print(this._OUTPUT_WARN, arguments);
    },

    /**
     * This method is used to log a message on logging level error.
     *
     * @param {String/Array} tag
     * @param {...*} message The logging message.
     */
    error: function( tag, message ) {
        this._print(this._OUTPUT_ERROR, message, tag);
    },

    /**
     * Starts a new timer with an associated label.
     *
     * @param {String}
     */
    time: function( label ) {

        // Are we in production mode, then do not throw any logs
        if( this._appRunsInNotDebugMode ) {
            return;
        }

        // Fallback if the browser doesn't support time
        if( _.isUndefined(console.time2) ) {
            this._time(label);
            return;
        }
        console.time(label);
    },

    /**
     * Stops the timer with the specified label and prints the elapsed time.
     *
     * @param {String}
     */
    timeEnd: function( label ) {

        // Are we in production mode, then do not throw any logs
        if( this._appRunsInNotDebugMode ) {
            return;
        }

        // Fallback if the browser doesn't support timeEnd
        if( _.isUndefined(console.timeEnd2) ) {
            this._timeEnd(label);
            return;
        }
        console.timeEnd(label);
    },

    /**
     *  Writes the number of times that count() has been invoked with the same label.
     *
     * @param {String}
     */
    count: function( label ) {

        // Are we in production mode, then do not throw any logs
        if( this._appRunsInNotDebugMode ) {
            return;
        }

        // Fallback if the browser doesn't support count
        if( _.isUndefined(console.count2) ) {
            this._count(label);
            return;
        }
        console.count(label);
    },

    /**
     * This method is used to log anything out of an application based on the given logging level.
     *
     * @param {String} message The logging message.
     * @param {Number} output The logging level.
     * @param {String/Array} tag
     * @private
     */
    _print: function( output, args ) {

        // Are we in production mode, then do not throw any logs
        if( this._appRunsInNotDebugMode ) {
            return;
        }

        // Assign default level if level is undefined
        output = output || this._OUTPUT_LOG;

        args = Array.prototype.slice.call(args);

        // Assign default tag if tag is undefined
        if( args.length === 1 ) {
            args.splice(0, 0, M.CONST.LOGGER.TAG_ALL);
        }

        var tags = args[0];

        if( this._preventOutputByTag(tags) ) {
            return;
        }

        var prettyTagName = '';
        if( output < this._OUTPUT_ERROR ) {
            if( _.isArray(tags) && this.filter.length > 0 ) {
                var tagString = _.without(this.filter, tags);
                prettyTagName = '[' + tagString + ']';
            } else if( tags.length > 0 ) {
                prettyTagName = '[' + tags + ']';
            }
        }

        if( args.length > 1 ) {
            if( prettyTagName === M.CONST.LOGGER.TAG_ALL ) {
                args.splice(0, 1);
            } else {
                args[0] = prettyTagName;
            }
        }

        switch( output ) {
            case this._OUTPUT_LOG:
                console.log.apply(console, args);
                break;
            case this._OUTPUT_WARN:
                args.splice(0, 0, 'WARNING:');
                console.warn.apply(console, args);
                break;
            case this._OUTPUT_ERROR:
                args.splice(0, 0, 'ERROR:');
                console.error.apply(console, args);
                break;
            case this._OUTPUT_DEBUG:
                console.debug.apply(console, args);
                break;
            default:
                console.log.apply(console, args);
                break;
        }
    },

    /**
     * Fallback if the browser doesn't support time
     *
     * @private
     */
    _time: function( label ) {
        var item = _.find(this._times, function( item ) {
            return item.label === label;
        });
        if( !item ) {
            this._times.push({
                label: label,
                time: new Date().getTime()
            });
        }
    },

    /**
     * Fallback if the browser doesn't support timeEnd
     *
     * @private
     */
    _timeEnd: function( label ) {
        var item = _.find(this._times, function( item ) {
            return item.label === label;
        });
        if( item ) {
            var now = new Date().getTime();
            var diff = (now - item.time) / 1000;
            var index = this._times.indexOf(item);
            this._print(this._OUTPUT_DEBUG, [item.label + ': ' + diff + 'ms']);
            this._times.splice(index, 1);
        }
    },

    /**
     * Fallback if the browser doesn't support count
     *
     * @private
     */
    _count: function( label ) {
        var item = _.find(this._counts, function( item ) {
            return item.label === label;
        });
        if( item === undefined ) {
            this._counts.push({
                label: label,
                count: 1
            });
            item = _.last(this._counts);
        } else {
            item.count++;
        }

        this._print(this._OUTPUT_DEBUG, [item.label + ': ' + item.count]);
    },

    /**
     * Prevent a print() call if the tag is not defined in filter.
     *
     * @param tag {String/Array}
     * @returns {boolean}
     * @private
     */
    _preventOutputByTag: function( tag ) {
        if( this.filter.length > 0 && this.filter.indexOf(M.CONST.TAG_ALL) === -1 ) {
            if( _.isString(tag) ) {
                if( this.filter.indexOf(tag) === -1 ) {
                    return YES;
                }
            } else if( _.isArray(tag) ) {
                if( _.difference(tag, this.filter).length === tag.length ) {
                    return YES;
                }
            }
        }
        return NO;
    }

});
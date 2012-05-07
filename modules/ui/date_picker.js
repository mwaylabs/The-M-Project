// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
//            (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      04.02.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * This defines the prototype for a date picker view. A date picker is a special view, that can
 * be called out of a controller. It is shown as a date picker popup, based on the mobiscroll
 * library. You can either connect a date picker with an existing view and automatically pass
 * the selected date to the source's value property, or you can simply use the date picker to
 * select a date, return it to the controller (respectively the callback) and handle the date
 * by yourself.
 *
 * @extends M.View
 */
M.DatePickerView = M.View.extend(
/** @scope M.DatePickerView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DatePickerView',

    /**
     * This property is used to link the date picker to a source. You can either pass the DOM id of
     * the corresponding source or the javascript object itself. Linking the date picker directly
     * to a source results in automatic value updates of this source.
     *
     * Note: Valid sources need to provide a setValue() method.
     *
     * If you do not pass a source, the date picker isn't linked to any view. It simply returns the
     * selected value/date to given callbacks. So you can call the date picker out of a controller
     * and handle the selected date all by yourself.
     *
     * @type String|Object
     */
    source: null,

    /**
     * This property can be used to specify several callbacks for the date picker view. There are
     * three types of callbacks available:
     *
     *     - before
     *         This callback gets called, right before the date picker is shown. It passes along two
     *         parameters:
     *             - value      -> The initial date of the date picker, formatted as a string
     *             - date       -> The initial date of the date picker as d8 object
     *     - confirm
     *         This callback gets called, when a selected date was confirmed. It passes along two
     *         parameters:
     *             - value      -> The selected date of the date picker, formatted as a string
     *             - date       -> The selected date of the date picker as d8 object
     *     - cancel
     *         This callback gets called, when the cancel button is hit. It doesn't pass any
     *         parameters.
     *
     * Setting up one of those callbacks works the same as with other controls of The-M-Project. You
     * simply have to specify an object containing a target function, e.g.:
     *
     * callbacks: {
     *     confirm: {
     *         target: this,
     *         action: 'dateSelected'
     *     },
     *     cancel: {
     *         action: function() {
     *             // do something
     *         }
     *     }
     * }
     *
     * @type Object
     */
    callbacks: null,

    /**
     * This property can be used to specify the initial date for the date picker. If you use the
     * date picker without a source, this date is always picked as the initial date. If nothing is
     * specified, the current date will be displayed.
     *
     * If you use the date picker with a valid source, the initial date is picked as long as there
     * is no valid date available by the source. Once a date was selected and assigned to the source,
     * this is taken as initial date the next time the date picker is opened.
     *
     * @type Object|String
     */
    initialDate: null,

    /**
     * This property can be used to determine whether to use the data source's value as initial date
     * or not. If there is no source specified, this property is irrelevant.
     *
     * Note: If there is a source specified and this property is set to NO, the 'initialDate' property
     * will be used anyway if there is no date value available for the source!
     *
     * @type Boolean
     */
    useSourceDateAsInitialDate: YES,

    /**
     * This property can be used to specify whether to show scrollers for picking a date or not.
     *
     * Note: If both this and the 'showTimePicker' property are set to NO, no date picker will
     * be shown!
     *
     * @type Boolean
     */
    showDatePicker: YES,

    /**
     * This property can be used to specify whether to show scrollers for picking a time or not.
     *
     * Note: If both this and the 'showDatePicker' property are set to NO, no date picker will
     * be shown!
     *
     * @type Boolean
     */
    showTimePicker: YES,

    /**
     * This property can be used to specify whether or not to show labels above of the scrollers.
     * If set to YES, the labels specified with the '...Label' properties are displayed above of
     * the corresponding scroller.
     *
     * @type Boolean
     */
    showLabels: YES,

    /**
     * This property specified the label shown above of the 'year' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    yearLabel: 'Year',

    /**
     * This property specified the label shown above of the 'month' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    monthLabel: 'Month',

    /**
     * This property specified the label shown above of the 'day' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    dayLabel: 'Day',

    /**
     * This property specified the label shown above of the 'hours' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    hoursLabel: 'Hours',

    /**
     * This property specified the label shown above of the 'minutes' scroller.
     *
     * Note: This label is only shown if the 'showLabels' property is set to YES.
     *
     * @type String
     */
    minutesLabel: 'Minutes',

    /**
     * You can use this property to enable or disable the AM/PM scroller. If set to NO, the
     * date picker will use the 24h format.
     *
     * @type Boolean
     */
    showAmPm: YES,

    /**
     * This property can be used to specify the first year of the 'year' scroller. By default,
     * this will be set to 20 years before the current year.
     *
     * @type Number
     */
    startYear: null,

    /**
     * This property can be used to specify the last year of the 'year' scroller. By default,
     * this will be set to 20 years after the current year.
     *
     * @type Number
     */
    endYear: null,

    /**
     * This property can be used to customize the date format of the date picker. This is important
     * if you use the date picker on a valid source since the date picker will then automatically
     * push the selected date/datetime to the 'value' property of the source - based on this format.
     *
     * The possible keys:
     *
     *     - m      -> month (without leading zero)
     *     - mm     -> month (two-digit)
     *     - M      -> month name (short)
     *     - MM     -> month name (long)
     *     - d      -> day (without leading zero)
     *     - d      -> day (two digit)
     *     - D      -> day name (short)
     *     - DD     -> day name (long)
     *     - y      -> year (two digit)
     *     - yy     -> year (four digit)
     *
     * @type String
     */
    dateFormat: 'M dd, yy',

    /**
     * This property can be used to customize the date format of the date picker if it is associated
     * with a text input with the type 'month'. It works the same as the dateFormat property.
     *
     * @type String
     */
    dateFormatMonthOnly: 'MM yy',

    /**
     * This property can be used to customize the time format of the date picker. This is important
     * if you use the date picker on a valid source since the date picker will then automatically
     * push the selected time/datetime to the 'value' property of the source - based on this format.
     *
     * The possible keys:
     *
     *     - h      -> hours (without leading zero, 12h format)
     *     - hh     -> hours (two-digit, 12h format)
     *     - H      -> hours (without leading zero, 24h format)
     *     - HH     -> hours (two-digit, 24h format)
     *     - i      -> minutes (without leading zero)
     *     - ii     -> minutes (two-digit)
     *     - A      -> AM/PM
     *
     * @type String
     */
    timeFormat: 'h:ii A',

    /**
     * This property determines the order and formating of the date scrollers. The following keys
     * are possible:
     *
     *     - m      -> month (without leading zero)
     *     - mm     -> month (two-digit)
     *     - M      -> month name (short)
     *     - MM     -> month name (long)
     *     - d      -> day (without leading zero)
     *     - d      -> day (two digit)
     *     - y      -> year (two digit)
     *     - yy     -> year (four digit)
     *
     * By default, we use this format: Mddyy
     *
     * @type String
     */
    dateOrder: 'Mddyy',

    /**
     * This property determines the order and formating of the date scrollers if it is associated
     * with an input field of type 'month'. It works the same as the dateOrder property.
     *
     * By default, we use this format: MMyy
     *
     * @type String
     */
    dateOrderMonthOnly: 'MMyy',



    /**
     * This property specifies a list of full month names.
     *
     * @type Array
     */
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    /**
     * This property specifies a list of short month names.
     *
     * @type Array
     */
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    /**
     * This property specifies a list of full day names.
     *
     * @type Array
     */
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    /**
     * This property specifies a list of short day names.
     *
     * @type Array
     */
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    /**
     * This property can be used to specify the label of the date picker's cancel button. By default
     * it shows 'Cancel'.
     *
     * @type String
     */
    cancelButtonValue: 'Cancel',

    /**
     * This property can be used to specify the label of the date picker's cancel button. By default
     * it shows 'Ok'.
     *
     * @type String
     */
    confirmButtonValue: 'Ok',

    /**
     * This property can be used to specify the steps between hours in the time / date-time picker.
     *
     * @type Number
     */
    stepHour: 1,

    /**
     * This property can be used to specify the steps between minutes in the time / date-time picker.
     *
     * @type Number
     */
    stepMinute: 1,

    /**
     * This property can be used to specify the steps between seconds in the time / date-time picker.
     *
     * @type Number
     */
    stepSecond: 1,

    /**
     * This property can be used to activate the seconds wheel on a time/date-time picker.
     *
     * @type Boolean
     */
    seconds: NO,

    /**
     * This property is used internally to indicate whether the current date picker works on a valid
     * source or was called without one. This is important for stuff like auto-updating the source's
     * DOM representation.
     *
     * @private
     */
    hasSource: YES,

    /**
     * This property is used internally to state whether a value, respectively a date, was selected
     * or not.
     *
     * @private
     * @type Boolean
     */
    isValueSelected: NO,

    /**
     * This property is used internally to state whether a the date picker is currently activated
     * or not.
     *
     * @private
     * @type Boolean
     */
    isActive: NO,

    /**
     * This method is the only important method of a date picker view for 'the outside world'. From within
     * an application, simply call this method and pass along an object, containing all the properties
     * you want to set, different from default.
     *
     * A sample call:
     *
     * M.DatePickerView.show({
     *     source: M.ViewManager.getView('mainPage', 'myTextField')
     *     initialDate: D8.create('30.04.1985 10:30'),
     *     callbacks: {
     *          confirm: {
     *              target: this,
     *              action: function(value, date) {
     *                  // do something...
     *              }
     *          }
     *     }
     * });
     *
     * @param obj
     */
    show: function(obj) {
        var datepicker = M.DatePickerView.design(obj);

        /* if a datepicker is active already, return */
        if(Object.getPrototypeOf(datepicker).isActive) {
            return;
        /* otherwise go on and set the flag to active */
        } else {
            Object.getPrototypeOf(datepicker).isActive = YES;
        }

        /* check if it's worth the work at all */
        if(!(datepicker.showDatePicker || datepicker.showTimePicker)) {
            M.Logger.log('In order to use the M.DatepickerView, you have to set the \'showDatePicker\' or \'showTimePicker\' property to YES.', M.ERR);
            return;
        }

        /* calculate the default start and end years */
        this.startYear = this.startYear ? this.startYear : D8.now().format('yyyy') - 20;
        this.endYear = this.endYear ? this.endYear : D8.now().format('yyyy') + 20;

        /* check if we got a valid source */
        if(datepicker.source) {
            /* if we got a view, get its id */
            datepicker.source = typeof(datepicker.source) === 'object' && datepicker.source.type ? datepicker.source.id : datepicker.source;

            var view = M.ViewManager.getViewById(datepicker.source);
            if(view && typeof(view.setValue) === 'function' && $('#' + datepicker.source) && $('#' + datepicker.source).length > 0) {
                datepicker.init();
            } else {
                M.Logger.log('The specified source for the M.DatepickerView is invalid!', M.ERR);
            }
        } else {
            /* use default source (the current page) */
            datepicker.hasSource = NO;
            var page = M.ViewManager.getCurrentPage();
            if(page) {
                datepicker.source = page.id;
                datepicker.init();
            }
        }
    },

    /**
     * This method is used internally to communicate with the mobiscroll library. It actually initializes
     * the creation of the date picker and is responsible for reacting on events. If the cancel or confirm
     * button is hit, this method dispatches the events to the corresponding callbacks.
     *
     * @private
     */
    init: function() {
        var that = this;
        $('#' + this.source).scroller({
            preset: (this.showDatePicker && this.showTimePicker ? 'datetime' : (this.showDatePicker ? 'date' : (this.showTimePicker ? 'time' : null))),
            ampm: this.showAmPm,
            startYear: this.startYear,
            endYear: this.endYear,
            dateFormat: this.dateFormat,
            timeFormat: this.timeFormat,
            dateOrder: this.dateOrder,
            dayText: this.dayLabel,
            hourText: this.hoursLabel,
            minuteText: this.minutesLabel,
            monthText: this.monthLabel,
            yearText: this.yearLabel,
            monthNames: this.monthNames,
            monthNamesShort: this.monthNamesShort,
            dayNames: this.dayNames,
            dayNamesShort: this.dayNamesShort,
            cancelText: this.cancelButtonValue,
            setText: this.confirmButtonValue,
            stepHour: this.stepHour,
            stepMinute: this.stepMinute,
            stepSecond: this.stepSecond,
            seconds: this.seconds,

            /* now set the width of the scrollers */
            width: (M.Environment.getWidth() - 20) / 3 - 20 > 90 ? 90 : (M.Environment.getWidth() - 20) / 3 - 20,

            beforeShow: function(input, scroller) {
                that.bindToCaller(that, that.beforeShow, [input, scroller])();
            },
            onClose: function(value, scroller) {
                that.bindToCaller(that, that.onClose, [value, scroller])();
            },
            onSelect: function(value, scroller) {
                that.bindToCaller(that, that.onSelect, [value, scroller])();
            }
        });
        $('#' + this.source).scroller('show');
    },

    /**
     * This method is used internally to handle the 'beforeShow' event. It does some adjustments to the
     * rendered scroller by mobiscroll and finally calls the application's 'before' callback, if it is
     * defined.
     *
     * @param source
     * @param scroller
     */
    beforeShow: function(source, scroller) {
        var source = null;
        var date = null;

        /* try to set the date picker's initial date based on its source */
        if(this.hasSource && this.useSourceDateAsInitialDate) {
            source = M.ViewManager.getViewById(this.source);
            if(source.value) {
                try {
                    date = D8.create(source.value);
                } catch(e) {

                }
                if(date) {
                    if(date.format('yyyy') < this.startYear) {
                        if(this.hasOwnProperty('startYear')) {
                            M.Logger.log('The given date of the source (' + date.format('yyyy') + ') conflicts with the \'startYear\' property (' + this.startYear + ') and therefore will be ignored!', M.WARN);
                        } else {
                            M.Logger.log('The date picker\'s default \'startYear\' property (' + this.startYear + ') conflicts with the given date of the source (' + date.format('yyyy') + ') and therefore will be ignored!', M.WARN);
                            $('#' + this.source).scroller('option', 'startYear', date.format('yyyy'));
                            $('#' + this.source).scroller('setDate', date.date);
                        }
                    } else {
                        $('#' + this.source).scroller('setDate', date.date);
                    }
                }
            }
        }

        /* if there is no source or the retrieval of the date went wrong, try to set it based on the initial date property */
        if(this.initialDate && !date) {
            if(this.initialDate.date) {
                date = this.initialDate;
            } else {
                try {
                    date = D8.create(this.initialDate);
                } catch(e) {

                }
            }
            if(date) {
                if(date.format('yyyy') < this.startYear) {
                    if(this.hasOwnProperty('startYear')) {
                        M.Logger.log('The specified initial date (' + date.format('yyyy') + ') conflicts with the \'startYear\' property (' + this.startYear + ') and therefore will be ignored!', M.WARN);
                    } else {
                        M.Logger.log('The date picker\'s default \'startYear\' property (' + this.startYear + ') conflicts with the specified initial date (' + date.format('yyyy') + ') and therefore will be ignored!', M.WARN);
                        $('#' + this.source).scroller('option', 'startYear', date.format('yyyy'));
                        $('#' + this.source).scroller('setDate', date.date);
                    }
                } else {
                    $('#' + this.source).scroller('setDate', date.date);
                }
            }
        }

        /* now we got the date (or use the current date as default), lets compute this as a formatted text for the callback */
        value = scroller.formatDate(
            this.showDatePicker ? this.dateFormat + (this.showTimePicker ? ' ' + this.timeFormat : '') : this.timeFormat,
            scroller.getDate()
        );

        /* kill parts of the scoller */
        $('.dwv').remove();

        /* give it some shiny jqm style */
        window.setTimeout(function() {
            $('.dw').addClass('ui-btn-up-a');
        }, 1);

        /* disable scrolling for the background */
        $('.dwo').bind('touchmove', function(e) {
            e.preventDefault();
        });

        /* inject TMP buttons*/
        var confirmButton = M.ButtonView.design({
            value: this.confirmButtonValue,
            cssClass: 'b tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    action: function() {
                        $('#dw_set').trigger('click');
                    }
                }
            }
        });
        var cancelButton = M.ButtonView.design({
            value: this.cancelButtonValue,
            cssClass: 'd tmp-dialog-smallerbtn-confirm',
            events: {
                tap: {
                    action: function() {
                        $('#dw_cancel').trigger('click');
                    }
                }
            }
        });

        if(this.showDatePicker) {
            var grid = M.GridView.design({
                childViews: 'confirm cancel',
                layout: M.TWO_COLUMNS,
                cssClass: 'tmp-datepicker-buttongrid',
                confirm: confirmButton,
                cancel: cancelButton
            });

            var html = grid.render();
            $('.dw').append(html);
            grid.theme();
            grid.registerEvents();
        } else {
            var html = confirmButton.render();
            html += cancelButton.render();
            $('.dw').append(html);
            confirmButton.theme();
            confirmButton.registerEvents();
            cancelButton.theme();
            cancelButton.registerEvents();
        }

        /* hide default buttons */
        $('#dw_cancel').hide();
        $('#dw_set').hide();

        /* add class to body as selector for showing/hiding labels */
        if(!this.showLabels) {
            $('body').addClass('tmp-datepicker-no-label');
        }

        /* call callback */
        if(this.callbacks && this.callbacks['before'] && M.EventDispatcher.checkHandler(this.callbacks['before'])) {
            M.EventDispatcher.callHandler(this.callbacks['before'], null, NO, [value, date]);
        }
    },

    onClose: function(value, scroller) {
        /* set value if one was selected */
        var source = null;
        var date = null;
        if(this.isValueSelected) {
            /* first compute the date */
            try {
                date = D8.create(scroller.getDate());
            } catch(e) {

            }

            /* now, if there is a source, auto-update its value */
            if(this.hasSource) {
                source = M.ViewManager.getViewById(this.source);
                if(source) {
                    source.setValue(value, NO, YES);
                }
            }
        }

        /* remove class from body as selector for showing/hiding labels */
        if(!this.showLabels) {
            $('body').removeClass('tmp-datepicker-no-label');
        }

        /* call cancel callback */
        if(!this.isValueSelected && this.callbacks && this.callbacks['cancel'] && M.EventDispatcher.checkHandler(this.callbacks['cancel'])) {
            M.EventDispatcher.callHandler(this.callbacks['cancel'], null, NO, []);
        } else if(this.isValueSelected && this.callbacks && this.callbacks['confirm'] && M.EventDispatcher.checkHandler(this.callbacks['confirm'])) {
            M.EventDispatcher.callHandler(this.callbacks['confirm'], null, NO, [value, date]);
        }

        /* kill the datepicker */
        Object.getPrototypeOf(this).isActive = NO;
        $('#' + this.source).scroller('destroy');
        $('.dwo').remove();
        $('.dw').remove();
        this.destroy();
    },

    onSelect: function(value) {
        /* mark the datepicker as 'valueSelected' */
        this.isValueSelected = YES;
    }

});
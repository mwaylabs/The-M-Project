/**
 * @class
 *
 * This defines the prototype of a toggle switch view
 *
 * General spoken it is an Boolean switch.
 *
 * @extends M.View
 */
M.ToggleSwitchView = M.View.extend(
    /** @scope M.ToggleSwitchView.prototype */ {

        /**
         * The type of this object.
         *
         * @type String
         */
        type:'M.ToggleSwitchView',

        /**
         * From the jQuery mobile page: "All form controls accept a data-mini="true" attribute that renders a smaller version of the standard-sized form elements. In the case of grouped buttons, the data-mini="true" attribute can be added to the containing controlgroup. Compare mini and normal form elements side-by-side."
         *
         * @type Boolean
         */
        isMini:NO,


        /**
         *
         * Think of it as an boolean switch so the on value is set default to true
         * It is set through the render function. If there is no label defined the label gets set by the value.
         *
         * @type String
         */
        onLabel:'',

        /**
         *
         * Think of it as an boolean switch so the off value is set default to false
         * It is set through the render function. If there is no label defined the label gets set by the value.
         *
         * @type String
         */
        offLabel:'',

        /**
         *
         * Think of it as an boolean switch so the on value is set default to true
         *
         * @default YES
         * @type Boolean but could be anything
         */

        onValue:YES,

        /**
         *
         * Think of it as an boolean switch so the off value is set default to false
         *
         * @default NO
         * @type Boolean but could be anything
         */
        offValue:NO,

        /**
         * Optionally wrap the switch markup in a container with the data-role="fieldcontain" attribute to help visually group it in a longer form.
         * @default YES
         * @type Boolean
         */
        fieldcontain:NO,


        /**
         * This property specifies the recommended events for this type of view.
         *
         * @type Array
         */
        recommendedEvents: ['change'],


        /**
         * Renders a selection list.
         *
         * @private
         * @returns {String} The toggle switch view's html representation.
         */
        render:function () {

            this.html = '';
            /* if there is no label put the value as label */
            if (!this.onLabel) {
                this.onLabel = this.onValue;
            }

            /* if there is no label put the value as label */
            if (!this.offLabel) {
                this.offLabel = this.offValue;
            }

            var dataRoleFieldContain = '';

            /*is there is a fieldcontain defined use it*/
            if (this.fieldcontain) {
                dataRoleFieldContain = ' data-role="fieldcontain" ';
            }

            /*should the element be inline?*/
            var isInline = '';
            if (this.isInline) {
                isInline = ' style="display: inline-block" ';
            }

            /*add the label to the view*/
            if (this.label) {
                this.html += '<label' + isInline + ' for="' + this.id + '">' + this.label + '</label>';
            }

            /* build the markup as jquerymobile likes it */
            this.html += '<div' + dataRoleFieldContain + isInline + ' id="' + this.id + '_container" ' + this.style() + '>';
            this.html += '<select name="' + this.id + '" id="' + this.id + '" data-role="slider" data-mini="' + this.isMini + '">';
            this.html += '<option value="' + this.offValue + '">' + this.offLabel + '</option>';
            this.html += '<option value="' + this.onValue + '">' + this.onLabel + '</option>';
            this.html += '</select>';

            this.html += '</div>';


            /* return the markup*/
            return this.html;
        },

        theme: function(){

        },

        /**
         *
         * add the class attribute to the HTML
         *
         * @return {String}
         */

        style:function () {
            var html = ' class="';
            if (this.cssClass) {
                html += this.cssClass;
            }
            html += '" ';
            return html;
        },


        /**
         *
         * returns the value of the selection
         *
         * @return {*} the value of the selection
         */
        getValue:function () {
            var val = $('#' + this.id).val();
            return val;
        },

        /**
         *
         * pass either the name of the option or its value to set the option and toggle the slider
         *
         * @param val the value to be set
         */
        setValue:function (val) {
            //if the name matchs set the option to selected otherwise test the given parameter to the option value
            var useValue = true;
            $('#' + this.id + ' option').each(function () {
                if ($(this).html() === val) {
                    $(this).attr('selected', 'selected');
                    useValue = false;
                }
            });
            if (useValue) {
                //is there an option with the paramet as value. if so then select it
                $('#' + this.id + ' option[value*=' + val + ']').attr('selected', 'selected');
            }
            //toggle the view
            $('#' + this.id).slider('refresh');
        },


        /**
         * sets the value of the toggle switch to onValue
         */
        on:function () {
            this.setValue(this.onValue);
        },

        /**
         * sets the value of the toggle switch to offValue
         */
        off:function () {
            this.setValue(this.offValue);
        },


        /**
         * enable the toggle switch view
         */
        enable:function () {
            $('#' + this.id).slider('enable');
        },


        /**
         * disable the toggle switch view
         */
        disable:function () {
            $('#' + this.id).slider('disable');
        }

    })





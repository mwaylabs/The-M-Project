// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   dominik
// Date:      05.12.11
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @class
 *
 * The M.TableView renders a default HTML table, that can be dynamically filled via
 * content binding. Depending on the table's configuration, there will be a static
 * table header, that is visible even if there is no content. It is also possible
 * to always update the header, when applying content binding, too.
 *
 * @extends M.View
 */
M.TableView = M.View.extend(
/** @scope M.TableView.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.TableView',

    /**
     * Determines whether to remove all content rows if the table is updated or not.
     *
     * @type Boolean
     */
    removeContentRowsOnUpdate: YES,

    /**
     * Determines whether to remove the header rows if the table is updated or not.
     *
     * @type Boolean
     */
    removeHeaderRowOnUpdate: NO,

    /**
     * Determines whether the table was initialized. If this flag is set to YES,
     * the table's header and colgroup was rendered. Depending on the table's
     * configuration (e.g. the removeHeaderRowOnUpdate property), this flag might
     * change dynamically at runtime.
     *
     * @private
     * @type Boolean
     */
    isInitialized: NO,

    /**
     * This property can be used to specify the table's header and cols, independent
     * from dynamically loaded table content. It can be provided with the table's
     * definition within a page component. The table's content, in contrast, can only
     * be applied via content binding.
     *
     * Note: If the removeHeaderRowOnUpdate property is set to YES, the header will
     * be removed whenever a content binding is applied. So if the header shall be
     * statically specified by the view component, do not set that property to YES!
     *
     * This property should look something like the following:
     *
     *   {
     *     data: ['col1', 'col2', 'col3'],
     *     cols: ['20%', '10%', '70%']
     *   }
     *
     * Note: the cols property of this object is optional. You can also let CSS take
     * care of the columns arrangement or simply let the browser do all the work
     * automatically.
     *
     * @type Object
     */
    header: null,

    /**
     * Renders a table view as a table element within a div box.
     *
     * @private
     * @returns {String} The table view's html representation.
     */
    render: function() {
        this.html += '<div id="' + this.id + '_container"><table id="' + this.id +'"' + this.style() + '><thead></thead><tbody></tbody></table></div>';

        return this.html;
    },

    /**
     * Applies some style-attributes to the table.
     *
     * @private
     * @returns {String} The table's styling as html representation.
     */
    style: function() {
        var html = ' class="tmp-table';
        if(this.cssClass) {
            html += ' ' + this.cssClass;
        }
        html += '"'
        return html;
    },

    /**
     * This method is called once the initial rendering was applied to the
     * DOM. So this is where we will add the table's header (if there is
     * one specified)
     */
    theme: function() {
        if(this.header) {
            this.renderHeader();
        }
    },

    /**
     * This method renders the table's header. Based on the table's configuration,
     * this can either happen right at the first rendering or on every content
     * binding update.
     *
     * @private
     */
    renderHeader: function() {
        /* render the table header (if there is one) and define the cols */
        if(this.header && this.header.data) {

            /* render the colgroup element (define the columns) */
            if(this.header.cols && this.header.cols.length > 0) {
                html = '<colgroup>';
                _.each(this.header.cols, function(col) {
                    html += '<col width="' + col + '">';
                });
                html += '</colgroup>';
                $('#' + this.id).prepend(html);
            }

            /* render the table header */
            html = '<tr>';
            _.each(this.header.data, function(col) {
                html += '<th class="tmp-table-th">' + (col && col.toString() ? col.toString() : '') + '</th> ';
            });
            html += '</tr>';
            this.addRow(html, YES);
        }
    },

    /**
     * Updates the table based on its content binding. This should look like the following:
     *
     *   {
     *     header: {
     *       data: ['col1', 'col2', 'col3'],
     *       cols: ['20%', '10%', '70%']
     *     },
     *     content: [
     *       [25, 'Y, 'Lorem Ipsum'],
     *       [25, 46, 'Dolor Sit'],
     *       [25, 46, 'Amet']
     *     ]
     *   }
     *
     * Note: If the content binding specifies a header object, any previously rendered
     * header (and the col definition) will be overwritten!
     *
     * @private
     */
    renderUpdate: function() {
        var html;
        var content = this.value;

        /* clear the table before filling it up again */
        if(this.removeHeaderRowOnUpdate && this.removeContentRowsOnUpdate) {
            this.removeAllRows();
        } else if(this.removeContentRowsOnUpdate) {
            this.removeContentRows();
        }

        if(content && content.content && content.content.length > 0) {

            /* render the table header (if there is one) */
            if(content.header && content.header.data) {
                this.header = content.header;
                this.renderHeader();
            }

            /* render the table's content (row by row) */
            if(content.content && content.content.length > 0) {
                var that = this;
                var zebraFlag = 0;
                _.each(content.content, function(row) {
                    zebraFlag = (zebraFlag === 0 ? 1 : 0);
                    html = '<tr class="tmp-table-tr-' + (zebraFlag === 1 ? 'a' : 'b') + '">';
                    _.each(row, function(col) {
                        html += '<td class="tmp-table-td">' + (col && col.toString() ? col.toString() : '') + '</td> ';
                    });
                    html += '</tr>';
                    that.addRow(html);
                });
            }

        }
        else {
            M.Logger.log('The specified content binding for the table view (' + this.id + ') is invalid!', M.WARN);
        }
    },

    /**
     * This method adds a new row to the table view by simply appending its html representation
     * to the table view inside the DOM. This method is based on jQuery's append().
     *
     * @param {String} row The html representation of a table row to be added.
     * @param {Boolean} addToTableHeader Determines whether or not to add the row to the table's header.
     */
    addRow: function(row, addToTableHeader) {
        if(addToTableHeader) {
            $('#' + this.id + ' thead').append(row);
        } else {
            $('#' + this.id + ' tbody').append(row);
        }
    },

    /**
     * This method removes all of the table view's rows by removing all of its content in the DOM. This
     * method is based on jQuery's empty().
     */
    removeAllRows: function() {
        $('#' + this.id).empty();
    },

    /**
     * This method removes all content rows of the table view by removing the corresponding
     * html in the DOM. This method is based on jQuery's remove().
     */
    removeContentRows: function() {
        $('#' + this.id + ' tr td').parent().remove();
    }

});
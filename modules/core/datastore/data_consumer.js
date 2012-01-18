// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2011 panacoda GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.07.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('core/utility/logger.js');

/**
 * @class
 *
 * A data consumer can be called a read-only data provider. It's only job is it to retrieve some data form
 * remote services, e.g. a webservice, and to push them into the store.
 *
 * Note: So far we only support data in JSON format!
 *
 * @extends M.Object
 */
M.DataConsumer = M.Object.extend(
/** @scope M.DataConsumer.prototype */ {

    /**
     * The type of this object.
     *
     * @type String
     */
    type: 'M.DataConsumer',

    /**
     * This property can be used to specify the path to the desired data within
     * the response. Simply name the path by concatenating the path parts with
     * a '.', e.g.: 'path.to.my.desired.response'.
     *
     * @type String
     */
    responsePath: null,

    /**
     * This property specifies the used http method for the request. By default
     * GET is used.
     *
     * @type String
     */
    httpMethod: 'GET',

    /**
     * This property can be used to specify whether or not to append any fetched
     * data sets to the existing records. If set to NO, the model's records are
     * removed whenever the find() method is called.
     *
     * @type Boolean
     */
    appendRecords: YES,

    /**
     * The urlParams property will be pushed to the url() method of your data
     * consumer. This should look like:
     *
     *   url: function(query, rpp) {
     *     return 'http://www.myserver.com/request?query=' + query + '&rpp=' + rpp
     *   }
     *
     * @type String
     */
    urlParams: null,

    /**
     * Use this method within your model to configure the data consumer. Set
     * resp. override all the default object's properties, e.g.:
     *
     *   {
     *     urlParams: {
     *       query: 'html5',
     *       rpp: 10
     *     },
     *     appendRecords: YES,
     *     callbacks: {
     *       success: {
     *         target: MyApp.MyController,
     *         action: 'itWorked'
     *       },
     *       error: {
     *         action: function(e) {
     *           console.log(e);
     *         }
     *       }
     *     },
     *     map: function(obj) {
     *       return {
     *         userName: obj.from_user,
     *         userImage: obj.profile_image_url,
     *         createdAt: obj.created_at,
     *         tweet: obj.text
     *       };
     *     }
     *   }
     *
     * @param {Object} obj The configuration parameters for the data consumer.
     */
    configure: function(obj) {
        return this.extend(obj);
    },

    /**
     * This method is automatically called by the model, if you call the model's
     * find(). To execute the data consuming processs imply pass along an object
     * specifying the call's parameters as follows:
     *
     * {
     *   urlParams: {
     *     query: 'html5',
     *     rpp: 10
     *   }
     * }
     *
     * These parameters will automatically be added to the url, using the
     * url() method of your data consumer.
     *
     * Depending on the success/failure of the call, the specified success
     * resp. error callback will be called.
     *
     * @param {Object} obj The options for the call.
     */
    find: function(obj) {
        this.include(obj);

        var that = this;
        M.Request.init({
            url: this.bindToCaller(this, this.url, _.toArray(this.urlParams))(),
            isJSON: YES,
            callbacks: {
                success: {
                    target: this,
                    action: function(data, message, request){
                        /* if no data was returned, skip this */
                        if(data) {
                            /* apply response path */
                            if(this.responsePath) {
                                var responsePath = this.responsePath.split('.');
                                _.each(responsePath, function(subPath) {
                                    data = data[subPath];
                                });
                            }

                            /* if no data was found inside responsePath, skip */
                            if(data && !_.isArray(data) || _.isArray(data) && data.length > 0) {
                                /* make sure we've got an array */
                                if(!_.isArray(data)) {
                                    data = [data];
                                }

                                /* apply map function and create a record for all data sets */
                                var records = [];
                                _.each(data, function(d) {
                                    var record = obj.model.createRecord(that.map(d));
                                    records.push(record);
                                });

                                /* call callback */
                                if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                    M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [records]);
                                }
                            } else {
                                /* log message, that there were no data sets found in given response path */
                                M.Logger.log('There were no data sets found in response path \'' + this.responsePath + '\'.', M.INFO);

                                /* call callback */
                                if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                    M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [[]]);
                                }
                            }
                        } else {
                            /* log message, this there were no data sets returned */
                            M.Logger.log('There was no data returned for url \'' + this.bindToCaller(this, this.url, _.toArray(this.urlParams))() + '\'.', M.INFO);

                            /* call callback */
                            if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['success'])) {
                                M.EventDispatcher.callHandler(this.callbacks['success'], null, NO, [[]]);
                            }
                        }
                    }
                },
                error: {
                    target: this,
                    action: function(request, message){
                        /* call callback */
                        if(this.callbacks && M.EventDispatcher.checkHandler(this.callbacks['error'])) {
                            M.EventDispatcher.callHandler(this.callbacks['error'], null, NO, message);
                        }
                    }
                }
            }
        }).send();
    },

    /**
     * Override this method within the data consumer's configuration, to map
     * the response object to your model's properties as follows:
     *
     *   map: function(obj) {
     *       return {
     *           userName: obj.from_user,
     *           userImage: obj.profile_image_url,
     *           createdAt: obj.created_at,
     *           tweet: obj.text
     *       };
     *   }
     *
     * @param {Object} obj The response object.
     * @interface
     */
    map: function(obj) {
        // needs to be implemented by concrete data consumer object
    },

    /**
     * Override this method within the data consumer's configuration, to tell
     * the component which url to connect to and with which parameters as
     * follows:
     *
     *   url: function(query, rpp) {
     *     return 'http://www.myserver.com/request?query=' + query + '&rpp=' + rpp
     *   }
     *
     * The parameters passed to this method are defined by the configuration
     * of your data consumer. See the urlParams property for further information
     * about that.
     *
     * @interface
     */
    url: function() {
        // needs to be implemented by concrete data consumer object
    }

});
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      09.12.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

CRMLight.Customer = M.Model.create({
    __name__: 'Customer',

    nr: M.Model.attr('String', {    // customernr
        isRequired:NO
    }),

    gvl: M.Model.attr('String', {   // gvl
        isRequired:NO
    }),

    outlet: M.Model.attr('String', { // outlet
        isRequired:NO
    }),

    outletName: M.Model.attr('String', { // outletname
        isRequired:NO    
    }),

    customerName: M.Model.attr('String', { // customername
        isRequired:NO
    }),

    customerName2: M.Model.attr('String', { // customername2
        isRequired:NO
    }),

    pzo: M.Model.attr('String', {   // pzo
        isRequired:NO
    }),

    pzoName: M.Model.attr('String', {   // pzoname
        isRequired:NO
    }),

    createDate: M.Model.attr('String', { // createdate
        isRequired:NO
    }),

    modifyDate: M.Model.attr('Date', {  // modifydate
        isRequired: NO
    }),

    city: M.Model.attr('String', {  // city
        isRequired:NO
    }),

    zipCode: M.Model.attr('String', { // zipcode
        isRequired:NO
    }),

    street: M.Model.attr('String', { // street
        isRequired:NO
    }),

    houseNo: M.Model.attr('String', { // houseno
        isRequired:NO
    }),

    /*phone: M.Model.attr('String', { // tel
        isRequired:NO,
        validators: [M.PhoneValidator]
    }),

    email: M.Model.attr('String', { // email
        isRequired:NO,
        validators: [M.EmailValidator]
    }),*/

    contactName: M.Model.attr('String', { // namecontact
        isRequired:NO
    }),

    contactPerson: M.Model.attr('String', { // prescontact => maybe should be renamed to perscontact, bug?
        isRequired:NO
    }),

    segment: M.Model.attr('String', { // segment
        isRequired:NO
    }),

    cuas: M.Model.attr('String', { // cuas
        isRequired:NO
    }),

    zgpl: M.Model.attr('String', {
        isRequired:NO
    }),

    zp: M.Model.attr('String', {
        isRequired:NO
    }),

    kwa: M.Model.attr('String', {
        isRequired:NO
    }),

    read: M.Model.attr('Boolean', {
        isRequired:NO
    })

}, M.WebSqlProvider.configure({
    dbName: 'crm_light_db'
}));
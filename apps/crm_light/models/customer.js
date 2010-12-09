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
        isRequired:YES
    }),

    gvl: M.Model.attr('String', {   // gvl
        isRequired:YES
    }),

    outlet: M.Model.attr('String', { // outlet
        isRequired:YES
    }),

    outletName: M.Model.attr('String', { // outletname
        isRequired:YES    
    }),

    customerName: M.Model.attr('String', { // customername
        isRequired:YES
    }),

    customerName2: M.Model.attr('String', { // customername2
        isRequired:YES
    }),

    pzo: M.Model.attr('String', {   // pzo
        isRequired:YES
    }),

    pzoName: M.Model.attr('String', {   // pzoname
        isRequired:YES
    }),

    createDate: M.Model.attr('String', { // createdate
        isRequired:YES
    }),

    modifyDate: M.Model.attr('Date', {  // modifydate
        isRequired: NO
    }),

    city: M.Model.attr('String', {  // city
        isRequired:YES
    }),

    zipCode: M.Model.attr('String', { // zipcode
        isRequired:YES
    }),

    street: M.Model.attr('String', { // street
        isRequired:YES
    }),

    houseNo: M.Model.attr('String', { // houseno
        isRequired:NO
    }),

    phone: M.Model.attr('String', { // tel
        isRequired:NO,
        validators: [M.PhoneValidator]
    }),

    email: M.Model.attr('String', { // email
        isRequired:NO,
        validators: [M.EmailValidator]
    }),

    contactName: M.Model.attr('String', { // namecontact
        isRequired:YES
    }),

    contactPerson: M.Model.attr('String', { // prescontact => maybe should be renamed to perscontact, bug?
        isRequired:YES
    }),

    segment: M.Model.attr('String', { // segment
        isRequired:YES
    }),

    cuas: M.Model.attr('String', { // cuas
        isRequired:YES
    }),

    zgpl: M.Model.attr('String', {
        isRequired:YES
    }),

    zp: M.Model.attr('String', {
        isRequired:YES
    }),

    kwa: M.Model.attr('String', {
        isRequired:YES
    }),

    read: M.Model.attr('Boolean', {
        isRequired:YES
    })

})
/*global define*/

define(['themproject', 'templates', 'controllers/index'], function( M, JST ) {
    //    'use strict';

    var edit = TMP.View.design({
            value: Addressbook.IndexController.CurrentContact,
            template: '<div><h1 contenteditable="true"><%= lastname %></h1><h1 contenteditable="true"><%= firstname %></h1></div>'
    });

    return edit;

});


/*


 var ContactEditView = M.View.extend({
 template: JST['app/scripts/templates/ContactDetail.ejs'],

 childViews: {

 'content': [ M.View.extend({

 template: JST['app/scripts/templates/PersonDetail.ejs'],

 value: function() {
 var IndexController = require('controllers/index');
 return IndexController.CurrentContact;
 },

 contentBinding: {
 target: IndexController,
 property: 'CurrentContact'
 }

 }), M.View.extend({

 template: JST['app/scripts/templates/PersonDetailAndroid.ejs'],

 value: function() {
 var IndexController = require('controllers/index');
 return IndexController.CurrentContact;
 },

 contentBinding: {
 target: IndexController,
 property: 'CurrentContact'
 }

 })
 ],
 'footer': [
 M.Button.extend({
 value:'save',
 events: {
 click: {
 target: IndexController,
 action: 'saveContact'
 }
 }
 }),
 M.Button.extend({
 value:'back',
 events: {
 click: {
 action: function(){
 history.back();
 }
 }
 }
 })]
 }
 });

 return ContactEditView;

 */














































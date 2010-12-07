// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      04.11.2010
// License:   ...
// ==========================================================================

// todos.js simulates the whole sourcecode of the app.

var Todos = Todos || {};

M.Application.defaultLanguage = 'en_us';
M.Application.name = 'Todos';

document.write("<script src='i18n/de_de.i18n'></script>");
document.write("<script src='i18n/en_us.i18n'></script>");
document.write("<script src='models/note.js'></script>");
document.write("<script src='controllers/todo_controller.js'></script>");
document.write("<script src='controllers/language_controller.js'></script>");
document.write("<script src='views/todo_item.js'></script>");
document.write("<script src='views/tabs.js'></script>");
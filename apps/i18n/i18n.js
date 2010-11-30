// ==========================================================================
// Project:   The-M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   ...
// ==========================================================================

// binding_sample.js simulates the whole sourcecode of the app.

var I18N = I18N || {};

M.Application.defaultLanguage = 'de_DE';

document.write("<script src='i18n/de_de.i18n'></script>");
document.write("<script src='i18n/en_us.i18n'></script>");
document.write("<script src='controllers/language_controller.js'></script>");
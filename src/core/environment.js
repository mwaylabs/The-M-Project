/**
 * M.Environment wraps the Modernizr plugin Detectizr.
 * Thanks to https://github.com/barisaydinoglu/Detectizr which is Licensed under MIT license.
 * @module M.Environment
 *
 */

Modernizr.Detectizr.detect({detectScreen:false});
M.Environment = Modernizr.Detectizr;

// Shorthand to detect android version.
M.Environment.isLowerThanAndroid4 = (Modernizr.Detectizr.device.model === 'android' && parseInt(Modernizr.Detectizr.device.osVersion, 10) < 4 );
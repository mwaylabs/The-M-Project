// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

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
M.Environment.isLowerThaniPhone4S = (Modernizr.Detectizr.device.os === 'ios' && (document.width <= 320 || document.width <= 480 ));
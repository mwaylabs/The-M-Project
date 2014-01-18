// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * M.Environment wraps the Modernizr plugin Detectizr.
 * Thanks to https://github.com/barisaydinoglu/Detectizr which is Licensed under MIT license.
 * @module M.Environment
 *
 */

// check the dependencies
if(typeof Modernizr !== 'undefined' && typeof Modernizr.Detectizr !== 'undefined'){

    Modernizr.Detectizr.detect({detectScreen:false});

    // wrap Modernizr to use M.Modernizr and it doesn't throw an error in cases Modernizr is not defined
    M.Modernizr = Modernizr;
    // also for Detectizr
    M.Environment = Modernizr.Detectizr;

    // Shorthand to detect android version.
    M.Environment.isLowerThanAndroid4 = (Modernizr.Detectizr.device.model === 'android' && parseInt(Modernizr.Detectizr.device.osVersion, 10) < 4 );
    M.Environment.isLowerThaniPhone4S = (Modernizr.Detectizr.device.os === 'ios' && (document.width <= 320 || document.width <= 480 ));
} else {
    M.Modernizr = {};
    M.Modernizr.prefixed = function(){};


    M.Environment = {};
    M.Environment.device = {};
    M.Environment.device.type = {};
    M.Environment.device.os = {};

    console.warn('Modernizr and Modernizr.Detectizr are not defined - M.Environment is not present');
}
// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: ©2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Dominik
// Date:      26.10.2010
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

/**
 * @namespace
 * The The-M-Project namespace.
 *
 * All The-M-Project methods and functions are defined inside of this namespace.
 */
var M = M || {};

/**
 * These command is used by the build tool to control the load order.
 * It does nothing on the client side.
 */
var m_require = m_require || function require() {};

/**
 * global constants to write YES instead of true and NO instead of false
 *
 * *SproutCore* and *Objective-C* style...
 *
 */
var YES = true;
var NO = false;

m_require('../jquery/jquery-1.4.3.min.js');
m_require('../jquery_mobile/jquery.mobile-1.0a1.min.js');
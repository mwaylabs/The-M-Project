/**
 * Dependencies.
 */
/*
if ('undefined' === typeof window) {
    window   = global;
    window.document = { documentElement: {} };
}

if ('undefined' !== typeof require) {
    chai = require('chai');
    _ = require('underscore');
    Backbone = require('backbone');
    require('../../bower_components/tmpl/tmpl.js');
    require('../../bower_components/modernizr/modernizr.js');
    require('../../dist/tmp2.js');
}
*/

assert = chai.assert;

// test namespace
TEST = {};


describe('M Namespace', function () {
    it('M', function() {
        assert.ok(M, 'M is defined.');
        assert.valueOf(M, 'object', 'M is an object.');
    });

    it('M.Version', function() {
        assert(M.Version && M.hasOwnProperty('Version'), 'M.Version is defined');
        assert(typeof M.Version === 'string', 'M.Version is a string');
        assert(parseInt(M.Version.split('.')[0]) >= 2, 'old TMP version ');
    });

    it('M.f', function() {
        assert(M.f, 'M.f is defined');
        assert(typeof(M.f) === 'function', 'M.f is a function');
    });

    it('YES / NO', function() {
        assert(!NO, 'NO is defined');

        assert(typeof NO === 'boolean', 'NO is a boolean');
        assert(NO === false, 'NO equals false');
        assert(YES, 'YES is defined');

        assert(typeof YES === 'boolean', 'YES is a boolean');
        assert(YES === true, 'YES equals true');
    });

});

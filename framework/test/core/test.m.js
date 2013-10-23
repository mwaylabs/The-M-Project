/**
 * Dependencies.
 */

if ('undefined' != typeof require) {
    chai = require('chai');
    _ = require('underscore');
    Backbone = require('backbone');
    require('../../bower_components/tmpl/tmpl.js');
    require('../../dist/tmp2.js');
}
assert = chai.assert;

// test namespace
TEST = {};

describe('M Namespace', function () {
    it('M is defined as object.', function() {
        expect(M).to.be.a('object');
    });
});

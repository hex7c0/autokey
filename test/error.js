'use strict';
/**
 * @file error test
 * @module autokey
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var autokey = require('..');
var assert = require('assert');

/*
 * test module
 */
describe('error', function() {

  it('should return "password" Exception', function(done) {

    try {
      autokey();
    } catch (err) {
      assert.equal(err.message, 'password required');
      done();
    }
  });
  it('should return "password" Exception. lodash', function(done) {

    try {
      autokey(null, true);
    } catch (err) {
      assert.equal(err.message, 'password required');
      done();
    }
  });
});

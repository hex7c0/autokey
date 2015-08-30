'use strict';
/**
 * @file lodash main
 * @module autokey
 * @subpackage lodash
 * @version 2.2.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var min = __dirname + '/autokey.js';

/*
 * functions
 */
/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function lodash(password) {

  var Class = require(min);
  if (!password) {
    throw new TypeError('password required');
  }
  return new Class(password);
}
module.exports = lodash;

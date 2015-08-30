'use strict';
/**
 * @file normal main
 * @module autokey
 * @subpackage normal
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
 * @exports normal
 * @function normal
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function normal(password) {

  var Class = require(min);
  if (!password) {
    throw new TypeError('password required');
  }
  return new Class(password);
}
module.exports = normal;

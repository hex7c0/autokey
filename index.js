'use strict';
/**
 * @file autokey main
 * @module autokey
 * @subpackage main
 * @version 2.3.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var min = __dirname + '/min/lib/';
var minNormal = min + 'normal/index.js';
var minLodash = min + 'lodash/index.js';

/*
 * functions
 */
/**
 * export
 * 
 * @exports autokey
 * @function autokey
 * @param {String|Array|Buffer} password - user key
 * @param {Boolean} [lodash] - flag
 * @return {Object}
 */
function autokey(password, lodash) {

  if (!lodash) {
    return require(minNormal)(password);
  }
  return require(minLodash)(password);
}
module.exports = autokey;

/**
 * export normal function
 * 
 * @exports normal
 * @function normal
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function normal(password) {

  return require(minNormal)(password);
}
module.exports.normal = normal;

/**
 * export normal function
 * 
 * @exports normal
 * @function normal
 * @param {String|Array|Buffer} password - user key
 * @return {Object}
 */
function lodash(password) {

  return require(minLodash)(password);
}
module.exports.lodash = lodash;

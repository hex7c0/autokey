'use strict';
/**
 * @file lodash main
 * @module autokey
 * @subpackage lodash
 * @version 2.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// load
var min = __dirname + '/';

/*
 * functions
 */
/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @params {String} password - user key
 * @return {Object}
 */
module.exports = function lodash(password) {

    var Class = require(min + 'autokey.js');
    if (!password) {
        throw new TypeError('password required');
    }
    return Class(password);
};

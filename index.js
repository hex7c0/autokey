"use strict";
/**
 * @file autokey main
 * @module autokey
 * @package autokey
 * @subpackage main
 * @version 1.3.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// load
var min = __dirname + '/min/lib/';

/*
 * functions
 */
/**
 * export
 * 
 * @exports autokey
 * @function autokey
 * @params {String} key - user key
 * @params {Boolean} [lodash] - flag
 * @return {AUTOKEY}
 */
module.exports = function autokey(key,lodash) {

    if (lodash) {
        return require(min + 'lodash.js')(key);
    }
    return require(min + 'normal.js')(key);
};

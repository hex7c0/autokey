'use strict';
/**
 * @file autokey main
 * @module autokey
 * @package autokey
 * @subpackage main
 * @version 2.0.0
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
 * @params {String} password - user password
 * @params {Boolean} [lodash] - flag
 * @return {AUTOKEY}
 */
module.exports = function autokey(password, lodash) {

    if (lodash) {
        return require(min + 'lodash/index.js')(password);
    }
    return require(min + 'normal/index.js')(password);
};

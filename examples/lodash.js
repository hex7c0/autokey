'use strict';
/**
 * @file lodash example
 * @module autokey
 * @package autokey
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var autokey = require('..'); // use require('autokey') instead

var a = 'pippo'; // key
var b = 'ciao'; // data
var cipher = autokey(a, true);

var d = cipher.encodeString(b); // encrypt

var e = cipher.decodeString(d); // decrypt

console.log('original: ' + b);
console.log('encrypt: ' + d);
console.log('decrypt: ' + e);

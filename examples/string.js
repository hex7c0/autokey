"use strict";
/**
 * @file string example
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
// import
try {
    var autokey = require('../index.js'); // use require('autokey') instead
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var a = 'pi'; // key
var b = 'ciao'; // data
var cipher = autokey(a);

var d = cipher.encodeString(b); // encrypt

var e = cipher.decodeString(d); // decrypt

console.log('original: ' + b);
console.log('encrypt: ' + d);
console.log('decrypt: ' + e);

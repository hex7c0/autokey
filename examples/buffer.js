"use strict";
/**
 * @file buffer example
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
    var autokey = require('../index.min.js'); // use require('autokey')
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var a = new Buffer('pippo'); // key
var b = new Buffer('ciao'); // data
var cipher = autokey(a);

var d = cipher.encodeBuffer(b); // encrypt

var e = cipher.decodeBuffer(d); // decrypt

console.log('original: ' + b.toString());
console.log('encrypt: ' + d.toString());
console.log('decrypt: ' + e.toString());

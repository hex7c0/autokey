"use strict";
/**
 * @file lodash main
 * @module autokey
 * @package autokey
 * @subpackage lib
 * @version 1.3.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var _ = require('lodash');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * functions
 */
/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @params {String} key - user key
 * @return {AUTOKEY}
 */
module.exports = function lodash(key) {

    return new AUTOKEY(key);
};

/**
 * body cipher
 * 
 * @function body
 * @param {Buffer} str - data
 * @param {Array} key - user key
 * @param {Boolean} [minus] - if minus, decode
 * @return {Buffer}
 */
function body(str, key, minus) {

    var str = new Buffer(str);
    var len = _.size(key);
    var cc = len;
    if (minus) { // decode
        var res = [];
        for (var i = 0, ii = _.size(str); i < ii; i++) {
            if (cc-- > 0) {
                res[i] = (str[i] - key.shift()) % 256;
            } else {
                res[i] = (str[i] - res[i - len]) % 256;
            }
        }
        return new Buffer(res);
    }
    // encode
    return new Buffer(_.map(str, function(num, index) {

        if (cc-- > 0) {
            return (num + key.shift()) % 256;
        }
        return (num + str[index - len]) % 256;
    }));
}

/*
 * class
 */
/**
 * AUTOKEY class
 * 
 * @class AUTOKEY
 * @param {String|Array|Buffer} key - user key
 * @return {Object}
 */
function AUTOKEY(key) {

    this.key = this.change(key);
}
/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 * @return {Array}
 */
AUTOKEY.prototype.change = function(key) {

    if (_.isString(key) || Buffer.isBuffer(key)) {
        return _.map(new Buffer(key), function(num) {

            return num;
        });
    }
    if (_.isArray(key)) {
        return key;
    }
    throw new Error('Invalid data');
    return;
};
/**
 * AUTOKEY encode string
 * 
 * @function encodeString
 * @param {String} str - data
 * @return {String}
 */
AUTOKEY.prototype.encodeString = function(str) {

    return body(str, this.key.slice(0));
};
/**
 * AUTOKEY encode array
 * 
 * @function encodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.encodeArray = function(arr) {

    return _.map(body(arr, this.key.slice(0)), function(num) {

        return num;
    });
};
/**
 * AUTOKEY encode buffer
 * 
 * @function encodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
AUTOKEY.prototype.encodeBuffer = function(buff) {

    return body(buff, this.key.slice(0));
};
/**
 * AUTOKEY mixed encode. Alias
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.encode = function(boh) {

    if (_.isString(boh)) {
        return this.encodeString(boh);
    }
    if (_.isArray(boh)) {
        return this.encodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.encodeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};
/**
 * AUTOKEY decode string
 * 
 * @function decodeString
 * @param {String} str - data
 * @return {String}
 */
AUTOKEY.prototype.decodeString = function(str) {

    return body(str, this.key.slice(0), true).toString();
};
/**
 * AUTOKEY decode array
 * 
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.decodeArray = function(arr) {

    return _.map(body(arr, this.key.slice(0), true), function(num) {

        return num;
    });
};
/**
 * AUTOKEY decode buffer
 * 
 * @function decodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
AUTOKEY.prototype.decodeBuffer = function(buff) {

    return body(buff, this.key.slice(0), true);
};
/**
 * AUTOKEY mixed decode. Alias
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.decode = function(boh) {

    if (_.isString(boh)) {
        return this.decodeString(boh);
    }
    if (_.isArray(boh)) {
        return this.decodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.decodeBuffer(boh);
    }
    throw new Error('Invalid data');
    return;
};

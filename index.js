"use strict";
/**
 * @file autokey main
 * @module autokey
 * @package autokey
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * export class
 * 
 * @exports autokey
 * @function autokey
 * @return {AUTOKEY}
 */
module.exports = function autokey(key) {

    return new AUTOKEY(key);
};

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

    this.key;
    this.change(key);
}
/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 * @return
 */
AUTOKEY.prototype.change = function(key) {

    this.key = new Array(key.legth);
    if (Array.isArray(key)) {
        this.key = key;
    } else if (typeof (key) == 'string' || Buffer.isBuffer(key)) {
        key = new Buffer(key);
        for (var i = 0, ii = key.length; i < ii; i++) {
            this.key[i] = key[i];
        }
    } else {
        throw new Error('Invalid data');
    }
    return;
};
/**
 * AUTOKEY body
 * 
 * @function body
 * @param {Buffer} raw - data
 * @param {[Boolean]} minus - -
 * @return {Buffer}
 */
AUTOKEY.prototype.body = function(str,minus) {

    str = new Buffer(str);
    var tmp;
    var res = [];
    var first = this.key.slice(0);
    var cipher = first.length, ciphers = cipher;
    if (minus) {
        for (var i = 0, ii = str.length; i < ii; i++) {
            if (ciphers > 0) {
                res[i] = (str[i] - first.shift()) % 256;
                ciphers--;
            } else {
                res[i] = (str[i] - res[i - cipher]) % 256;
            }
        }
    } else {
        for (var i = 0, ii = str.length; i < ii; i++) {
            if (ciphers > 0) {
                res[i] = (str[i] + first.shift()) % 256;
                ciphers--;
            } else {
                res[i] = (str[i] + str[i - cipher]) % 256;
            }
        }
    }
    return new Buffer(res);
};
/**
 * AUTOKEY encode string
 * 
 * @function encodeString
 * @param {String} str - data
 * @return {String}
 */
AUTOKEY.prototype.encodeString = function(str) {

    return this.body(str);
};
/**
 * AUTOKEY encode array
 * 
 * @function encodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.encodeArray = function(arr) {

    var parse = this.body(arr);
    var returned = new Array(parse.length);
    for (var i = 0, ii = parse.length; i < ii; i++) {
        returned[i] = parse[i];
    }
    return returned;
};
/**
 * AUTOKEY encode buffer
 * 
 * @function encodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
AUTOKEY.prototype.encodeBuffer = function(buff) {

    return this.body(buff);
};
/**
 * AUTOKEY mixed encode. Alias
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.encode = function(boh) {

    if (typeof (boh) == 'string') {
        return this.encodeString(boh);
    } else if (Array.isArray(boh)) {
        return this.encodeArray(boh);
    } else if (Buffer.isBuffer(boh)) {
        return this.encodeBuffer(boh);
    } else {
        throw new Error('Invalid data');
    }
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

    return this.body(str,true).toString();
};
/**
 * AUTOKEY decode array
 * 
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.decodeArray = function(arr) {

    var parse = this.body(arr,true);
    var returned = new Array(parse.length);
    for (var i = 0, ii = parse.length; i < ii; i++) {
        returned[i] = parse[i];
    }
    return returned;
};
/**
 * AUTOKEY decode buffer
 * 
 * @function decodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
AUTOKEY.prototype.decodeBuffer = function(buff) {

    return this.body(buff,true);
};
/**
 * AUTOKEY mixed decode. Alias
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.decode = function(boh) {

    if (typeof (boh) == 'string') {
        return this.decodeString(boh);
    } else if (Array.isArray(boh)) {
        return this.decodeArray(boh);
    } else if (Buffer.isBuffer(boh)) {
        return this.decodeBuffer(boh);
    } else {
        throw new Error('Invalid data');
    }
    return;
};

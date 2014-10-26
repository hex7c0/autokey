'use strict';
/**
 * @file autokey normal
 * @module autokey
 * @package autokey
 * @subpackage normal
 * @version 2.0.0
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
 * @exports normal
 * @function normal
 * @params {String} key - user key
 * @return {AUTOKEY}
 */
module.exports = function normal(key) {

    return new AUTOKEY(key);
};

/**
 * body cipher encode
 * 
 * @function body
 * @param {Buffer} raw - data
 * @param {Array} key - user key
 * @return {Buffer}
 */
function body(raw, key) {

    var str = raw;
    var res = [];
    var first = key;
    var cipher = first.length, ciphers = cipher;
    for (var i = 0, ii = str.length; i < ii; i++) {
        if (ciphers > 0) {
            res[i] = (str[i] + first.shift()) % 256;
            ciphers--;
        } else {
            res[i] = (str[i] + str[i - cipher]) % 256;
        }
    }
    return new Buffer(res);
}

/**
 * body cipher decode
 * 
 * @function _body
 * @param {Buffer} raw - data
 * @param {Array} key - user key
 * @return {Buffer}
 */
function _body(raw, key) {

    var str = raw;
    var res = [];
    var first = key;
    var cipher = first.length, ciphers = cipher;
    for (var i = 0, ii = str.length; i < ii; i++) {
        if (ciphers > 0) {
            res[i] = (str[i] - first.shift()) % 256;
            ciphers--;
        } else {
            res[i] = (str[i] - res[i - cipher]) % 256;
        }
    }
    return new Buffer(res);
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

    this.key = null;
    this.change(key);
}

/**
 * change user key
 * 
 * @function change
 * @param {String|Array|Buffer} key - user key
 */
AUTOKEY.prototype.change = function(key) {

    if (Array.isArray(key)) {
        this.key = key;
    } else if (typeof (key) === 'string' || Buffer.isBuffer(key)) {
        this.key = new Array(key.legth);
        var keys = new Buffer(key);
        for (var i = 0, ii = keys.length; i < ii; i++) {
            this.key[i] = keys[i];
        }
    } else {
        throw new Error('Invalid data');
    }
    return;
};

/**
 * AUTOKEY encode string
 * 
 * @function encodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
AUTOKEY.prototype.encodeString = function(str, input_encoding, output_encoding) {

    var out = new Buffer(str, input_encoding || 'utf8');
    return body(out, this.key.slice()).toString(output_encoding || 'hex');
};

/**
 * AUTOKEY encode array
 * 
 * @function encodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.encodeArray = function(arr) {

    var parse = body(new Buffer(arr), this.key.slice());
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

    return body(buff, this.key.slice());
};

/**
 * AUTOKEY mixed encode. Alias
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.encode = function(boh, input_encoding, output_encoding) {

    if (typeof (boh) === 'string') {
        return this.encodeString(boh, input_encoding, output_encoding);
    }
    if (Array.isArray(boh)) {
        return this.encodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.encodeBuffer(boh);
    }
    throw new Error('Invalid data');
};

/**
 * AUTOKEY decode string
 * 
 * @function decodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
AUTOKEY.prototype.decodeString = function(str, input_encoding, output_encoding) {

    var out = new Buffer(str, input_encoding || 'hex');
    return _body(out, this.key.slice()).toString(output_encoding || 'utf8');
};

/**
 * AUTOKEY decode array
 * 
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
AUTOKEY.prototype.decodeArray = function(arr) {

    var parse = _body(new Buffer(arr), this.key.slice());
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

    return _body(buff, this.key.slice());
};

/**
 * AUTOKEY mixed decode. Alias
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String|Array|Buffer}
 */
AUTOKEY.prototype.decode = function(boh, input_encoding, output_encoding) {

    if (typeof (boh) === 'string') {
        return this.decodeString(boh, input_encoding, output_encoding);
    }
    if (Array.isArray(boh)) {
        return this.decodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.decodeBuffer(boh);
    }
    throw new Error('Invalid data');
};

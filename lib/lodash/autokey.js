'use strict';
/**
 * @file autokey lodash
 * @module autokey
 * @package autokey
 * @subpackage lodash
 * @version 2.0.0
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
 * body cipher encode
 * 
 * @function body
 * @param {Buffer} raw - data
 * @param {Array} key - user key
 * @return {Buffer}
 */
function body(raw, key) {

    var str = raw;
    var len = _.size(key);
    var cc = len;
    return new Buffer(_.map(str, function(num, index) {

        if (cc-- > 0) {
            return (num + key.shift()) % 256;
        }
        return (num + str[index - len]) % 256;
    }));
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
    var len = _.size(key);
    var cc = len;
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
 * @return {Array}
 */
AUTOKEY.prototype.change = function(key) {

    if (_.isArray(key)) {
        this.key = key;
    } else if (_.isString(key) || Buffer.isBuffer(key)) {
        this.key = _.map(new Buffer(key), function(num) {

            return num;
        });
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
    return _.map(parse, function(num) {

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

    if (_.isString(boh)) {
        return this.encodeString(boh, input_encoding, output_encoding);
    }
    if (_.isArray(boh)) {
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
    return _.map(parse, function(num) {

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

    if (_.isString(boh)) {
        return this.decodeString(boh, input_encoding, output_encoding);
    }
    if (_.isArray(boh)) {
        return this.decodeArray(boh);
    }
    if (Buffer.isBuffer(boh)) {
        return this.decodeBuffer(boh);
    }
    throw new Error('Invalid data');
};

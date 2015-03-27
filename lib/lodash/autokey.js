'use strict';
/**
 * @file autokey lodash
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
// import
var _ = require('lodash');

/*
 * functions
 */
/**
 * export class
 * 
 * @exports lodash
 * @function lodash
 * @param {String} key - user key
 * @return {Autokey}
 */
module.exports = function(key) {

  return new Autokey(key);
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
 * Autokey class
 * 
 * @class Autokey
 * @param {String|Array|Buffer} key - user key
 * @return {Object}
 */
function Autokey(key) {

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
Autokey.prototype.change = function(key) {

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
 * Autokey encode string
 * 
 * @function encodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {

  var out = new Buffer(str, input_encoding || 'utf8');
  return body(out, this.key.slice()).toString(output_encoding || 'hex');
};

/**
 * Autokey encode array
 * 
 * @function encodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
Autokey.prototype.encodeArray = function(arr) {

  var parse = body(new Buffer(arr), this.key.slice());
  return _.map(parse, function(num) {

    return num;
  });
};

/**
 * Autokey encode buffer
 * 
 * @function encodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
Autokey.prototype.encodeBuffer = function(buff) {

  return body(buff, this.key.slice());
};

/**
 * Autokey mixed encode. Alias
 * 
 * @function encode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 */
Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {

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
 * Autokey decode string
 * 
 * @function decodeString
 * @param {String} str - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 * @return {String}
 */
Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {

  var out = new Buffer(str, input_encoding || 'hex');
  return _body(out, this.key.slice()).toString(output_encoding || 'utf8');
};

/**
 * Autokey decode array
 * 
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
Autokey.prototype.decodeArray = function(arr) {

  var parse = _body(new Buffer(arr), this.key.slice());
  return _.map(parse, function(num) {

    return num;
  });
};

/**
 * Autokey decode buffer
 * 
 * @function decodeBuffer
 * @param {Buffer} buff - data
 * @return {Buffer}
 */
Autokey.prototype.decodeBuffer = function(buff) {

  return _body(buff, this.key.slice());
};

/**
 * Autokey mixed decode. Alias
 * 
 * @function decode
 * @param {String|Array|Buffer} boh - data
 * @param {String} [input_encoding] - input
 * @param {String} [output_encoding] - output
 */
Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {

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

'use strict';
/**
 * @file autokey lodash
 * @module autokey
 * @subpackage lodash
 * @version 2.2.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
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
 * @function __encode
 * @param {Buffer} raw - data
 * @param {Array} key - user key
 * @return {Buffer}
 */
function __encode(raw, key) {

  var len = _.size(key);
  var cc = len; // key switch counter
  return new Buffer(_.map(raw, function(num, index) {

    if (cc-- > 0) {
      return (num + key.shift()) % 256;
    }
    return (num + raw[index - len]) % 256;
  }));
}

/**
 * body cipher decode
 * 
 * @function __decode
 * @param {Buffer} raw - data
 * @param {Array} key - user key
 * @return {Buffer}
 */
function __decode(raw, key) {

  var res = []; // output buffer
  var len = _.size(key);
  var cc = len; // key switch counter
  for (var i = 0, ii = _.size(raw); i < ii; ++i) {
    if (cc-- > 0) {
      res[i] = (raw[i] - key.shift()) % 256;
    } else {
      res[i] = (raw[i] - res[i - len]) % 256;
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

  if (_.isArray(key) === true) {
    this.key = key;
  } else if (_.isString(key) || Buffer.isBuffer(key) === true) {
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
  return __encode(out, this.key.slice()).toString(output_encoding || 'hex');
};

/**
 * Autokey encode array
 * 
 * @function encodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
Autokey.prototype.encodeArray = function(arr) {

  var parse = __encode(new Buffer(arr), this.key.slice());
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

  return __encode(buff, this.key.slice());
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

  if (_.isString(boh) === true) {
    return this.encodeString(boh, input_encoding, output_encoding);
  } else if (_.isArray(boh) === true) {
    return this.encodeArray(boh);
  } else if (Buffer.isBuffer(boh) === true) {
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
  return __decode(out, this.key.slice()).toString(output_encoding || 'utf8');
};

/**
 * Autokey decode array
 * 
 * @function decodeArray
 * @param {Array} arr - data
 * @return {Array}
 */
Autokey.prototype.decodeArray = function(arr) {

  var parse = __decode(new Buffer(arr), this.key.slice());
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

  return __decode(buff, this.key.slice());
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

  if (_.isString(boh) === true) {
    return this.decodeString(boh, input_encoding, output_encoding);
  } else if (_.isArray(boh) === true) {
    return this.decodeArray(boh);
  } else if (Buffer.isBuffer(boh) === true) {
    return this.decodeBuffer(boh);
  }
  throw new Error('Invalid data');
};

"use strict";

let _ = require("lodash");

function __encode(raw, key) {
    let len = _.size(key), cc = len;
    return new Buffer.from(_.map(raw, function(num, index) {
        return 0 < cc-- ? (num + key.shift()) % 256 : (num + raw[index - len]) % 256;
    }));
}

function __decode(raw, key) {
    var res = [], len = _.size(key);
    let cc = len;
    for (let i = 0, ii = _.size(raw); i < ii; ++i) 0 < cc-- ? res[i] = (raw[i] - key.shift()) % 256 : res[i] = (raw[i] - res[i - len]) % 256;
    return new Buffer(res);
}

function Autokey(key) {
    this.key = null, this.change(key);
}

module.exports = function(key) {
    return new Autokey(key);
}, Autokey.prototype.change = function(key) {
    if (!0 === _.isArray(key)) this.key = key; else {
        if (!_.isString(key) && !0 !== Buffer.isBuffer(key)) throw new Error("Invalid data");
        this.key = _.map(new Buffer.from(key), function(num) {
            return num;
        });
    }
}, Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {
    return __encode(new Buffer.from(str, input_encoding || "utf8"), this.key.slice()).toString(output_encoding || "hex");
}, Autokey.prototype.encodeArray = function(arr) {
    arr = __encode(new Buffer.from(arr), this.key.slice());
    return _.map(arr, function(num) {
        return num;
    });
}, Autokey.prototype.encodeBuffer = function(buff) {
    return __encode(buff, this.key.slice());
}, Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {
    if (!0 === _.isString(boh)) return this.encodeString(boh, input_encoding, output_encoding);
    if (!0 === _.isArray(boh)) return this.encodeArray(boh);
    if (!0 === Buffer.isBuffer(boh)) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
    return __decode(new Buffer.from(str, input_encoding || "hex"), this.key.slice()).toString(output_encoding || "utf8");
}, Autokey.prototype.decodeArray = function(arr) {
    arr = __decode(new Buffer.from(arr), this.key.slice());
    return _.map(arr, function(num) {
        return num;
    });
}, Autokey.prototype.decodeBuffer = function(buff) {
    return __decode(buff, this.key.slice());
}, Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {
    if (!0 === _.isString(boh)) return this.decodeString(boh, input_encoding, output_encoding);
    if (!0 === _.isArray(boh)) return this.decodeArray(boh);
    if (!0 === Buffer.isBuffer(boh)) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};

"use strict";

function __encode(raw, key) {
    var len = _.size(key), cc = len;
    return new Buffer(_.map(raw, function(num, index) {
        return cc-- > 0 ? (num + key.shift()) % 256 : (num + raw[index - len]) % 256;
    }));
}

function __decode(raw, key) {
    for (var res = [], len = _.size(key), cc = len, i = 0, ii = _.size(raw); ii > i; ++i) cc-- > 0 ? res[i] = (raw[i] - key.shift()) % 256 : res[i] = (raw[i] - res[i - len]) % 256;
    return new Buffer(res);
}

function Autokey(key) {
    this.key = null, this.change(key);
}

var _ = require("lodash");

module.exports = function(key) {
    return new Autokey(key);
}, Autokey.prototype.change = function(key) {
    if (_.isArray(key) === !0) this.key = key; else {
        if (!_.isString(key) && Buffer.isBuffer(key) !== !0) throw new Error("Invalid data");
        this.key = _.map(new Buffer(key), function(num) {
            return num;
        });
    }
}, Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "utf8");
    return __encode(out, this.key.slice()).toString(output_encoding || "hex");
}, Autokey.prototype.encodeArray = function(arr) {
    var parse = __encode(new Buffer(arr), this.key.slice());
    return _.map(parse, function(num) {
        return num;
    });
}, Autokey.prototype.encodeBuffer = function(buff) {
    return __encode(buff, this.key.slice());
}, Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh) === !0) return this.encodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh) === !0) return this.encodeArray(boh);
    if (Buffer.isBuffer(boh) === !0) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "hex");
    return __decode(out, this.key.slice()).toString(output_encoding || "utf8");
}, Autokey.prototype.decodeArray = function(arr) {
    var parse = __decode(new Buffer(arr), this.key.slice());
    return _.map(parse, function(num) {
        return num;
    });
}, Autokey.prototype.decodeBuffer = function(buff) {
    return __decode(buff, this.key.slice());
}, Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh) === !0) return this.decodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh) === !0) return this.decodeArray(boh);
    if (Buffer.isBuffer(boh) === !0) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};

"use strict";

function body(raw, key) {
    var str = raw, len = _.size(key), cc = len;
    return new Buffer(_.map(str, function(num, index) {
        return cc-- > 0 ? (num + key.shift()) % 256 : (num + str[index - len]) % 256;
    }));
}

function _body(raw, key) {
    for (var str = raw, len = _.size(key), cc = len, res = [], i = 0, ii = _.size(str); ii > i; i++) res[i] = cc-- > 0 ? (str[i] - key.shift()) % 256 : (str[i] - res[i - len]) % 256;
    return new Buffer(res);
}

function Autokey(key) {
    this.key = null, this.change(key);
}

var _ = require("lodash");

module.exports = function(key) {
    return new Autokey(key);
}, Autokey.prototype.change = function(key) {
    if (_.isArray(key)) this.key = key; else {
        if (!_.isString(key) && !Buffer.isBuffer(key)) throw new Error("Invalid data");
        this.key = _.map(new Buffer(key), function(num) {
            return num;
        });
    }
}, Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "utf8");
    return body(out, this.key.slice()).toString(output_encoding || "hex");
}, Autokey.prototype.encodeArray = function(arr) {
    var parse = body(new Buffer(arr), this.key.slice());
    return _.map(parse, function(num) {
        return num;
    });
}, Autokey.prototype.encodeBuffer = function(buff) {
    return body(buff, this.key.slice());
}, Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh)) return this.encodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh)) return this.encodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "hex");
    return _body(out, this.key.slice()).toString(output_encoding || "utf8");
}, Autokey.prototype.decodeArray = function(arr) {
    var parse = _body(new Buffer(arr), this.key.slice());
    return _.map(parse, function(num) {
        return num;
    });
}, Autokey.prototype.decodeBuffer = function(buff) {
    return _body(buff, this.key.slice());
}, Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {
    if (_.isString(boh)) return this.decodeString(boh, input_encoding, output_encoding);
    if (_.isArray(boh)) return this.decodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};

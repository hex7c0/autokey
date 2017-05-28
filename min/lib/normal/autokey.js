"use strict";

function __encode(raw, key) {
    for (var res = [], cipher = key.length, cc = cipher, i = 0, ii = raw.length; i < ii; ++i) cc-- > 0 ? res[i] = (raw[i] + key.shift()) % 256 : res[i] = (raw[i] + raw[i - cipher]) % 256;
    return new Buffer(res);
}

function __decode(raw, key) {
    for (var res = [], cipher = key.length, cc = cipher, i = 0, ii = raw.length; i < ii; ++i) cc-- > 0 ? res[i] = (raw[i] - key.shift()) % 256 : res[i] = (raw[i] - res[i - cipher]) % 256;
    return new Buffer(res);
}

function Autokey(key) {
    this.key = null, this.change(key);
}

module.exports = function(key) {
    return new Autokey(key);
}, Autokey.prototype.change = function(key) {
    if (!0 === Array.isArray(key)) this.key = key; else {
        if ("string" != typeof key && !0 !== Buffer.isBuffer(key)) throw new Error("Invalid data");
        this.key = new Array(key.length);
        for (var keys = new Buffer(key), i = 0, ii = keys.length; i < ii; ++i) this.key[i] = keys[i];
    }
}, Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {
    return __encode(new Buffer(str, input_encoding || "utf8"), this.key.slice()).toString(output_encoding || "hex");
}, Autokey.prototype.encodeArray = function(arr) {
    for (var parse = __encode(new Buffer(arr), this.key.slice()), returned = new Array(parse.length), i = 0, ii = parse.length; i < ii; ++i) returned[i] = parse[i];
    return returned;
}, Autokey.prototype.encodeBuffer = function(buff) {
    return __encode(buff, this.key.slice());
}, Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {
    if ("string" == typeof boh) return this.encodeString(boh, input_encoding, output_encoding);
    if (!0 === Array.isArray(boh)) return this.encodeArray(boh);
    if (!0 === Buffer.isBuffer(boh)) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
    return __decode(new Buffer(str, input_encoding || "hex"), this.key.slice()).toString(output_encoding || "utf8");
}, Autokey.prototype.decodeArray = function(arr) {
    for (var parse = __decode(new Buffer(arr), this.key.slice()), returned = new Array(parse.length), i = 0, ii = parse.length; i < ii; ++i) returned[i] = parse[i];
    return returned;
}, Autokey.prototype.decodeBuffer = function(buff) {
    return __decode(buff, this.key.slice());
}, Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {
    if ("string" == typeof boh) return this.decodeString(boh, input_encoding, output_encoding);
    if (!0 === Array.isArray(boh)) return this.decodeArray(boh);
    if (!0 === Buffer.isBuffer(boh)) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};

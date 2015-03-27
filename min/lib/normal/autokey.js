"use strict";

function body(raw, key) {
    for (var str = raw, res = [], first = key, cipher = first.length, ciphers = cipher, i = 0, ii = str.length; ii > i; i++) ciphers > 0 ? (res[i] = (str[i] + first.shift()) % 256, 
    ciphers--) : res[i] = (str[i] + str[i - cipher]) % 256;
    return new Buffer(res);
}

function _body(raw, key) {
    for (var str = raw, res = [], first = key, cipher = first.length, ciphers = cipher, i = 0, ii = str.length; ii > i; i++) ciphers > 0 ? (res[i] = (str[i] - first.shift()) % 256, 
    ciphers--) : res[i] = (str[i] - res[i - cipher]) % 256;
    return new Buffer(res);
}

function Autokey(key) {
    this.key = null, this.change(key);
}

module.exports = function(key) {
    return new Autokey(key);
}, Autokey.prototype.change = function(key) {
    if (Array.isArray(key)) this.key = key; else {
        if ("string" != typeof key && !Buffer.isBuffer(key)) throw new Error("Invalid data");
        this.key = new Array(key.legth);
        for (var keys = new Buffer(key), i = 0, ii = keys.length; ii > i; i++) this.key[i] = keys[i];
    }
}, Autokey.prototype.encodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "utf8");
    return body(out, this.key.slice()).toString(output_encoding || "hex");
}, Autokey.prototype.encodeArray = function(arr) {
    for (var parse = body(new Buffer(arr), this.key.slice()), returned = new Array(parse.length), i = 0, ii = parse.length; ii > i; i++) returned[i] = parse[i];
    return returned;
}, Autokey.prototype.encodeBuffer = function(buff) {
    return body(buff, this.key.slice());
}, Autokey.prototype.encode = function(boh, input_encoding, output_encoding) {
    if ("string" == typeof boh) return this.encodeString(boh, input_encoding, output_encoding);
    if (Array.isArray(boh)) return this.encodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.encodeBuffer(boh);
    throw new Error("Invalid data");
}, Autokey.prototype.decodeString = function(str, input_encoding, output_encoding) {
    var out = new Buffer(str, input_encoding || "hex");
    return _body(out, this.key.slice()).toString(output_encoding || "utf8");
}, Autokey.prototype.decodeArray = function(arr) {
    for (var parse = _body(new Buffer(arr), this.key.slice()), returned = new Array(parse.length), i = 0, ii = parse.length; ii > i; i++) returned[i] = parse[i];
    return returned;
}, Autokey.prototype.decodeBuffer = function(buff) {
    return _body(buff, this.key.slice());
}, Autokey.prototype.decode = function(boh, input_encoding, output_encoding) {
    if ("string" == typeof boh) return this.decodeString(boh, input_encoding, output_encoding);
    if (Array.isArray(boh)) return this.decodeArray(boh);
    if (Buffer.isBuffer(boh)) return this.decodeBuffer(boh);
    throw new Error("Invalid data");
};

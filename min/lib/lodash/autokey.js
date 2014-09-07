/*
 * autokey v2.0.0
 * (c) hex7c0 http://supergiovane.tk/#/autokey
 * Licensed under GPLv3
 */
"use strict";function body(a,b){var c=a,d=_.size(b),e=d;return new Buffer(_.map(c,function(a,f){return e-->0?(a+b.shift())%256:(a+c[f-d])%256}))}function _body(a,b){for(var c=a,d=_.size(b),e=d,f=new Array,g=0,h=_.size(c);h>g;g++)f[g]=e-->0?(c[g]-b.shift())%256:(c[g]-f[g-d])%256;return new Buffer(f)}function AUTOKEY(a){this.key,this.change(a)}try{var _=require("lodash")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(a){return new AUTOKEY(a)},AUTOKEY.prototype.change=function(a){if(_.isArray(a))this.key=a;else{if(!_.isString(a)&&!Buffer.isBuffer(a))throw new Error("Invalid data");this.key=_.map(new Buffer(a),function(a){return a})}},AUTOKEY.prototype.encodeString=function(a,b,c){var d=new Buffer(a,b||"utf8");return body(d,this.key.slice()).toString(c||"hex")},AUTOKEY.prototype.encodeArray=function(a){var b=body(new Buffer(a),this.key.slice());return _.map(b,function(a){return a})},AUTOKEY.prototype.encodeBuffer=function(a){return body(a,this.key.slice())},AUTOKEY.prototype.encode=function(a,b,c){if(_.isString(a))return this.encodeString(a,b,c);if(_.isArray(a))return this.encodeArray(a);if(Buffer.isBuffer(a))return this.encodeBuffer(a);throw new Error("Invalid data")},AUTOKEY.prototype.decodeString=function(a,b,c){var d=new Buffer(a,b||"hex");return _body(d,this.key.slice()).toString(c||"utf8")},AUTOKEY.prototype.decodeArray=function(a){var b=_body(new Buffer(a),this.key.slice());return _.map(b,function(a){return a})},AUTOKEY.prototype.decodeBuffer=function(a){return _body(a,this.key.slice())},AUTOKEY.prototype.decode=function(a,b,c){if(_.isString(a))return this.decodeString(a,b,c);if(_.isArray(a))return this.decodeArray(a);if(Buffer.isBuffer(a))return this.decodeBuffer(a);throw new Error("Invalid data")};

"use strict";

function normal(password) {
    var Class = require(min + "autokey.js");
    if (!password) throw new TypeError("password required");
    return new Class(password);
}

var min = __dirname + "/";

module.exports = normal;

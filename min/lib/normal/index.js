"use strict";

var min = __dirname + "/autokey.js";

function normal(password) {
    var Class = require(min);
    if (password) return new Class(password);
    throw new TypeError("password required");
}

module.exports = normal;

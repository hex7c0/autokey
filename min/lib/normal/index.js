"use strict";

function normal(password) {
    var Class = require(min);
    if (!password) throw new TypeError("password required");
    return new Class(password);
}

var min = __dirname + "/autokey.js";

module.exports = normal;

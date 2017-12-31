"use strict";

var min = __dirname + "/autokey.js";

function lodash(password) {
    var Class = require(min);
    if (!password) throw new TypeError("password required");
    return new Class(password);
}

module.exports = lodash;

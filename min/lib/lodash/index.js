"use strict";

let min = __dirname + "/autokey.js";

function lodash(password) {
    var Class = require(min);
    if (password) return new Class(password);
    throw new TypeError("password required");
}

module.exports = lodash;

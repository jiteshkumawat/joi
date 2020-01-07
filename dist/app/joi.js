"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_util_builder_1 = require("./xlsx/xlsx.util.builder");
var xlsx_util_1 = require("./xlsx/xlsx.util");
var xlsx = function (fileName) {
    return xlsx_util_builder_1.XlsxBuilder.default(fileName);
};
xlsx.load = function (file, options, fileName, callback) {
    return xlsx_util_1.Xlsx.load(file, options, fileName, callback);
};
exports.joi = {
    xlsx: xlsx
};
//# sourceMappingURL=joi.js.map
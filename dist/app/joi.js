"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_util_builder_1 = require("./xlsx/xlsx.util.builder");
var xlsx_util_1 = require("./xlsx/xlsx.util");
var _xlsx = function (fileName) {
    return xlsx_util_builder_1.XlsxBuilder.default(fileName);
};
_xlsx.load = function (file, options, fileName, callback) {
    return xlsx_util_1.Xlsx.load(file, options, fileName, callback);
};
exports.xlsx = _xlsx;
//# sourceMappingURL=joi.js.map
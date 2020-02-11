"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_util_builder_1 = require("./xlsx/xlsx.util.builder");
var xlsx_util_1 = require("./xlsx/xlsx.util");
/**
 * Create new Xlsx file
 * @param fileName - The Xlsx File Name
 * @returns {XlsxClass} - The Xlsx File
 */
var _xlsx = function (fileName) {
    return xlsx_util_builder_1.XlsxBuilder.default(fileName);
};
/**
 * Load existing Xlsx file
 * @param file - The JSZip File object
 * @param options - The Options to load JSZip file
 * @param fileName - The File Name to save
 * @param callback - The load complete fallback
 * @returns {Promise<XlsxClass>}
 */
var load = function (file, options, fileName, callback) {
    return xlsx_util_1.Xlsx.load(file, options, fileName, callback);
};
_xlsx.load = load;
exports.xlsx = _xlsx;
//# sourceMappingURL=joi.js.map
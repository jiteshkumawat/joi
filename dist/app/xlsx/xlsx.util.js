"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileHandler_1 = require("../../util/fileHandler");
var xlsx_util_builder_1 = require("./xlsx.util.builder");
/**
 * Define a new xlsx / excel file
 */
var Xlsx = /** @class */ (function () {
    /**
     * Initialize a new xlsx / excel file
     * @param fileName - The file name
     */
    function Xlsx(fileName, files, workbookUtility) {
        var _this = this;
        this.fileName = fileName;
        /**
         * Download file
         * @param {string} fileName - The file name to download
         * @param {Function} callback - Callback for download complete
         */
        this.download = function (fn, callback) {
            fn = (fn && fn.trim()) || _this.fileName;
            return fileHandler_1.JSZipAdapter.saveFile(files, fn, callback);
        };
        /**
         * Adds a new sheet to workbook
         * @param {string} name - The Sheet Name
         */
        this.sheet = function (name) {
            return workbookUtility.sheet(name);
        };
    }
    /**
     * Load oxml file
     * @param file - The oxml file in String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
     * @param options - The options to load the file
     * @param fileName - The file name
     * @param callback = The callback
     * @returns {Promise<Xlsx>} - Promise to load xlsx file
     */
    Xlsx.load = function (file, options, fileName, callback) {
        return xlsx_util_builder_1.XlsxBuilder.create(file, options, fileName, callback);
    };
    return Xlsx;
}());
exports.Xlsx = Xlsx;
//# sourceMappingURL=xlsx.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define file handler utility
 */
var FileHandler = /** @class */ (function () {
    function FileHandler() {
    }
    /**
     * Creates a new js zip instance and saves file
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for Save complete
     */
    FileHandler.prototype.saveFile = function (files, fileName, callback) {
        if (typeof window !== "undefined") {
            this.saveForBrowser(files, fileName, callback);
        }
        else {
            this.saveForNode(files, fileName, callback);
        }
    };
    /**
     * Save file for Browsers
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for save complete
     */
    FileHandler.prototype.saveForBrowser = function (files, fileName, callback) {
        try {
            var zip_1 = new JSZip();
            files.forEach(function (file) {
                file.saveFile(zip_1);
            });
            return zip_1.generateAsync({ type: "blob" }).then(function (content) {
                try {
                    if (typeof saveAs !== "undefined") {
                        return saveAs(content, fileName);
                    }
                    var url = window.URL.createObjectURL(content);
                    var element = document.createElement("a");
                    element.setAttribute("href", url);
                    element.setAttribute("download", fileName);
                    element.style.display = "none";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    if (callback) {
                        callback(zip_1);
                    }
                    else {
                        return zip_1;
                    }
                }
                catch (err) {
                    if (callback) {
                        callback(null, "Err: Not able to create file object.");
                    }
                    else {
                        throw err;
                    }
                }
            });
        }
        catch (err) {
            if (callback) {
                callback("Err: Not able to create workbook.");
                console.error(err);
            }
            else {
                throw err;
            }
        }
    };
    /**
     * Save files for node
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for save complete
     */
    FileHandler.prototype.saveForNode = function (files, fileName, callback) {
        try {
            var jsZip = require("jszip");
            var zip_2 = new jsZip();
            var fs = require("fs");
            files.forEach(function (file) {
                file.saveFile(zip_2);
            });
            if (callback) {
                zip_2
                    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                    .pipe(fs.createWriteStream(fileName))
                    .then(callback());
            }
            else {
                return zip_2
                    .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                    .pipe(fs.createWriteStream(fileName));
            }
        }
        catch (err) {
            if (callback) {
                callback("Err: Not able to create workbook.");
                console.error(err);
            }
            else {
                return Promise.reject(err);
            }
        }
    };
    return FileHandler;
}());
exports.FileHandler = FileHandler;
//# sourceMappingURL=fileHandler.js.map
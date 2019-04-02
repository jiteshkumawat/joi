"use strict";
exports.__esModule = true;
var FileHandler = (function () {
    function FileHandler() {
    }
    FileHandler.prototype.saveFile = function (files, fileName) {
        if (typeof window !== "undefined") {
            this.saveForBrowser();
        }
        else {
            this.saveForNode(files, fileName);
        }
    };
    FileHandler.prototype.saveForBrowser = function () { };
    FileHandler.prototype.saveForNode = function (files, fileName) {
        var jsZip = require("jszip");
        var zip = new jsZip();
        var fs = require("fs");
        files.forEach(function (file) {
            file.saveFile(zip);
        });
        zip
            .generateNodeStream({ type: "nodebuffer", streamFiles: true })
            .pipe(fs.createWriteStream(fileName));
    };
    return FileHandler;
}());
exports.FileHandler = FileHandler;
//# sourceMappingURL=fileHandler.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../util/constants");
/**
 * File type in Oxml
 */
var FileType;
(function (FileType) {
    /**
     * Content Types file
     */
    FileType[FileType["ContentTypes"] = 0] = "ContentTypes";
    /**
     * Relationships file
     */
    FileType[FileType["Relationships"] = 1] = "Relationships";
    /**
     * Workbook file
     */
    FileType[FileType["Workbook"] = 2] = "Workbook";
    /**
     * Worksheet file
     */
    FileType[FileType["Worksheet"] = 3] = "Worksheet";
    /**
     * Shared strings file
     */
    FileType[FileType["SharedStrings"] = 4] = "SharedStrings";
    /**
     * Xml file. For any other type
     */
    FileType[FileType["Xml"] = 5] = "Xml";
})(FileType = exports.FileType || (exports.FileType = {}));
/**
 * Adapter class representing JSZip file
 */
var FileAdapter = /** @class */ (function () {
    function FileAdapter() {
    }
    /**
     * Get Relationship file for a path
     * @param filePath - File Path
     * @param files - Files collection
     * @param relExtention - Relationships extention
     */
    FileAdapter.getRelationshipFile = function (filePath, files, relExtention) {
        var relFile = files.find(function (fl) {
            return fl.filePath === filePath + "/_rels" && fl.fileExtention === relExtention;
        });
        if (!relFile && filePath) {
            filePath = filePath.substring(0, filePath.indexOf("/"));
            relFile = this.getRelationshipFile(filePath, files, relExtention);
        }
        return relFile;
    };
    return FileAdapter;
}());
exports.FileAdapter = FileAdapter;
/**
 * JSZip Adapter class
 */
var JSZipAdapter = /** @class */ (function () {
    function JSZipAdapter() {
    }
    /**
     * Creates a new js zip instance and saves file
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for Save complete
     */
    JSZipAdapter.saveFile = function (files, fileName, callback) {
        if (typeof window !== "undefined") {
            this.saveForBrowser(files, fileName, callback);
        }
        else {
            this.saveForNode(files, fileName, callback);
        }
    };
    /**
     * Load open xml file
     * @param file - The file as String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
     * @param options - The options to load the file
     * @param callback - The callback method
     */
    JSZipAdapter.loadFile = function (file, options) {
        if (typeof window !== "undefined") {
            return this.loadForBrowser(file, options);
        }
        else {
            return this.loadForNodeJS(file, options);
        }
    };
    /**
     * Extract content from JSZip file
     * @param zip - JSZip file
     */
    JSZipAdapter.extract = function (zip) {
        return __awaiter(this, void 0, void 0, function () {
            var filesPromises, apapters, _loop_1, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesPromises = [];
                        apapters = [];
                        _loop_1 = function (file) {
                            filesPromises.push(zip
                                .file(file)
                                .async("string")
                                .then(function (fileContent) {
                                var fileAdapter = new FileAdapter();
                                fileAdapter.completeName = file;
                                fileAdapter.fileName = file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."));
                                fileAdapter.fileNameWithExtention = file.substring(file.lastIndexOf("/") + 1);
                                fileAdapter.filePath = file.substring(0, file.lastIndexOf("/"));
                                fileAdapter.fileExtention = file.substring(file.lastIndexOf(".") + 1);
                                fileAdapter.processed = false;
                                fileAdapter.fileContent = fileContent;
                                fileAdapter.fileType = FileType.Xml;
                                apapters.push(fileAdapter);
                            }));
                        };
                        for (file in zip.files) {
                            _loop_1(file);
                        }
                        return [4 /*yield*/, Promise.all(filesPromises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(apapters)];
                }
            });
        });
    };
    /**
     * Save file for Browsers
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for save complete
     */
    JSZipAdapter.saveForBrowser = function (files, fileName, callback) {
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
                        callback(null, constants_1.Constants.Errors.ErrCreateFileObject);
                    }
                    else {
                        throw err;
                    }
                }
            });
        }
        catch (err) {
            if (callback) {
                callback(constants_1.Constants.Errors.ErrCreateWorkbook);
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
    JSZipAdapter.saveForNode = function (files, fileName, callback) {
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
                callback(constants_1.Constants.Errors.ErrCreateWorkbook);
                console.error(err);
            }
            else {
                return Promise.reject(err);
            }
        }
    };
    JSZipAdapter.loadForBrowser = function (file, options) {
        var zip = new JSZip();
        return zip.loadAsync(file, options);
    };
    JSZipAdapter.loadForNodeJS = function (file, options) {
        var zip = require("jszip");
        return zip.loadAsync(file, options);
    };
    return JSZipAdapter;
}());
exports.JSZipAdapter = JSZipAdapter;
//# sourceMappingURL=fileHandler.js.map
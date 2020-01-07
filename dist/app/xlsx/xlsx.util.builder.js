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
var contentTypes_1 = require("../../entities/files/contentTypes");
var fileHandler_1 = require("../../util/fileHandler");
var eventBus_1 = require("../../util/eventBus");
var relationships_1 = require("../../entities/files/relationships");
var xlsx_util_1 = require("./xlsx.util");
var workbook_util_builder_1 = require("./workbook.util.builder");
var XlsxBuilder = /** @class */ (function () {
    function XlsxBuilder() {
    }
    /**
     * Create an instance of Xlsx Workbook file
     * @param fileName - Workbook file name
     * @returns {Xlsx} - Workbook file (Xlsx)
     */
    XlsxBuilder.default = function (fileName) {
        var files = [];
        var contentTypes;
        var eventBus = new eventBus_1.EventBus();
        fileName = this.getFileName(fileName);
        contentTypes = this.initContentTypes(files, eventBus);
        this.bindListeners(files, eventBus);
        var workbookUtility = workbook_util_builder_1.WorkbookUtilityBuilder.default(eventBus);
        this.initRels(files, contentTypes);
        return new xlsx_util_1.Xlsx(fileName, files, workbookUtility);
    };
    /**
     * Create Xlsx from existing file
     * @param file - The oxml file
     * @param options - Options to load file
     * @param fileName - The file name
     * @param callback - Method to execute after creating Xlsx from this file
     */
    XlsxBuilder.create = function (file, options, fileName, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var files, eventBus, workbookUtility, contentTypes, self, zipFile, fileAdapters, _contentTypes, xlsx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = [];
                        eventBus = new eventBus_1.EventBus();
                        fileName = this.getFileName(fileName);
                        self = this;
                        return [4 /*yield*/, fileHandler_1.JSZipAdapter.loadFile(file, options)];
                    case 1:
                        zipFile = _a.sent();
                        return [4 /*yield*/, fileHandler_1.JSZipAdapter.extract(zipFile)];
                    case 2:
                        fileAdapters = _a.sent();
                        return [4 /*yield*/, self.loadContentTypes(fileAdapters, files, eventBus)];
                    case 3:
                        _contentTypes = _a.sent();
                        contentTypes = _contentTypes;
                        self.bindListeners(files, eventBus);
                        return [4 /*yield*/, workbook_util_builder_1.WorkbookUtilityBuilder.create(eventBus, fileAdapters, _contentTypes)];
                    case 4:
                        workbookUtility = _a.sent();
                        return [4 /*yield*/, self.loadRelationships(fileAdapters, files, contentTypes)];
                    case 5:
                        _a.sent();
                        xlsx = new xlsx_util_1.Xlsx(fileName, files, workbookUtility);
                        if (callback) {
                            callback(xlsx);
                        }
                        return [2 /*return*/, xlsx];
                }
            });
        });
    };
    XlsxBuilder.getFileName = function (fileName) {
        fileName = (fileName && fileName.trim()) || "Document.xlsx";
        if (!fileName.endsWith(".xlsx")) {
            fileName = fileName + ".xlsx";
        }
        return fileName;
    };
    /**
     * Initialize content types
     */
    XlsxBuilder.initContentTypes = function (files, eventBus) {
        var contentTypes = new contentTypes_1.ContentTypes(eventBus);
        files.push(contentTypes);
        contentTypes.addDefault("application/vnd.openxmlformats-package.relationships+xml", "rels");
        contentTypes.addDefault("application/xml", "xml");
        return contentTypes;
    };
    /**
     * Bind Event Listeners on Bus
     */
    XlsxBuilder.bindListeners = function (files, eventBus) {
        eventBus.stopListening("addFile");
        eventBus.startListening("addFile", function (file) {
            files.push(file);
        });
    };
    /**
     * Initialize relationships
     */
    XlsxBuilder.initRels = function (files, contentTypes) {
        var relationships = new relationships_1.Relationships("." +
            contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"]);
        files.push(relationships);
        relationships.addRelationship(contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"].replace(/^[\/]+|[\/]+$/g, ""), "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument");
        return relationships;
    };
    XlsxBuilder.loadContentTypes = function (files, xmls, eventBus) {
        return __awaiter(this, void 0, void 0, function () {
            var contentTypesFile, contentTypes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentTypesFile = files.find(function (file) { return file.fileName === "[Content_Types]"; });
                        return [4 /*yield*/, contentTypes_1.ContentTypes.load(contentTypesFile, eventBus)];
                    case 1:
                        contentTypes = _a.sent();
                        xmls.push(contentTypes);
                        return [2 /*return*/, contentTypes];
                }
            });
        });
    };
    XlsxBuilder.loadRelationships = function (files, xmls, contentTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var relExtention, relationsFile, relation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        relExtention = contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"];
                        relationsFile = files.find(function (file) { return file.completeName === "_rels/." + relExtention; });
                        return [4 /*yield*/, relationships_1.Relationships.load(relationsFile.fileContent, relationsFile.fileNameWithExtention, relationsFile.filePath)];
                    case 1:
                        relation = _a.sent();
                        xmls.push(relation);
                        relationsFile.processed = true;
                        relationsFile.xmlFile = relation;
                        return [2 /*return*/, relation];
                }
            });
        });
    };
    return XlsxBuilder;
}());
exports.XlsxBuilder = XlsxBuilder;
//# sourceMappingURL=xlsx.util.builder.js.map
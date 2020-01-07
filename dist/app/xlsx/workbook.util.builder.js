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
var workbookFile_1 = require("../../entities/xlsx/files/workbookFile");
var relationships_1 = require("../../entities/files/relationships");
var sharedStringsFile_1 = require("../../entities/xlsx/files/sharedStringsFile");
var workbook_util_1 = require("./workbook.util");
var fileHandler_1 = require("../../util/fileHandler");
/**
 * Builder class for Workbook Utility
 */
var WorkbookUtilityBuilder = /** @class */ (function () {
    function WorkbookUtilityBuilder() {
    }
    /**
     * Create default workbook utility
     * @param eventBus - Event Bus
     */
    WorkbookUtilityBuilder.default = function (eventBus) {
        var workbook;
        var relations;
        var sharedStringFile;
        workbook = new workbookFile_1.WorkbookFile(eventBus);
        eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", "/workbook/workbook.xml");
        eventBus.trigger("addFile", workbook);
        relations = new relationships_1.Relationships("workbook.xml.rels", "workbook/_rels");
        eventBus.trigger("addFile", relations);
        var workbookUtility = new workbook_util_1.WorkbookUtility(eventBus, workbook, relations, sharedStringFile);
        return workbookUtility;
    };
    /**
     * Create a Workbook Utility from existing file
     * @param eventBus - Event bus
     * @param files - File adapter collection
     * @param contentTypes - Content types file
     */
    WorkbookUtilityBuilder.create = function (eventBus, files, contentTypes) {
        return __awaiter(this, void 0, void 0, function () {
            var workbookContentType, workbookFile, relationsFile, relation, sharedStringRel, saredStrings, sharedStringRelValue_1, sharedStringFile, workbookFileXml, workbookUtility;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbookContentType = contentTypes.overrides["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"];
                        if (workbookContentType.startsWith("/")) {
                            workbookContentType = workbookContentType.substring(1);
                        }
                        workbookFile = files.find(function (fl) { return fl.completeName === workbookContentType; });
                        relationsFile = fileHandler_1.FileAdapter.getRelationshipFile(workbookFile.filePath, files, contentTypes.defaults["application/vnd.openxmlformats-package.relationships+xml"]);
                        if (!!relationsFile.processed) return [3 /*break*/, 2];
                        return [4 /*yield*/, relationships_1.Relationships.load(relationsFile.fileContent, relationsFile.fileNameWithExtention, relationsFile.filePath)];
                    case 1:
                        relation = _a.sent();
                        eventBus.trigger("addFile", relation);
                        relationsFile.processed = true;
                        relationsFile.xmlFile = relation;
                        _a.label = 2;
                    case 2:
                        sharedStringRel = relation.getByRelationship("http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings");
                        if (!sharedStringRel) return [3 /*break*/, 4];
                        sharedStringRelValue_1 = sharedStringRel.attribute("Target", relation.defaultNamespace).value;
                        sharedStringFile = files.find(function (fl) {
                            return fl.filePath ===
                                workbookFile.filePath +
                                    sharedStringRelValue_1.substring(0, sharedStringRelValue_1.lastIndexOf("/"));
                        });
                        if (!!sharedStringFile.processed) return [3 /*break*/, 4];
                        return [4 /*yield*/, sharedStringsFile_1.SharedStringsFile.load(sharedStringFile.fileContent, sharedStringFile.fileName, sharedStringFile.filePath)];
                    case 3:
                        saredStrings = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, workbookFile_1.WorkbookFile.load(eventBus, workbookFile.fileContent, workbookFile.fileName, workbookFile.filePath)];
                    case 5:
                        workbookFileXml = _a.sent();
                        eventBus.trigger("addFile", workbookFileXml);
                        workbookFileXml.sheets.children.forEach(function (sheetNode) {
                            var rId = sheetNode.getAttribute("r:Id").value;
                            var relationNode = relation.getById(rId);
                            var filePath = relationNode.attribute("Target", relation.defaultNamespace).value;
                            // const file = files.find(
                            //   f => f.filePath + "/" + f.fileNameWithExtention === filePath
                            // );
                            // if (!file.processed) {
                            // }
                        });
                        workbookUtility = new workbook_util_1.WorkbookUtility(eventBus, workbookFileXml, relation, saredStrings);
                        return [2 /*return*/, workbookUtility];
                }
            });
        });
    };
    return WorkbookUtilityBuilder;
}());
exports.WorkbookUtilityBuilder = WorkbookUtilityBuilder;
//# sourceMappingURL=workbook.util.builder.js.map
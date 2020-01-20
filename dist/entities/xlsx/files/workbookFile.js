"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var node_1 = require("../../base/node");
var sheetFile_1 = require("./sheetFile");
var attribute_1 = require("../../base/attribute");
var parser_1 = require("../../../util/parser");
var fileBase_1 = require("../../base/fileBase");
/**
 * Define new workbook file
 */
var WorkbookFile = /** @class */ (function (_super) {
    __extends(WorkbookFile, _super);
    /**
     * Initialize new workbook file
     * @param fileName - The file name
     * @param filePath - The file path
     * @param isLoad - The file
     */
    function WorkbookFile(eventBus, fileName, filePath, isLoad) {
        var _this = _super.call(this, new node_1.Node("workbook", [], true, "", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), fileName || "workbook.xml", filePath || "workbook") || this;
        _this.RootChildNodes = [
            "bookViews",
            "calcPr",
            "customWorkbookViews",
            "definedNames",
            "externalReferences",
            "extLst",
            "fileRecoveryPr",
            "fileSharing",
            "fileVersion",
            "functionGroups",
            "oleSize",
            "pivotCaches",
            "sheets",
            "smartTagPr",
            "smartTagTypes",
            "webPublishing",
            "webPublishObjects",
            "workbookPr",
            "workbookProtection"
        ];
        if (!isLoad) {
            _this.rootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
            _this.workbookViews = [];
            _this.sheets = _this.addRootChild("sheets", _this.defaultNamespace).node;
            _this.initializeView();
            _this.bindListeners(eventBus);
        }
        return _this;
    }
    // /**
    //  * Index of active tab
    //  */
    // private activeTab: Attribute;
    /**
     * Creates a new sheet in workbook and returns
     * @param {string} rId = The relation Id
     * @param {string} sheetName - The sheet name
     * @returns {SheetFile} - The sheet instance
     */
    WorkbookFile.prototype.createSheet = function (sheetName) {
        var _this = this;
        var fileNameIndex = 0, sheetIndex = 0;
        this.sheets.children.forEach(function (sheetNode) {
            var _fileNameIndex = parseInt(sheetNode
                .attribute("name", _this.defaultNamespace)
                .value.replace("sheet", "")
                .replace(".xml", "")) || 0;
            var _sheetIndex = parseInt(sheetNode.attribute("sheetId", _this.defaultNamespace).value) ||
                0;
            fileNameIndex =
                fileNameIndex < _fileNameIndex ? _fileNameIndex : fileNameIndex;
            sheetIndex = sheetIndex < _sheetIndex ? _sheetIndex : sheetIndex;
        });
        var sheet = new sheetFile_1.SheetFile(sheetIndex + 1, sheetName || "sheet" + (sheetIndex + 1).toString());
        this.addSheet(sheet);
        return sheet;
    };
    /**
     * Update Sheet Name
     * @param sheetName - Sheet Name
     * @param sheetId - Sheet Index
     */
    WorkbookFile.prototype.updateSheetName = function (sheetName, sheetId) {
        var _this = this;
        var sheetNode = this.sheets.children.find(function (sheet) {
            return parseInt(sheet.attribute("sheetId", _this.defaultNamespace).value, 10) === sheetId;
        });
        sheetNode.attribute("name", this.defaultNamespace).value = sheetName;
    };
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<WorkbookFile>}: - The Promise resolving Workbook File
     */
    WorkbookFile.load = function (eventBus, content, fileName, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var workbookFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbookFile = new WorkbookFile(eventBus, fileName, filePath, true);
                        return [4 /*yield*/, parser_1.XmlParser.parse(content, workbookFile, "http://schemas.openxmlformats.org/spreadsheetml/2006/main")];
                    case 1:
                        _a.sent();
                        workbookFile.loadInternal();
                        workbookFile.bindListeners(eventBus);
                        return [2 /*return*/, workbookFile];
                }
            });
        });
    };
    /**
     * Load file internal
     */
    WorkbookFile.prototype.loadInternal = function () {
        var _this = this;
        var bookViews = this.rootNode.child("bookViews", this.defaultNamespace);
        this.workbookViews = [];
        if (bookViews) {
            var index_1 = 0;
            bookViews.children.forEach(function (workbookViewNode) {
                if (workbookViewNode.name === "workbookView" &&
                    workbookViewNode.namespace === _this.defaultNamespace) {
                    _this.workbookViews.push({
                        sheets: [],
                        node: workbookViewNode,
                        index: index_1++
                    });
                }
            });
            // this.activeTab = workbookView.attribute(
            //   "activeTab",
            //   this.defaultNamespace
            // );
        }
        this.sheets = this.rootNode.child("sheets", this.defaultNamespace);
    };
    /**
     * Bind Listeners
     * @param eventBus - Event Bus
     */
    WorkbookFile.prototype.bindListeners = function (eventBus) {
        var _this = this;
        var self = this;
        eventBus.startListening("setSheetRelationId", function (id, rId) {
            var sheetNode = self.sheets.children.find(function (sheet) {
                return sheet.attribute("sheetId", self.defaultNamespace).value ===
                    id.toString();
            });
            sheetNode.attribute(new attribute_1.Attribute("id", rId, true, _this.rootNode.namespaces["http://schemas.openxmlformats.org/officeDocument/2006/relationships"]));
        });
        eventBus.startListening("setSheetWorkbookView", function (sheetId, index, callback) {
            console.log("setSheetWorkbookView triggered");
            if (index === undefined || index === null) {
            }
        });
    };
    /**
     * Initilize workbook view
     */
    WorkbookFile.prototype.initializeView = function () {
        this.bookViews = this.addRootChild("bookViews", this.defaultNamespace).node;
        var activeTab = new attribute_1.Attribute("activeTab", "0", true, this.defaultNamespace);
        var workbookView = new node_1.Node("workbookView", [activeTab], true, this.defaultNamespace);
        this.workbookViews.push({ sheets: [], node: workbookView, index: 0 });
        this.bookViews.child(new node_1.Node("workbookView", [activeTab], true, this.defaultNamespace));
    };
    /**
     * Add a new sheet
     * @param {SheetFile} sheet - The sheet to add
     */
    WorkbookFile.prototype.addSheet = function (sheet) {
        this.sheets.child(new node_1.Node("sheet", [
            new attribute_1.Attribute("name", sheet.name, true, this.defaultNamespace),
            new attribute_1.Attribute("sheetId", sheet.id.toString(10), true, this.defaultNamespace)
        ], true, this.defaultNamespace));
    };
    return WorkbookFile;
}(fileBase_1.FileBase));
exports.WorkbookFile = WorkbookFile;
//# sourceMappingURL=workbookFile.js.map
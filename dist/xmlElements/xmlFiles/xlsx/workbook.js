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
Object.defineProperty(exports, "__esModule", { value: true });
var xmlFile_1 = require("../../base/xmlFile");
var xmlRootNode_1 = require("../../base/xmlRootNode");
var xmlNode_1 = require("../../base/xmlNode");
var sheet_1 = require("./sheet");
var xmlAttribute_1 = require("../../base/xmlAttribute");
/**
 * Define new workbook file
 */
var Workbook = /** @class */ (function (_super) {
    __extends(Workbook, _super);
    /**
     * Initialize new workbook file
     */
    function Workbook() {
        var _this = _super.call(this, new xmlRootNode_1.XmlRootNode("workbook", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "workbook.xml", "workbook") || this;
        _this.rootNode.addNamespace("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "r");
        _this.initializeView();
        _this.sheets = new xmlNode_1.XmlNode("sheets");
        _this.rootNode.child(_this.sheets);
        _this.totalSheet = 0;
        return _this;
    }
    /**
     * Add a new sheet
     * @param {Sheet} sheet - The sheet to add
     */
    Workbook.prototype.addSheet = function (sheet) {
        this.sheets.child(new xmlNode_1.XmlNode("sheet", [
            new xmlAttribute_1.XmlAttribute("r:id", sheet.rId),
            new xmlAttribute_1.XmlAttribute("sheetId", sheet.id.toString(10)),
            new xmlAttribute_1.XmlAttribute("name", sheet.name)
        ]));
        this.totalSheet++;
    };
    /**
     * Creates a new sheet in workbook and returns
     * @param {string} sheetName - The sheet name
     * @returns {Sheet} - The sheet instance
     */
    Workbook.prototype.createSheet = function (sheetName) {
        var sheet = new sheet_1.Sheet(this.sheets.children.length, sheetName);
        this.addSheet(sheet);
        return sheet;
    };
    /**
     * Initilize workbook view
     */
    Workbook.prototype.initializeView = function () {
        this.bookViews = new xmlNode_1.XmlNode("bookViews");
        this.activeTab = new xmlAttribute_1.XmlAttribute("activeTab", "0");
        this.bookViews.child(new xmlNode_1.XmlNode("workbookView", [this.activeTab]));
        this.rootNode.child(this.bookViews);
    };
    return Workbook;
}(xmlFile_1.XmlFile));
exports.Workbook = Workbook;
//# sourceMappingURL=workbook.js.map
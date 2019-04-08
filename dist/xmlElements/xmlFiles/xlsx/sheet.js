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
exports.__esModule = true;
var xmlFile_1 = require("../../base/xmlFile");
var xmlRootNode_1 = require("../../base/xmlRootNode");
var xmlNode_1 = require("../../base/xmlNode");
var xmlAttribute_1 = require("../../base/xmlAttribute");
var Sheet = (function (_super) {
    __extends(Sheet, _super);
    function Sheet(index, name) {
        var _this = this;
        index = index || 1;
        _this = _super.call(this, new xmlRootNode_1.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
        _this.RId = "rId" + index.toString(10);
        _this.Id = index;
        _this.Name = name || "Sheet" + index.toString(10);
        _this.initializeSheetProperties();
        _this.sheetData = new xmlNode_1.XmlNode("sheetData");
        _this.RootNode.addChild(_this.sheetData);
        return _this;
    }
    Sheet.prototype.clearSelections = function () {
        this.Selections = [];
        this.sheetView.Children = [];
        this.sheetView.addChild(this.Pane);
    };
    Sheet.prototype.addSelection = function (activeCell, pane, sqref, paneIsActive) {
        var attributes;
        if (activeCell) {
            attributes = [
                new xmlAttribute_1.XmlAttribute("sqref", sqref || activeCell || "A1"),
                new xmlAttribute_1.XmlAttribute("activeCell", activeCell || "A1"),
                new xmlAttribute_1.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
            ];
        }
        else {
            attributes = [
                new xmlAttribute_1.XmlAttribute("sqref", sqref || activeCell || "A1", false),
                new xmlAttribute_1.XmlAttribute("activeCell", activeCell || "A1", false),
                new xmlAttribute_1.XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
            ];
        }
        var selection = new xmlNode_1.XmlNode("selection", attributes);
        this.Selections.push(selection);
        this.sheetView.addChild(selection);
    };
    Sheet.prototype.initializeSheetProperties = function () {
        var sheetViews = new xmlNode_1.XmlNode("sheetViews");
        this.sheetView = new xmlNode_1.XmlNode("sheetView");
        this.TabSelected = new xmlAttribute_1.XmlAttribute("");
        this.sheetView.attribute(this.TabSelected);
        this.sheetView.attribute(new xmlAttribute_1.XmlAttribute("workbookViewId", "0"));
        sheetViews.addChild(this.sheetView);
        this.Pane = new xmlNode_1.XmlNode("pane", [
            new xmlAttribute_1.XmlAttribute("state", "frozen"),
            new xmlAttribute_1.XmlAttribute("activePane", "topRight"),
            new xmlAttribute_1.XmlAttribute("topLeftCell", "A1"),
            new xmlAttribute_1.XmlAttribute("ySplit", "1"),
            new xmlAttribute_1.XmlAttribute("xSplit", "1")
        ]);
        this.Pane.Name = "";
        this.sheetView.addChild(this.Pane);
        this.Selections = [
            new xmlNode_1.XmlNode("selection", [
                new xmlAttribute_1.XmlAttribute("sqref", "A1"),
                new xmlAttribute_1.XmlAttribute("activeCell", "A1"),
                new xmlAttribute_1.XmlAttribute("pane", "bottomRight", false)
            ])
        ];
        this.sheetView.addChild(this.Selections[0]);
        this.RootNode.addChild(sheetViews);
    };
    return Sheet;
}(xmlFile_1.XmlFile));
exports.Sheet = Sheet;
//# sourceMappingURL=sheet.js.map
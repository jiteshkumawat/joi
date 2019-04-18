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
/**
 * Define a sheet xml file
 */
var Sheet = /** @class */ (function (_super) {
    __extends(Sheet, _super);
    /**
     * Initialize a new sheet in workbook
     * @param index - Index of sheet
     */
    function Sheet(index, name) {
        var _this = this;
        index = index || 1;
        _this = _super.call(this, new xmlRootNode_1.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
        _this.RId = "rId" + index.toString(10);
        _this.Id = index;
        _this.Name = name || "Sheet" + index.toString(10);
        _this.initializeSheetProperties();
        _this.sheetData = new xmlNode_1.XmlNode("sheetData");
        _this.RootNode.child(_this.sheetData);
        return _this;
    }
    /**
     * Clear the selections from sheet view
     */
    Sheet.prototype.clearSelections = function () {
        this.Selections = [];
        this.sheetView.Children = [];
        this.sheetView.child(this.Pane);
    };
    /**
     * Add a seleciton in sheet view
     * @param activeCell - The active cell
     * @param pane - The pane
     * @param sqref - The sequence reference
     * @param paneIsActive - Determine if pane is active
     */
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
        this.sheetView.child(selection);
    };
    /**
     * Add a new column in sheet
     * @param min - Col statring number
     * @param max - Col ending number
     * @param width - Width of each column
     * @param bestFit - Determine whether to bestfit width wrt value
     * @param hidden - Determine if columns are hidden
     */
    Sheet.prototype.addCol = function (min, max, width, bestFit, hidden) {
        var cols = this.RootNode.child("cols");
        if (cols === null) {
            cols = new xmlNode_1.XmlNode("cols");
            for (var index = 0; index < this.RootNode.Children.length; index++) {
                if (this.RootNode.Children[index].Name === "sheetData") {
                    this.RootNode.Children.splice(index, 0, cols);
                    break;
                }
            }
        }
        var col = new xmlNode_1.XmlNode("col", [
            new xmlAttribute_1.XmlAttribute("min", min.toString(10)),
            new xmlAttribute_1.XmlAttribute("max", max.toString(10))
        ]);
        if (width) {
            col.attribute(new xmlAttribute_1.XmlAttribute("width", width.toString(10)));
            col.attribute(new xmlAttribute_1.XmlAttribute("customWidth", "1"));
        }
        if (bestFit) {
            col.attribute(new xmlAttribute_1.XmlAttribute("bestFit", "1"));
        }
        if (hidden) {
            col.attribute(new xmlAttribute_1.XmlAttribute("collapsed", "1"));
            col.attribute(new xmlAttribute_1.XmlAttribute("hidden", "1"));
        }
        cols.child(col);
        return col;
    };
    /**
     * Add a new merge cell in sheet
     * @param cellRange - The cell range
     */
    Sheet.prototype.mergeCells = function (cellRange) {
        var mergeCells = this.RootNode.child("mergeCells");
        if (mergeCells === null) {
            mergeCells = new xmlNode_1.XmlNode("mergeCells", [new xmlAttribute_1.XmlAttribute("count", "0")]);
            for (var index = 0; index < this.RootNode.Children.length; index++) {
                if (this.RootNode.Children[index].Name === "sheetData") {
                    this.RootNode.Children.splice(index + 1, 0, mergeCells);
                    break;
                }
            }
        }
        var mergeCell = new xmlNode_1.XmlNode("mergeCell", [
            new xmlAttribute_1.XmlAttribute("ref", cellRange)
        ]);
        mergeCells.child(mergeCell);
        mergeCells.attribute("count").Value = mergeCells.Children.length.toString(10);
    };
    /**
     * Initialize sheet default properties
     */
    Sheet.prototype.initializeSheetProperties = function () {
        var sheetViews = new xmlNode_1.XmlNode("sheetViews");
        this.sheetView = new xmlNode_1.XmlNode("sheetView");
        this.TabSelected = new xmlAttribute_1.XmlAttribute("");
        this.sheetView.attribute(this.TabSelected);
        this.sheetView.attribute(new xmlAttribute_1.XmlAttribute("workbookViewId", "0"));
        sheetViews.child(this.sheetView);
        this.Pane = new xmlNode_1.XmlNode("pane", [
            new xmlAttribute_1.XmlAttribute("state", "frozen"),
            new xmlAttribute_1.XmlAttribute("activePane", "topRight"),
            new xmlAttribute_1.XmlAttribute("topLeftCell", "A1"),
            new xmlAttribute_1.XmlAttribute("ySplit", "1"),
            new xmlAttribute_1.XmlAttribute("xSplit", "1")
        ]);
        this.Pane.Name = "";
        this.sheetView.child(this.Pane);
        this.Selections = [
            new xmlNode_1.XmlNode("selection", [
                new xmlAttribute_1.XmlAttribute("sqref", "A1"),
                new xmlAttribute_1.XmlAttribute("activeCell", "A1"),
                new xmlAttribute_1.XmlAttribute("pane", "bottomRight", false)
            ])
        ];
        this.sheetView.child(this.Selections[0]);
        this.RootNode.child(sheetViews);
    };
    return Sheet;
}(xmlFile_1.XmlFile));
exports.Sheet = Sheet;
//# sourceMappingURL=sheet.js.map
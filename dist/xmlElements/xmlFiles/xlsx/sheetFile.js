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
var xmlAttribute_1 = require("../../base/xmlAttribute");
var rowNode_1 = require("./rowNode");
/**
 * Define a sheet xml file
 */
var SheetFile = /** @class */ (function (_super) {
    __extends(SheetFile, _super);
    /**
     * Initialize a new sheet in workbook
     * @param {number} index - Index of sheet
     * @param {string} name - Name of sheet
     */
    function SheetFile(index, name) {
        var _this = this;
        index = index || 1;
        _this = _super.call(this, new xmlRootNode_1.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
        _this.rId = "rId" + index.toString(10);
        _this.id = index;
        _this.name = name || "Sheet" + index.toString(10);
        _this.initializeSheetProperties();
        _this.sheetData = new xmlNode_1.XmlNode("sheetData");
        _this.rootNode.child(_this.sheetData);
        return _this;
    }
    /**
     * Clear the selections from sheet view
     */
    SheetFile.prototype.clearSelections = function () {
        this.selections = [];
        this.sheetView.children = [];
        this.sheetView.child(this.pane);
    };
    /**
     * Add a seleciton in sheet view
     * @param {string} activeCell - The active cell
     * @param {string} pane - The pane
     * @param {string} sqref - The sequence reference
     * @param {boolean} paneIsActive - Determine if pane is active
     */
    SheetFile.prototype.addSelection = function (activeCell, pane, sqref, paneIsActive) {
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
        this.selections.push(selection);
        this.sheetView.child(selection);
    };
    /**
     * Add a new column in sheet
     * @param {number} min - Col statring number
     * @param {number} max - Col ending number
     * @param {number} width - Width of each column
     * @param {boolean} bestFit - Determine whether to bestfit width wrt value
     * @param {boolean} hidden - Determine if columns are hidden
     * @returns {XmlNode} - The column node
     */
    SheetFile.prototype.addCol = function (min, max, width, bestFit, hidden) {
        var cols = this.rootNode.child("cols");
        if (cols === null) {
            cols = new xmlNode_1.XmlNode("cols");
            for (var index = 0; index < this.rootNode.children.length; index++) {
                if (this.rootNode.children[index].name === "sheetData") {
                    this.rootNode.children.splice(index, 0, cols);
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
     * @param {string} cellRange - The cell range
     */
    SheetFile.prototype.mergeCells = function (cellRange) {
        var mergeCells = this.rootNode.child("mergeCells");
        if (mergeCells === null) {
            mergeCells = new xmlNode_1.XmlNode("mergeCells", [new xmlAttribute_1.XmlAttribute("count", "0")]);
            for (var index = 0; index < this.rootNode.children.length; index++) {
                if (this.rootNode.children[index].name === "sheetData") {
                    this.rootNode.children.splice(index + 1, 0, mergeCells);
                    break;
                }
            }
        }
        var mergeCell = new xmlNode_1.XmlNode("mergeCell", [
            new xmlAttribute_1.XmlAttribute("ref", cellRange)
        ]);
        mergeCells.child(mergeCell);
        mergeCells.attribute("count").value = mergeCells.children.length.toString(10);
    };
    /**
     * Get or create and get a new row in sheet
     * @param {number} index - The RowNode index
     * @returns {RowNode}
     */
    SheetFile.prototype.getRow = function (index) {
        var sheetRow;
        this.sheetData.children.forEach(function (r) {
            var rno = r.Index;
            if (rno > index) {
                return;
            }
            else if (rno === index) {
                sheetRow = r;
                return;
            }
        });
        return sheetRow;
    };
    /**
     * Get or create and get a new row in sheet
     * @param {number} index - The RowNode index
     * @returns {RowNode}
     */
    SheetFile.prototype.addRow = function (index) {
        var position = 0, sheetRow;
        this.sheetData.children.forEach(function (r) {
            var rno = r.Index;
            if (rno > index) {
                return;
            }
            else if (rno === index) {
                sheetRow = r;
                return;
            }
            position++;
        });
        if (!sheetRow) {
            sheetRow = new rowNode_1.RowNode(index);
            this.sheetData.children.splice(position, 0, sheetRow);
        }
        return sheetRow;
    };
    /**
     * Initialize sheet default properties
     */
    SheetFile.prototype.initializeSheetProperties = function () {
        var sheetViews = new xmlNode_1.XmlNode("sheetViews");
        this.sheetView = new xmlNode_1.XmlNode("sheetView");
        this.tabSelected = new xmlAttribute_1.XmlAttribute("");
        this.sheetView.attribute(this.tabSelected);
        this.sheetView.attribute(new xmlAttribute_1.XmlAttribute("workbookViewId", "0"));
        sheetViews.child(this.sheetView);
        this.pane = new xmlNode_1.XmlNode("pane", [
            new xmlAttribute_1.XmlAttribute("state", "frozen"),
            new xmlAttribute_1.XmlAttribute("activePane", "topRight"),
            new xmlAttribute_1.XmlAttribute("topLeftCell", "A1"),
            new xmlAttribute_1.XmlAttribute("ySplit", "1"),
            new xmlAttribute_1.XmlAttribute("xSplit", "1")
        ]);
        this.pane.name = "";
        this.sheetView.child(this.pane);
        this.selections = [
            new xmlNode_1.XmlNode("selection", [
                new xmlAttribute_1.XmlAttribute("sqref", "A1"),
                new xmlAttribute_1.XmlAttribute("activeCell", "A1"),
                new xmlAttribute_1.XmlAttribute("pane", "bottomRight", false)
            ])
        ];
        this.sheetView.child(this.selections[0]);
        this.rootNode.child(sheetViews);
    };
    return SheetFile;
}(xmlFile_1.XmlFile));
exports.SheetFile = SheetFile;
//# sourceMappingURL=sheetFile.js.map
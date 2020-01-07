"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("../../entities/base/node");
/**
 * The Cell class
 */
var Cell = /** @class */ (function () {
    /**
     * Initialize a Cell instance
     * @param {SheetFile} sheet - Sheet of cell
     * @param {CellUtility} cellUtility - Cell Utility for operations
     * @param {string} value - The value of cell
     * @param {string} _type - The type of cell
     * @param {string} _index - The index of cell
     * @param {number} _row - The row of cell
     * @param {string} _column - The column of cell
     * @param {string} formula - The formula on cell
     */
    function Cell(sheet, cellUtility, value, _type, _index, _row, _column, formula) {
        if (value === void 0) { value = ""; }
        if (_type === void 0) { _type = "string"; }
        if (_index === void 0) { _index = "A1"; }
        if (_row === void 0) { _row = 1; }
        if (_column === void 0) { _column = "A"; }
        this.value = value;
        this._type = _type;
        this._index = _index;
        this._row = _row;
        this._column = _column;
        this.formula = formula;
        var _sheet = sheet;
        var _cellUtility = cellUtility;
        this.style = function () { };
        this.set = function () { };
    }
    Object.defineProperty(Cell.prototype, "type", {
        /**
         * Get the type of cell
         * @returns {string} - The cell type (numeric | string | formula | sharedString | sharedFormula)
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "index", {
        /**
         * Get the index of cell
         * @returns {string} - The index of cell Column and Row
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "row", {
        /**
         * Get the row of cell
         * @returns {number} - The row number
         */
        get: function () {
            return this._row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "column", {
        /**
         * Get the column of cell
         * @returns {string} - The column string
         */
        get: function () {
            return this._column;
        },
        enumerable: true,
        configurable: true
    });
    Cell.prototype.toJSON = function () {
        return {
            value: this.value,
            type: this.type,
            index: this.index,
            row: this.row,
            column: this.column,
            formula: this.formula
        };
    };
    return Cell;
}());
exports.Cell = Cell;
/**
 * The cell utility class
 */
var CellUtility = /** @class */ (function () {
    /**
     * Initialize a new instance of Cell Utility
     * @param {Sheet} sheet - The sheet instance
     */
    function CellUtility(sheet, eventBus) {
        this.sheet = sheet;
        this.eventBus = eventBus;
    }
    /**
     * Get the cell from sheet
     * @param {number} rn - The row number
     * @param {string} index - The cell index
     * @param {string} cs - The column string
     * @returns {Cell} - The cell type variable
     */
    CellUtility.prototype.getCell = function (rn, index, cs) {
        var row = this.sheet.getRow(rn);
        if (!row) {
            return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
        }
        var cell = row.getCell(index);
        if (!cell) {
            return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
        }
        var _a = this.getCellDetails(cell), value = _a.value, type = _a.type;
        return new Cell(this.sheet, this, value, type, index, rn, cs);
    };
    /**
     * Add a new cell in sheet
     * @param {number} rn - The row number
     * @param {string} index - The cell index
     * @param {string} cs - The column string
     * @param {string} value - The value of cell
     * @param {string} type - The type of cell
     * @param {string} formula - The formula on cell
     * @returns {Cell} - The cell type variable
     */
    CellUtility.prototype.addCell = function (rn, index, cs, value, type, formula) {
        if (value === void 0) { value = ""; }
        if (type === void 0) { type = "string"; }
        var row = this.sheet.addRow(rn);
        var cell = row.cell(index);
        var v = new node_1.Node("v");
        v.value = value;
        cell.children.length = 0;
        switch (type) {
            case "string":
                cell.attribute("t").value = "inlineStr";
                var is = new node_1.Node("is");
                v.name = "t";
                is.child(v);
                cell.child(is);
                break;
            case "numeric":
                cell.attribute("t").value = "";
                cell.child(v);
                break;
            case "sharedString":
                cell.attribute("t").value = "s";
                this.eventBus.trigger("sharedString", value, function (sharedStringIndex) {
                    v.value = sharedStringIndex.index.toString(10);
                });
                cell.child(v);
                break;
            case "formula":
                // Add Value too
                cell.attribute("t").value = "";
                var f = new node_1.Node("f");
                f.value = formula;
                cell.child(f);
                break;
            case "sharedFormula":
                // Add shared formula
                cell.attribute("t").value = "";
                break;
        }
        return this.getCell(rn, index, cs);
    };
    /**
     * Get details like cell value, type from Cell Xml node
     * @param {Node} cell - The Cell node
     * @returns {{value: string, type: string}} - The cell details json
     */
    CellUtility.prototype.getCellDetails = function (cell) {
        var type = cell.attribute("t").value;
        switch (type) {
            case "inlineStr":
                return {
                    value: cell.child("is").child("t").value,
                    type: "string"
                };
                break;
            case "":
                return {
                    value: cell.child("v").value,
                    type: "numeric"
                };
                break;
            case "s":
                var value_1;
                this.eventBus.trigger("sharedString", parseInt(cell.child("v").value, 10), function (sharedStringIndex) {
                    value_1 = sharedStringIndex.value;
                });
                return {
                    value: value_1,
                    type: "sharedString"
                };
                break;
        }
    };
    return CellUtility;
}());
exports.CellUtility = CellUtility;
//# sourceMappingURL=cell.util.js.map
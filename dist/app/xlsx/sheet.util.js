"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util/util");
/**
 * SheetFile Utility Class
 */
var SheetUtility = /** @class */ (function () {
    /**
     * Initialize an instance of new sheetFile utility
     * @param eventBus - Event Bus instance
     * @param name - Name of sheetFile
     */
    function SheetUtility(eventBus, sheetFile, cellUtility) {
        this.eventBus = eventBus;
        this.sheetFile = sheetFile;
        this.bindListeners();
        this.cellUtility = cellUtility;
    }
    Object.defineProperty(SheetUtility.prototype, "isActive", {
        /**
         * Get if sheetFile is active
         * @returns {string} - True if sheetFile is active
         */
        get: function () {
            return this._isActive;
        },
        /**
         * Set sheetFile active or not
         */
        set: function (value) {
            if (value) {
                this.active();
            }
            else {
                throw "Can not have a workbook without any active sheetFile.";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activate focus the sheetFile or focus on current tab
     * @returns - SheetFile utility for chaining
     */
    SheetUtility.prototype.active = function () {
        this.eventBus.trigger("activateTab", this.sheetFile.id - 1);
        this._isActive = true;
        this.sheetFile.tabSelected.value = "1";
        this.sheetFile.tabSelected.isActive = true;
        return this.sheet;
    };
    /**
     * Select a cell or range of cells
     * @param {string} cell - The cell to select
     * @param {string} cellRange - The cell range to select
     * @returns {string} - The selected cell
     */
    SheetUtility.prototype.selectCell = function (cell, cellRange) {
        if (cell) {
            if (util_1.Util.isCellString(cell)) {
                if (this.sheetFile.selections.length === 1) {
                    this.sheetFile.selections[0].attribute("activeCell").value = cell;
                    this.sheetFile.selections[0].attribute("sqref").value = cell;
                }
                else {
                    // Search pane
                    var topLeft = this.sheetFile.pane.attribute("topLeftCell").value;
                    var panelDetails = util_1.Util.getCellColumnRow(topLeft);
                    var cellDetails = util_1.Util.getCellColumnRow(cell);
                    var activePane_1 = "bottomRight";
                    if (cellDetails.row >= panelDetails.row) {
                        if (cellDetails.columnNumber < panelDetails.columnNumber) {
                            activePane_1 = "bottomLeft";
                        }
                    }
                    else {
                        activePane_1 = "topRight";
                        if (cellDetails.columnNumber < panelDetails.columnNumber) {
                            activePane_1 = "bottomRight"; // "topLeft";
                        }
                    }
                    this.sheetFile.selections.forEach(function (selection) {
                        if (selection.attribute("pane").value === "bottomRight" ||
                            selection.attribute("pane").value === activePane_1) {
                            selection.attribute("activeCell").value = cell;
                            selection.attribute("sqref").value = cell;
                        }
                    });
                }
            }
            else {
                throw "Invalid cell value. The possible values for cell are defined by the ST_CellRef.";
            }
        }
        if (cellRange) {
            this.selectCells(cellRange);
        }
        if (this.sheetFile.selections.length === 1) {
            return this.sheetFile.selections[0].attribute("activeCell").value;
        }
    };
    /**
     * Select a range of cells
     * @param {string} cellRange - The cell range to select
     * @returns {string} - The selected cells range
     */
    SheetUtility.prototype.selectCells = function (cellRange) {
        if (cellRange) {
            if (this.sheetFile.selections.length === 1) {
                if (util_1.Util.isCellRangeString(cellRange)) {
                    this.sheetFile.selections[0].attribute("sqref").value = cellRange;
                }
                else if (util_1.Util.isCellString(cellRange)) {
                    this.sheetFile.selections[0].attribute("sqref").value = cellRange;
                }
                else {
                    throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
                }
            }
            else {
                // Search pane
                this.sheetFile.selections.forEach(function (selection) {
                    if (selection.attribute("pane").value === "bottomRight") {
                        if (util_1.Util.isCellRangeString(cellRange)) {
                            selection.attribute("sqref").value = cellRange;
                        }
                        else if (util_1.Util.isCellString(cellRange)) {
                            selection.attribute("sqref").value = cellRange;
                        }
                    }
                });
            }
        }
        return this.sheetFile.selections[0].attribute("sqref").value;
    };
    /**
     * Freeze rows and columns of sheetFile
     * @param {number} rows - Number of rows from first row of sheetFile to freeze
     * @param {number} columns - Number of columns from first column of sheetFile to freeze
     * @returns - Sheet for chaining
     */
    SheetUtility.prototype.freezePane = function (rows, columns) {
        if (!rows && !columns) {
            // Remove Pane
            this.sheetFile.pane.name = "";
        }
        else {
            var topLeftCell = util_1.Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
            var activePane = "bottomRight";
            var _a = util_1.Util.getCellColumnRow(this.selectCell()), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
            var numberOfPanes = this.calculateNumberOfPanes(rows, columns);
            this.sheetFile.clearSelections();
            if (numberOfPanes === 0) {
                this.sheetFile.pane.name = "";
                this.sheetFile.addSelection(column + row);
                return this.sheet;
            }
            if (row >= (rows || 0) + 1) {
                if (columnNumber < (columns || 0) + 1) {
                    activePane = "bottomLeft";
                }
            }
            else {
                activePane = "topRight";
                if (columnNumber < (columns || 0) + 1) {
                    activePane = "bottomRight"; // "topLeft";
                }
            }
            this.sheetFile.pane.name = "pane";
            this.sheetFile.pane.attribute("activePane").value = activePane;
            this.sheetFile.pane.attribute("topLeftCell").value = topLeftCell;
            if (columns && columns > 1) {
                this.sheetFile.pane.attribute("xSplit").value = rows.toString();
            }
            else {
                this.sheetFile.pane.attribute("xSplit").isActive = false;
            }
            if (rows && rows > 1) {
                this.sheetFile.pane.attribute("ySplit").value = columns.toString();
            }
            else {
                this.sheetFile.pane.attribute("ySplit").isActive = false;
            }
            if (numberOfPanes === 2) {
                this.sheetFile.addSelection(column + row, activePane, null, true);
            }
            else {
                var rowString = activePane !== "topRight" ? null : column + row;
                this.sheetFile.addSelection(rowString, "topRight", null, true);
                rowString = activePane !== "bottomLeft" ? null : column + row;
                this.sheetFile.addSelection(rowString, "bottomLeft", null, true);
                rowString = column + row;
                this.sheetFile.addSelection(rowString, "bottomRight", null, true);
            }
        }
        return this.sheet;
    };
    /**
     * Get or set the column of sheetFile
     * @param {{}} options - The column options
     */
    SheetUtility.prototype.column = function (options) {
        this.sheetFile.addCol(options.from, options.to || options.from, options.width, options.bestFit, options.hidden);
        return this.sheet;
    };
    /**
     * Merge cells in sheetFile
     * @param {string} cellRange - Cell range to merge
     * @returns - SheetFile utility for chaining
     */
    SheetUtility.prototype.merge = function (cellRange) {
        if (util_1.Util.isCellRangeString(cellRange)) {
            this.sheetFile.mergeCells(cellRange);
            return this.sheet;
        }
        else {
            throw "Invalid Cell Range string. The possible values for this are defined by the ST_Sqref.";
        }
    };
    /**
     * Get or set the cell of sheetFile
     * @param {number} row - The row number of cell
     * @param {number} column - The column number of cell
     * @param {string | number | { value: string; type?: string, formula?: string }} options - The Cell value or options
     */
    SheetUtility.prototype.cell = function (row, column, options) {
        if (!util_1.Util.isValidRowNumber(row) || !util_1.Util.isValidColumnNumber(column)) {
            throw "Row and Column should be valid.";
        }
        // If values are set instead options
        if (typeof options === "number") {
            options = { value: options.toString(10), type: "numeric" };
        }
        else if (typeof options === "string" && options) {
            options = { value: options, type: "string" };
        }
        var cs = util_1.Util.toColumnString(column);
        if (!options) {
            // Get cell
            return this.cellUtility.getCell(row, cs + row.toString(10), cs);
        }
        else if (typeof options === "object" && options.value) {
            return this.cellUtility.addCell(row, cs + row.toString(10), cs, options.value, options.type, options.formula);
        }
    };
    /**
     * Bind Event Listeners on Bus
     */
    SheetUtility.prototype.bindListeners = function () {
        var _this = this;
        this.eventBus.startListening("activateTab", function (tabNumber) {
            if (tabNumber != _this.sheetFile.id - 1) {
                _this._isActive = false;
                _this.sheetFile.tabSelected.value = "";
                _this.sheetFile.tabSelected.isActive = false;
            }
        });
    };
    /**
     * Calculate pane numbers
     * @param rows - Total rows for pane
     * @param columns - Total columns for pane
     */
    SheetUtility.prototype.calculateNumberOfPanes = function (rows, columns) {
        if (rows < 1 && columns < 1) {
            return 0;
        }
        else if (rows < 1 || columns < 1) {
            return 2;
        }
        else
            return 4;
    };
    return SheetUtility;
}());
exports.SheetUtility = SheetUtility;
//# sourceMappingURL=sheet.util.js.map
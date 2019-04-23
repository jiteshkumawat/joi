"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sheetFile_1 = require("../../xmlElements/xmlFiles/xlsx/sheetFile");
var util_1 = require("../../shared/util");
var cellUtility_1 = require("./cellUtility");
/**
 * SheetFile Utility Class
 */
var SheetUtility = /** @class */ (function () {
    /**
     * Initialize an instance of new sheet utility
     * @param workbook - WorkbookFile containing sheet
     * @param eventBus - Event Bus instance
     * @param name - Name of sheet
     */
    function SheetUtility(workbook, eventBus, name) {
        this.eventBus = eventBus;
        this.sheet = new sheetFile_1.SheetFile(workbook.totalSheet + 1, name);
        this.triggerInitialize();
        this.bindListeners();
        workbook.addSheet(this.sheet);
        if (this.sheet.id === 1) {
            this.active();
        }
        this.cellUtility = new cellUtility_1.CellUtility(this.sheet);
    }
    Object.defineProperty(SheetUtility.prototype, "isActive", {
        /**
         * Get if sheet is active
         * @returns {string} - True if sheet is active
         */
        get: function () {
            return this._isActive;
        },
        /**
         * Set sheet active or not
         */
        set: function (value) {
            if (value) {
                this.active();
            }
            else {
                throw "Can not have a workbook without any active sheet.";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Activate focus the sheet or focus on current tab
     * @returns - SheetFile utility for chaining
     */
    SheetUtility.prototype.active = function () {
        this.eventBus.trigger("activateTab", this.sheet.id - 1);
        this._isActive = true;
        this.sheet.tabSelected.value = "1";
        this.sheet.tabSelected.state = true;
        return this;
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
                if (this.sheet.selections.length === 1) {
                    this.sheet.selections[0].attribute("activeCell").value = cell;
                    this.sheet.selections[0].attribute("sqref").value = cell;
                }
                else {
                    // Search pane
                    var topLeft = this.sheet.pane.attribute("topLeftCell").value;
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
                    this.sheet.selections.forEach(function (selection) {
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
        if (this.sheet.selections.length === 1) {
            return this.sheet.selections[0].attribute("activeCell").value;
        }
    };
    /**
     * Select a range of cells
     * @param {string} cellRange - The cell range to select
     * @returns {string} - The selected cells range
     */
    SheetUtility.prototype.selectCells = function (cellRange) {
        if (cellRange) {
            if (this.sheet.selections.length === 1) {
                if (util_1.Util.isCellRangeString(cellRange)) {
                    this.sheet.selections[0].attribute("sqref").value = cellRange;
                }
                else if (util_1.Util.isCellString(cellRange)) {
                    this.sheet.selections[0].attribute("sqref").value = cellRange;
                }
                else {
                    throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
                }
            }
            else {
                // Search pane
                this.sheet.selections.forEach(function (selection) {
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
        return this.sheet.selections[0].attribute("sqref").value;
    };
    /**
     * Freeze rows and columns of sheet
     * @param {number} rows - Number of rows from first row of sheet to freeze
     * @param {number} columns - Number of columns from first column of sheet to freeze
     * @returns - SheetFile utility for chaining
     */
    SheetUtility.prototype.freezePane = function (rows, columns) {
        if (!rows && !columns) {
            // Remove Pane
            this.sheet.pane.name = "";
        }
        else {
            var topLeftCell = util_1.Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
            var activePane = "bottomRight";
            var _a = util_1.Util.getCellColumnRow(this.selectCell()), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
            var numberOfPanes = this.calculateNumberOfPanes(rows, columns);
            this.sheet.clearSelections();
            if (numberOfPanes === 0) {
                this.sheet.pane.name = "";
                this.sheet.addSelection(column + row);
                return this;
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
            this.sheet.pane.name = "pane";
            this.sheet.pane.attribute("activePane").value = activePane;
            this.sheet.pane.attribute("topLeftCell").value = topLeftCell;
            if (columns && columns > 1) {
                this.sheet.pane.attribute("xSplit").value = rows.toString();
            }
            else {
                this.sheet.pane.attribute("xSplit").state = false;
            }
            if (rows && rows > 1) {
                this.sheet.pane.attribute("ySplit").value = columns.toString();
            }
            else {
                this.sheet.pane.attribute("ySplit").state = false;
            }
            if (numberOfPanes === 2) {
                this.sheet.addSelection(column + row, activePane, null, true);
            }
            else {
                var rowString = activePane !== "topRight" ? null : column + row;
                this.sheet.addSelection(rowString, "topRight", null, true);
                rowString = activePane !== "bottomLeft" ? null : column + row;
                this.sheet.addSelection(rowString, "bottomLeft", null, true);
                rowString = column + row;
                this.sheet.addSelection(rowString, "bottomRight", null, true);
            }
        }
        return this;
    };
    /**
     * Get or set the column of sheet
     * @param {{}} options - The column options
     */
    SheetUtility.prototype.column = function (options) {
        this.sheet.addCol(options.from, options.to || options.from, options.width, options.bestFit, options.hidden);
        return this;
    };
    /**
     * Merge cells in sheet
     * @param {string} cellRange - Cell range to merge
     * @returns - SheetFile utility for chaining
     */
    SheetUtility.prototype.merge = function (cellRange) {
        if (util_1.Util.isCellRangeString(cellRange)) {
            this.sheet.mergeCells(cellRange);
            return this;
        }
        else {
            throw "Invalid Cell Range string. The possible values for this are defined by the ST_Sqref.";
        }
    };
    /**
     * Get or set the cell of sheet
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
            options = { value: options.toString(10), type: "number" };
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
     * Trigger Initialized Events
     */
    SheetUtility.prototype.triggerInitialize = function () {
        this.eventBus.trigger("addFile", this.sheet);
        this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + this.sheet.filePath + "/" + this.sheet.fileName);
        this.eventBus.trigger("addWorkbookRelation", "sheets/" + this.sheet.fileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", this.sheet.id);
    };
    /**
     * Bind Event Listeners on Bus
     */
    SheetUtility.prototype.bindListeners = function () {
        var _this = this;
        this.eventBus.startListening("activateTab", function (tabNumber) {
            if (tabNumber != _this.sheet.id - 1) {
                _this._isActive = false;
                _this.sheet.tabSelected.value = "";
                _this.sheet.tabSelected.state = false;
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
//# sourceMappingURL=sheetUtility.js.map
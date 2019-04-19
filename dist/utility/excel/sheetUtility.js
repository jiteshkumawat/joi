"use strict";
exports.__esModule = true;
var sheet_1 = require("../../xmlElements/xmlFiles/xlsx/sheet");
var util_1 = require("../../shared/util");
/**
 * Sheet Utility Class
 */
var SheetUtility = /** @class */ (function () {
    /**
     * Initialize an instance of new sheet utility
     * @param workbook - Workbook containing sheet
     * @param eventBus - Event Bus instance
     * @param name - Name of sheet
     */
    function SheetUtility(workbook, eventBus, name) {
        this.eventBus = eventBus;
        this.sheet = new sheet_1.Sheet(workbook.TotalSheet + 1, name);
        this.triggerInitialize();
        this.bindListeners();
        workbook.addSheet(this.sheet);
        if (this.sheet.Id === 1) {
            this.active();
        }
    }
    /**
     * Activate focus the sheet or focus on current tab
     * @returns {SheetUtility} - Sheet utility for chaining
     */
    SheetUtility.prototype.active = function () {
        this.eventBus.trigger("activateTab", this.sheet.Id - 1);
        this.IsActive = true;
        this.sheet.TabSelected.Value = "1";
        this.sheet.TabSelected.State = true;
        return this;
    };
    /**
     * Select a cell or range of cells
     * @param cell - The cell to select
     * @param cellRange - The cell range to select
     * @returns {string} - The selected cell
     */
    SheetUtility.prototype.selectCell = function (cell, cellRange) {
        if (cell) {
            if (util_1.Util.isCellString(cell)) {
                if (this.sheet.Selections.length === 1) {
                    this.sheet.Selections[0].attribute("activeCell").Value = cell;
                    this.sheet.Selections[0].attribute("sqref").Value = cell;
                }
                else {
                    // Search pane
                    var topLeft = this.sheet.Pane.attribute("topLeftCell").Value;
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
                    this.sheet.Selections.forEach(function (selection) {
                        if (selection.attribute("pane").Value === "bottomRight" ||
                            selection.attribute("pane").Value === activePane_1) {
                            selection.attribute("activeCell").Value = cell;
                            selection.attribute("sqref").Value = cell;
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
        if (this.sheet.Selections.length === 1) {
            return this.sheet.Selections[0].attribute("activeCell").Value;
        }
    };
    /**
     * Select a range of cells
     * @param cellRange - The cell range to select
     * @returns {string} - The selected cells range
     */
    SheetUtility.prototype.selectCells = function (cellRange) {
        if (cellRange) {
            if (this.sheet.Selections.length === 1) {
                if (util_1.Util.isCellRangeString(cellRange)) {
                    this.sheet.Selections[0].attribute("sqref").Value = cellRange;
                }
                else if (util_1.Util.isCellString(cellRange)) {
                    this.sheet.Selections[0].attribute("sqref").Value = cellRange;
                }
                else {
                    throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
                }
            }
            else {
                // Search pane
                this.sheet.Selections.forEach(function (selection) {
                    if (selection.attribute("pane").Value === "bottomRight") {
                        if (util_1.Util.isCellRangeString(cellRange)) {
                            selection.attribute("sqref").Value = cellRange;
                        }
                        else if (util_1.Util.isCellString(cellRange)) {
                            selection.attribute("sqref").Value = cellRange;
                        }
                    }
                });
            }
        }
        return this.sheet.Selections[0].attribute("sqref").Value;
    };
    /**
     * Freeze rows and columns of sheet
     * @param rows - Number of rows from first row of sheet to freeze
     * @param columns - Number of columns from first column of sheet to freeze
     * @returns {SheetUtility} - Sheet utility for chaining
     */
    SheetUtility.prototype.freezePane = function (rows, columns) {
        if (!rows && !columns) {
            // Remove Pane
            this.sheet.Pane.Name = "";
        }
        else {
            var topLeftCell = util_1.Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
            var activePane = "bottomRight";
            var _a = util_1.Util.getCellColumnRow(this.selectCell()), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
            var numberOfPanes = this.calculateNumberOfPanes(rows, columns);
            this.sheet.clearSelections();
            if (numberOfPanes === 0) {
                this.sheet.Pane.Name = "";
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
            this.sheet.Pane.Name = "pane";
            this.sheet.Pane.attribute("activePane").Value = activePane;
            this.sheet.Pane.attribute("topLeftCell").Value = topLeftCell;
            if (columns && columns > 1) {
                this.sheet.Pane.attribute("xSplit").Value = rows.toString();
            }
            else {
                this.sheet.Pane.attribute("xSplit").State = false;
            }
            if (rows && rows > 1) {
                this.sheet.Pane.attribute("ySplit").Value = columns.toString();
            }
            else {
                this.sheet.Pane.attribute("ySplit").State = false;
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
     *
     * @param width - Width of column to set
     * @param colNumberFrom - Column number to start from
     * @param colNumberTo - Column number to end
     * @returns {SheetUtility} - Sheet utility for chaining
     */
    SheetUtility.prototype.column = function (options) {
        this.sheet.addCol(options.from, options.to || options.from, options.width, options.bestFit, options.hidden);
        return this;
    };
    /**
     * Merge cells in sheet
     * @param cellRange - Cell range to merge
     * @returns {SheetUtility} - Sheet utility for chaining
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
     * Trigger Initialized Events
     */
    SheetUtility.prototype.triggerInitialize = function () {
        this.eventBus.trigger("addFile", this.sheet);
        this.eventBus.trigger("addContentType", "Override", "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", "/" + this.sheet.FilePath + "/" + this.sheet.FileName);
        this.eventBus.trigger("addWorkbookRelation", "sheets/" + this.sheet.FileName, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", this.sheet.Id);
    };
    /**
     * Bind Event Listeners on Bus
     */
    SheetUtility.prototype.bindListeners = function () {
        var _this = this;
        this.eventBus.startListening("activateTab", function (tabNumber) {
            if (tabNumber != _this.sheet.Id - 1) {
                _this.IsActive = false;
                _this.sheet.TabSelected.Value = "";
                _this.sheet.TabSelected.State = false;
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
import { SheetFile } from "../../xmlElements/xmlFiles/xlsx/sheetFile";
import { EventBus } from "../../shared/eventBus";
import { WorkbookFile } from "../../xmlElements/xmlFiles/xlsx/workbookFile";
import { Util } from "../../shared/util";
import { CellUtility } from "./cellUtility";

/**
 * SheetFile Utility Class
 */
export class SheetUtility {
  /**
   * Initialize an instance of new sheet utility
   * @param workbook - WorkbookFile containing sheet
   * @param eventBus - Event Bus instance
   * @param name - Name of sheet
   */
  constructor(
    workbook: WorkbookFile,
    private eventBus: EventBus,
    name?: string
  ) {
    this.sheet = new SheetFile(workbook.totalSheet + 1, name);

    this.triggerInitialize();
    this.bindListeners();
    workbook.addSheet(this.sheet);

    if (this.sheet.id === 1) {
      this.active();
    }

    this.cellUtility = new CellUtility(this.sheet);
  }

  /**
   * The sheet instance
   */
  private sheet: SheetFile;

  /**
   * Identify if sheet is active
   */
  private _isActive: boolean;

  private cellUtility: CellUtility;

  /**
   * Get if sheet is active
   * @returns {string} - True if sheet is active
   */
  public get isActive(): boolean {
    return this._isActive;
  }

  /**
   * Set sheet active or not
   */
  public set isActive(value: boolean) {
    if (value) {
      this.active();
    } else {
      throw "Can not have a workbook without any active sheet.";
    }
  }

  /**
   * Activate focus the sheet or focus on current tab
   * @returns - SheetFile utility for chaining
   */
  public active(): SheetUtility {
    this.eventBus.trigger("activateTab", this.sheet.id - 1);
    this._isActive = true;
    this.sheet.tabSelected.value = "1";
    this.sheet.tabSelected.state = true;
    return this;
  }

  /**
   * Select a cell or range of cells
   * @param {string} cell - The cell to select
   * @param {string} cellRange - The cell range to select
   * @returns {string} - The selected cell
   */
  public selectCell(cell?: string, cellRange?: string): string {
    if (cell) {
      if (Util.isCellString(cell)) {
        if (this.sheet.selections.length === 1) {
          this.sheet.selections[0].attribute("activeCell").value = cell;
          this.sheet.selections[0].attribute("sqref").value = cell;
        } else {
          // Search pane
          const topLeft = this.sheet.pane.attribute("topLeftCell").value;
          const panelDetails = Util.getCellColumnRow(topLeft);
          const cellDetails = Util.getCellColumnRow(cell);
          let activePane = "bottomRight";
          if (cellDetails.row >= panelDetails.row) {
            if (cellDetails.columnNumber < panelDetails.columnNumber) {
              activePane = "bottomLeft";
            }
          } else {
            activePane = "topRight";
            if (cellDetails.columnNumber < panelDetails.columnNumber) {
              activePane = "bottomRight"; // "topLeft";
            }
          }

          this.sheet.selections.forEach(selection => {
            if (
              selection.attribute("pane").value === "bottomRight" ||
              selection.attribute("pane").value === activePane
            ) {
              selection.attribute("activeCell").value = cell;
              selection.attribute("sqref").value = cell;
            }
          });
        }
      } else {
        throw "Invalid cell value. The possible values for cell are defined by the ST_CellRef.";
      }
    }
    if (cellRange) {
      this.selectCells(cellRange);
    }
    if (this.sheet.selections.length === 1) {
      return this.sheet.selections[0].attribute("activeCell").value;
    }
  }

  /**
   * Select a range of cells
   * @param {string} cellRange - The cell range to select
   * @returns {string} - The selected cells range
   */
  public selectCells(cellRange?: string): string {
    if (cellRange) {
      if (this.sheet.selections.length === 1) {
        if (Util.isCellRangeString(cellRange)) {
          this.sheet.selections[0].attribute("sqref").value = cellRange;
        } else if (Util.isCellString(cellRange)) {
          this.sheet.selections[0].attribute("sqref").value = cellRange;
        } else {
          throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
        }
      } else {
        // Search pane
        this.sheet.selections.forEach(selection => {
          if (selection.attribute("pane").value === "bottomRight") {
            if (Util.isCellRangeString(cellRange)) {
              selection.attribute("sqref").value = cellRange;
            } else if (Util.isCellString(cellRange)) {
              selection.attribute("sqref").value = cellRange;
            }
          }
        });
      }
    }
    return this.sheet.selections[0].attribute("sqref").value;
  }

  /**
   * Freeze rows and columns of sheet
   * @param {number} rows - Number of rows from first row of sheet to freeze
   * @param {number} columns - Number of columns from first column of sheet to freeze
   * @returns - SheetFile utility for chaining
   */
  public freezePane(rows?: number, columns?: number): SheetUtility {
    if (!rows && !columns) {
      // Remove Pane
      this.sheet.pane.name = "";
    } else {
      const topLeftCell =
        Util.toColumnString((columns || 0) + 1) + ((rows || 0) + 1);
      let activePane = "bottomRight";
      const { column, row, columnNumber } = Util.getCellColumnRow(
        this.selectCell()
      );
      const numberOfPanes = this.calculateNumberOfPanes(rows, columns);
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
      } else {
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
      } else {
        this.sheet.pane.attribute("xSplit").state = false;
      }
      if (rows && rows > 1) {
        this.sheet.pane.attribute("ySplit").value = columns.toString();
      } else {
        this.sheet.pane.attribute("ySplit").state = false;
      }

      if (numberOfPanes === 2) {
        this.sheet.addSelection(column + row, activePane, null, true);
      } else {
        let rowString = activePane !== "topRight" ? null : column + row;
        this.sheet.addSelection(rowString, "topRight", null, true);

        rowString = activePane !== "bottomLeft" ? null : column + row;
        this.sheet.addSelection(rowString, "bottomLeft", null, true);

        rowString = column + row;
        this.sheet.addSelection(rowString, "bottomRight", null, true);
      }
    }

    return this;
  }

  /**
   * Get or set the column of sheet
   * @param {{}} options - The column options
   */
  public column(options: {
    from: number;
    to?: number;
    width?: number;
    bestFit?: boolean;
    hidden?: boolean;
  }): SheetUtility {
    this.sheet.addCol(
      options.from,
      options.to || options.from,
      options.width,
      options.bestFit,
      options.hidden
    );

    return this;
  }

  /**
   * Merge cells in sheet
   * @param {string} cellRange - Cell range to merge
   * @returns - SheetFile utility for chaining
   */
  public merge(cellRange: string): SheetUtility {
    if (Util.isCellRangeString(cellRange)) {
      this.sheet.mergeCells(cellRange);
      return this;
    } else {
      throw "Invalid Cell Range string. The possible values for this are defined by the ST_Sqref.";
    }
  }

  /**
   * Get or set the cell of sheet
   * @param {number} row - The row number of cell
   * @param {number} column - The column number of cell
   * @param {string | number | { value: string; type?: string, formula?: string }} options - The Cell value or options
   */
  public cell(
    row: number,
    column: number,
    options?:
      | string
      | number
      | { value: string; type?: string; formula?: string }
  ) {
    if (!Util.isValidRowNumber(row) || !Util.isValidColumnNumber(column)) {
      throw "Row and Column should be valid.";
    }

    // If values are set instead options
    if (typeof options === "number") {
      options = { value: options.toString(10), type: "number" };
    } else if (typeof options === "string" && options) {
      options = { value: options, type: "string" };
    }

    const cs = Util.toColumnString(column);
    if (!options) {
      // Get cell
      return this.cellUtility.getCell(row, cs + row.toString(10), cs);
    } else if (typeof options === "object" && options.value) {
      return this.cellUtility.addCell(
        row,
        cs + row.toString(10),
        cs,
        options.value,
        options.type,
        options.formula
      );
    }
  }

  /**
   * Trigger Initialized Events
   */
  private triggerInitialize() {
    this.eventBus.trigger("addFile", this.sheet);
    this.eventBus.trigger(
      "addContentType",
      "Override",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      "/" + this.sheet.filePath + "/" + this.sheet.fileName
    );
    this.eventBus.trigger(
      "addWorkbookRelation",
      "sheets/" + this.sheet.fileName,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      this.sheet.id
    );
  }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners() {
    this.eventBus.startListening("activateTab", (tabNumber: number) => {
      if (tabNumber != this.sheet.id - 1) {
        this._isActive = false;
        this.sheet.tabSelected.value = "";
        this.sheet.tabSelected.state = false;
      }
    });
  }

  /**
   * Calculate pane numbers
   * @param rows - Total rows for pane
   * @param columns - Total columns for pane
   */
  private calculateNumberOfPanes(rows: number, columns: number) {
    if (rows < 1 && columns < 1) {
      return 0;
    } else if (rows < 1 || columns < 1) {
      return 2;
    } else return 4;
  }
}

import { Sheet } from "../../xmlElements/xmlFiles/xlsx/sheet";
import { EventBus } from "../../shared/eventBus";
import { Workbook } from "../../xmlElements/xmlFiles/xlsx/workbook";
import { Util } from "../../shared/util";

/**
 * Sheet Utility Class
 */
export class SheetUtility {
  /**
   * Initialize an instance of new sheet utility
   * @param workbook - Workbook containing sheet
   * @param eventBus - Event Bus instance
   * @param name - Name of sheet
   */
  constructor(workbook: Workbook, private eventBus: EventBus, name?: string) {
    this.sheet = new Sheet(workbook.TotalSheet + 1, name);

    this.triggerInitialize();
    this.bindListeners();
    workbook.addSheet(this.sheet);

    if (this.sheet.Id === 1) {
      this.active();
    }
  }

  /**
   * The sheet instance
   */
  private sheet: Sheet;

  /**
   * Identify if sheet is active
   */
  public IsActive: boolean;

  /**
   * Activate focus the sheet or focus on current tab
   */
  public active() {
    this.eventBus.trigger("activateTab", this.sheet.Id - 1);
    this.IsActive = true;
    this.sheet.TabSelected.Value = "1";
    this.sheet.TabSelected.State = true;
    return this;
  }

  /**
   * Select a cell or range of cells
   * @param cell - The cell to select
   * @param cellRange - The cell range to select
   */
  public selectCell(cell?: string, cellRange?: string) {
    if (cell) {
      if (Util.isCellString(cell)) {
        if (this.sheet.Selections.length === 1) {
          this.sheet.Selections[0].attribute("activeCell").Value = cell;
          this.sheet.Selections[0].attribute("sqref").Value = cell;
        } else {
          // Search pane
          const topLeft = this.sheet.Pane.attribute("topLeftCell").Value;
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

          this.sheet.Selections.forEach(selection => {
            if (
              selection.attribute("pane").Value === "bottomRight" ||
              selection.attribute("pane").Value === activePane
            ) {
              selection.attribute("activeCell").Value = cell;
              selection.attribute("sqref").Value = cell;
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
    if (this.sheet.Selections.length === 1) {
      return this.sheet.Selections[0].attribute("activeCell").Value;
    }
  }

  /**
   * Select a range of cells
   * @param cellRange - The cell range to select
   */
  public selectCells(cellRange?: string) {
    if (cellRange) {
      if (this.sheet.Selections.length === 1) {
        if (Util.isCellRangeString(cellRange)) {
          this.sheet.Selections[0].attribute("sqref").Value = cellRange;
        } else if (Util.isCellString(cellRange)) {
          this.sheet.Selections[0].attribute("sqref").Value = cellRange;
        } else {
          throw "Invalid cell range value. The possible values for this are defined by the ST_Sqref.";
        }
      } else {
        // Search pane
        this.sheet.Selections.forEach(selection => {
          if (selection.attribute("pane").Value === "bottomRight") {
            if (Util.isCellRangeString(cellRange)) {
              selection.attribute("sqref").Value = cellRange;
            } else if (Util.isCellString(cellRange)) {
              selection.attribute("sqref").Value = cellRange;
            }
          }
        });
      }
    }
    return this.sheet.Selections[0].attribute("sqref").Value;
  }

  /**
   * Freeze rows and columns of sheet
   * @param rows - Number of rows from first row of sheet to freeze
   * @param columns - Number of columns from first column of sheet to freeze
   */
  public freezePane(rows?: number, columns?: number) {
    if (!rows && !columns) {
      // Remove Pane
      this.sheet.Pane.Name = "";
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
        this.sheet.Pane.Name = "";
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

      this.sheet.Pane.Name = "pane";
      this.sheet.Pane.attribute("activePane").Value = activePane;
      this.sheet.Pane.attribute("topLeftCell").Value = topLeftCell;
      if (columns && columns > 1) {
        this.sheet.Pane.attribute("xSplit").Value = rows.toString();
      } else {
        this.sheet.Pane.attribute("xSplit").State = false;
      }
      if (rows && rows > 1) {
        this.sheet.Pane.attribute("ySplit").Value = columns.toString();
      } else {
        this.sheet.Pane.attribute("ySplit").State = false;
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
   *
   * @param width - Width of column to set
   * @param colNumberFrom - Column number to start from
   * @param colNumberTo - Column number to end
   */
  public column(options: {
    from: number;
    to?: number;
    width?: number;
    bestFit?: boolean;
    hidden?: boolean;
  }) {
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
   * @param cellRange - Cell range to merge
   */
  public merge(cellRange: string) {
    if (Util.isCellRangeString(cellRange)) {
      this.sheet.mergeCells(cellRange);
    } else {
      throw "Invalid Cell Range string. The possible values for this are defined by the ST_Sqref.";
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
      "/" + this.sheet.FilePath + "/" + this.sheet.FileName
    );
    this.eventBus.trigger(
      "addWorkbookRelation",
      "sheets/" + this.sheet.FileName,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      this.sheet.Id
    );
  }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners() {
    this.eventBus.startListening("activateTab", (tabNumber: number) => {
      if (tabNumber != this.sheet.Id - 1) {
        this.IsActive = false;
        this.sheet.TabSelected.Value = "";
        this.sheet.TabSelected.State = false;
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

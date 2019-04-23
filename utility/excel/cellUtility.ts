import { SheetFile } from "../../xmlElements/xmlFiles/xlsx/sheetFile";
import { XmlNode } from "../../xmlElements/base/xmlNode";

/**
 * The Cell class
 */
export class Cell {
  /**
   * Initialize a Cell instance
   * @param {Sheet} sheet - Sheet of cell
   * @param {CellUtility} cellUtility - Cell Utility for operations
   * @param {string} value - The value of cell
   * @param {string} _type - The type of cell
   * @param {string} _index - The index of cell
   * @param {number} _row - The row of cell
   * @param {string} _column - The column of cell
   * @param {string} formula - The formula on cell
   */
  constructor(
    sheet: SheetFile,
    cellUtility: CellUtility,
    public value: string = "",
    private _type: string = "string",
    private _index: string = "A1",
    private _row: number = 1,
    private _column: string = "A",
    public formula?: string
  ) {
    const _sheet = sheet;
    const _cellUtility = cellUtility;

    this.style = () => {};

    this.set = () => {};
  }

  /**
   * Get the type of cell
   * @returns {string} - The cell type (numeric | string | formula | sharedString | sharedFormula)
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Get the index of cell
   * @returns {string} - The index of cell Column and Row
   */
  public get index(): string {
    return this._index;
  }

  /**
   * Get the row of cell
   * @returns {number} - The row number
   */
  public get row(): number {
    return this._row;
  }

  /**
   * Get the column of cell
   * @returns {string} - The column string
   */
  public get column(): string {
    return this._column;
  }

  /**
   * The sheet instance
   */
  private sheet: SheetFile;

  /**
   * The cell utility instance
   */
  private cellUtility: CellUtility;

  public style: Function;
  public set: Function;

  public toJSON() {
    return {
      value: this.value,
      type: this.type,
      index: this.index,
      row: this.row,
      column: this.column,
      formula: this.formula
    };
  }
}

/**
 * The cell utility class
 */
export class CellUtility {
  /**
   * Initialize a new instance of Cell Utility
   * @param {Sheet} sheet - The sheet instance
   */
  constructor(private sheet: SheetFile) {}

  /**
   * Get the cell from sheet
   * @param {number} rn - The row number
   * @param {string} index - The cell index
   * @param {string} cs - The column string
   * @returns {Cell} - The cell type variable
   */
  public getCell(rn: number, index: string, cs: string): Cell {
    const row = this.sheet.getRow(rn);
    if (!row) {
      return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
    }

    const cell = row.getCell(index);
    if (!cell) {
      return new Cell(this.sheet, this, undefined, undefined, index, rn, cs);
    }

    const { value, type } = this.getCellDetails(cell);

    return new Cell(this.sheet, this, value, type, index, rn, cs);
  }

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
  public addCell(
    rn: number,
    index: string,
    cs: string,
    value: string = "",
    type: string = "string",
    formula?: string
  ): Cell {
    const row = this.sheet.addRow(rn);
    const cell = row.addCell(index);

    const v = new XmlNode("v");
    v.value = value;

    cell.children.length = 0;
    switch (type) {
      case "string":
        cell.attribute("t").value = "inlineStr";
        const is = new XmlNode("is");
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
        // calculate shared string value
        cell.child(v);
        break;
      case "formula":
        // Add Value too
        cell.attribute("t").value = "";
        const f = new XmlNode("f");
        f.value = formula;
        cell.child(f);
        break;
      case "sharedFormula":
        // Add shared formula
        cell.attribute("t").value = "";
        break;
    }

    return this.getCell(rn, index, cs);
  }

  /**
   * Get details like cell value, type from Cell Xml node
   * @param {XmlNode} cell - The Cell node
   * @returns {{value: string, type: string}} - The cell details json
   */
  private getCellDetails(cell: XmlNode): { value: string; type: string } {
    
    const type = cell.attribute("t").value;
    switch (type) {
      case "inlineStr":
      console.log(cell.toString());
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
    }
  }
}

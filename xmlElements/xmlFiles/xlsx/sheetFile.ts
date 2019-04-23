import { XmlFile } from "../../base/xmlFile";
import { XmlRootNode } from "../../base/xmlRootNode";
import { XmlNode } from "../../base/xmlNode";
import { XmlAttribute } from "../../base/xmlAttribute";
import { RowNode } from "./rowNode";

/**
 * Define a sheet xml file
 */
export class SheetFile extends XmlFile {
  /**
   * Initialize a new sheet in workbook
   * @param {number} index - Index of sheet
   * @param {string} name - Name of sheet
   */
  constructor(index?: number, name?: string) {
    index = index || 1;
    super(
      new XmlRootNode(
        "worksheet",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      ),
      "sheet" + index + ".xml",
      "workbook/sheets"
    );

    this.rId = "rId" + index.toString(10);
    this.id = index;
    this.name = name || "Sheet" + index.toString(10);

    this.initializeSheetProperties();
    this.sheetData = new XmlNode("sheetData");
    this.rootNode.child(this.sheetData);
  }

  /**
   * The relation Identity
   */
  public rId: string;

  /**
   * The sheet name
   */
  public name: string;

  /**
   * The Tab selected attribute
   */
  public tabSelected: XmlAttribute;

  /**
   * The Selection node
   */
  public selections: XmlNode[];

  /**
   * The Pane Node
   */
  public pane: XmlNode;

  /**
   * The Identity
   */
  public id: number;

  /**
   * Sheet Data node
   */
  public sheetData: XmlNode;

  /**
   * The sheet view node
   */
  private sheetView: XmlNode;

  /**
   * Clear the selections from sheet view
   */
  public clearSelections() {
    this.selections = [];

    this.sheetView.children = [];

    this.sheetView.child(this.pane);
  }

  /**
   * Add a seleciton in sheet view
   * @param {string} activeCell - The active cell
   * @param {string} pane - The pane
   * @param {string} sqref - The sequence reference
   * @param {boolean} paneIsActive - Determine if pane is active
   */
  public addSelection(
    activeCell?: string,
    pane?: string,
    sqref?: string,
    paneIsActive?: boolean
  ) {
    let attributes: XmlAttribute[];
    if (activeCell) {
      attributes = [
        new XmlAttribute("sqref", sqref || activeCell || "A1"),
        new XmlAttribute("activeCell", activeCell || "A1"),
        new XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
      ];
    } else {
      attributes = [
        new XmlAttribute("sqref", sqref || activeCell || "A1", false),
        new XmlAttribute("activeCell", activeCell || "A1", false),
        new XmlAttribute("pane", pane || "bottomRight", paneIsActive || false)
      ];
    }
    const selection = new XmlNode("selection", attributes);
    this.selections.push(selection);
    this.sheetView.child(selection);
  }

  /**
   * Add a new column in sheet
   * @param {number} min - Col statring number
   * @param {number} max - Col ending number
   * @param {number} width - Width of each column
   * @param {boolean} bestFit - Determine whether to bestfit width wrt value
   * @param {boolean} hidden - Determine if columns are hidden
   * @returns {XmlNode} - The column node
   */
  public addCol(
    min: number,
    max: number,
    width: number,
    bestFit: boolean,
    hidden: boolean
  ): XmlNode {
    let cols = this.rootNode.child("cols");
    if (cols === null) {
      cols = new XmlNode("cols");
      for (let index = 0; index < this.rootNode.children.length; index++) {
        if (this.rootNode.children[index].name === "sheetData") {
          this.rootNode.children.splice(index, 0, cols);
          break;
        }
      }
    }

    const col = new XmlNode("col", [
      new XmlAttribute("min", min.toString(10)),
      new XmlAttribute("max", max.toString(10))
    ]);

    if (width) {
      col.attribute(new XmlAttribute("width", width.toString(10)));
      col.attribute(new XmlAttribute("customWidth", "1"));
    }

    if (bestFit) {
      col.attribute(new XmlAttribute("bestFit", "1"));
    }

    if (hidden) {
      col.attribute(new XmlAttribute("collapsed", "1"));
      col.attribute(new XmlAttribute("hidden", "1"));
    }

    cols.child(col);
    return col;
  }

  /**
   * Add a new merge cell in sheet
   * @param {string} cellRange - The cell range
   */
  public mergeCells(cellRange: string) {
    let mergeCells = this.rootNode.child("mergeCells");
    if (mergeCells === null) {
      mergeCells = new XmlNode("mergeCells", [new XmlAttribute("count", "0")]);
      for (let index = 0; index < this.rootNode.children.length; index++) {
        if (this.rootNode.children[index].name === "sheetData") {
          this.rootNode.children.splice(index + 1, 0, mergeCells);
          break;
        }
      }
    }

    const mergeCell = new XmlNode("mergeCell", [
      new XmlAttribute("ref", cellRange)
    ]);
    mergeCells.child(mergeCell);
    mergeCells.attribute("count").value = mergeCells.children.length.toString(
      10
    );
  }

  /**
   * Get or create and get a new row in sheet
   * @param {number} index - The RowNode index
   * @returns {RowNode}
   */
  public getRow(index: number): RowNode {
    let sheetRow: RowNode;

    this.sheetData.children.forEach(r => {
      const rno = (r as RowNode).Index;
      if (rno > index) {
        return;
      } else if (rno === index) {
        sheetRow = r as RowNode;
        return;
      }
    });

    return sheetRow;
  }

  /**
   * Get or create and get a new row in sheet
   * @param {number} index - The RowNode index
   * @returns {RowNode}
   */
  public addRow(index: number): RowNode {
    let position: number = 0,
      sheetRow: RowNode;

    this.sheetData.children.forEach(r => {
      const rno = (r as RowNode).Index;
      if (rno > index) {
        return;
      } else if (rno === index) {
        sheetRow = r as RowNode;
        return;
      }
      position++;
    });

    if (!sheetRow) {
      sheetRow = new RowNode(index);
      this.sheetData.children.splice(position, 0, sheetRow);
    }

    return sheetRow;
  }

  /**
   * Initialize sheet default properties
   */
  private initializeSheetProperties() {
    let sheetViews = new XmlNode("sheetViews");
    this.sheetView = new XmlNode("sheetView");
    this.tabSelected = new XmlAttribute("");

    this.sheetView.attribute(this.tabSelected);
    this.sheetView.attribute(new XmlAttribute("workbookViewId", "0"));
    sheetViews.child(this.sheetView);

    this.pane = new XmlNode("pane", [
      new XmlAttribute("state", "frozen"),
      new XmlAttribute("activePane", "topRight"),
      new XmlAttribute("topLeftCell", "A1"),
      new XmlAttribute("ySplit", "1"),
      new XmlAttribute("xSplit", "1")
    ]);
    this.pane.name = "";
    this.sheetView.child(this.pane);

    this.selections = [
      new XmlNode("selection", [
        new XmlAttribute("sqref", "A1"),
        new XmlAttribute("activeCell", "A1"),
        new XmlAttribute("pane", "bottomRight", false)
      ])
    ];
    this.sheetView.child(this.selections[0]);

    this.rootNode.child(sheetViews);
  }
}

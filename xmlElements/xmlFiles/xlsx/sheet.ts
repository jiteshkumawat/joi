import { XmlFile } from "../../base/xmlFile";
import { XmlRootNode } from "../../base/xmlRootNode";
import { XmlNode } from "../../base/xmlNode";
import { XmlAttribute } from "../../base/xmlAttribute";

/**
 * Define a sheet xml file
 */
export class Sheet extends XmlFile {
  /**
   * Initialize a new sheet in workbook
   * @param index - Index of sheet
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

    this.RId = "rId" + index.toString(10);
    this.Id = index;
    this.Name = name || "Sheet" + index.toString(10);

    this.initializeSheetProperties();
    this.sheetData = new XmlNode("sheetData");
    this.RootNode.addChild(this.sheetData);
  }

  /**
   * The relation Identity
   */
  public RId: string;

  /**
   * The sheet name
   */
  public Name: string;

  /**
   * The Tab selected attribute
   */
  public TabSelected: XmlAttribute;

  /**
   * The Selection node
   */
  public Selections: XmlNode[];

  /**
   * The Pane Node
   */
  public Pane: XmlNode;

  /**
   * The Identity
   */
  public Id: number;

  /**
   * Sheet Data node
   */
  private sheetData: XmlNode;

  /**
   * The sheet view node
   */
  private sheetView: XmlNode;

  /**
   * Clear the selections from sheet view
   */
  public clearSelections() {
    this.Selections = [];

    this.sheetView.Children = [];

    this.sheetView.addChild(this.Pane);
  }

  /**
   * Add a seleciton in sheet view
   * @param activeCell - The active cell
   * @param pane - The pane
   * @param sqref - The sequence reference
   * @param paneIsActive - Determine if pane is active
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
    this.Selections.push(selection);
    this.sheetView.addChild(selection);
  }

  /**
   * Initialize sheet default properties
   */
  private initializeSheetProperties() {
    let sheetViews = new XmlNode("sheetViews");
    this.sheetView = new XmlNode("sheetView");
    this.TabSelected = new XmlAttribute("");

    this.sheetView.attribute(this.TabSelected);
    this.sheetView.attribute(new XmlAttribute("workbookViewId", "0"));
    sheetViews.addChild(this.sheetView);

    this.Pane = new XmlNode("pane", [
      new XmlAttribute("state", "frozen"),
      new XmlAttribute("activePane", "topRight"),
      new XmlAttribute("topLeftCell", "A1"),
      new XmlAttribute("ySplit", "1"),
      new XmlAttribute("xSplit", "1")
    ]);
    this.Pane.Name = "";
    this.sheetView.addChild(this.Pane);

    this.Selections = [
      new XmlNode("selection", [
        new XmlAttribute("sqref", "A1"),
        new XmlAttribute("activeCell", "A1"),
        new XmlAttribute("pane", "bottomRight", false)
      ])
    ];
    this.sheetView.addChild(this.Selections[0]);

    this.RootNode.addChild(sheetViews);
  }
}

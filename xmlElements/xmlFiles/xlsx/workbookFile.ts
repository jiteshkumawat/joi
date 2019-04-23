import { XmlFile } from "../../base/xmlFile";
import { XmlRootNode } from "../../base/xmlRootNode";
import { XmlNode } from "../../base/xmlNode";
import { SheetFile } from "./sheetFile";
import { XmlAttribute } from "../../base/xmlAttribute";

/**
 * Define new workbook file
 */
export class WorkbookFile extends XmlFile {
  /**
   * Initialize new workbook file
   */
  constructor() {
    super(
      new XmlRootNode(
        "workbook",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
      ),
      "workbook.xml",
      "workbook"
    );

    this.rootNode.addNamespace(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "r"
    );

    this.initializeView();

    this.sheets = new XmlNode("sheets");
    this.rootNode.child(this.sheets);
    this.totalSheet = 0;
  }

  /**
   * The Worksheets node
   */
  private sheets: XmlNode;

  /**
   * The Workbook Properties
   */
  private bookViews: XmlNode;

  /**
   * Total number of sheets
   */
  public totalSheet: number;

  /**
   * Index of active tab
   */
  public activeTab: XmlAttribute;

  /**
   * Add a new sheet
   * @param {SheetFile} sheet - The sheet to add
   */
  public addSheet(sheet: SheetFile) {
    this.sheets.child(
      new XmlNode("sheet", [
        new XmlAttribute("r:id", sheet.rId),
        new XmlAttribute("sheetId", sheet.id.toString(10)),
        new XmlAttribute("name", sheet.name)
      ])
    );
    this.totalSheet++;
  }

  /**
   * Creates a new sheet in workbook and returns
   * @param {string} sheetName - The sheet name
   * @returns {SheetFile} - The sheet instance
   */
  public createSheet(sheetName?: string): SheetFile {
    let sheet = new SheetFile(this.sheets.children.length, sheetName);
    this.addSheet(sheet);
    return sheet;
  }

  /**
   * Initilize workbook view
   */
  private initializeView() {
    this.bookViews = new XmlNode("bookViews");
    this.activeTab = new XmlAttribute("activeTab", "0");

    this.bookViews.child(new XmlNode("workbookView", [this.activeTab]));

    this.rootNode.child(this.bookViews);
  }
}

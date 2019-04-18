import { XmlFile } from "../../base/xmlFile";
import { XmlRootNode } from "../../base/xmlRootNode";
import { XmlNode } from "../../base/xmlNode";
import { Sheet } from "./sheet";
import { XmlAttribute } from "../../base/xmlAttribute";

/**
 * Define new workbook file
 */
export class Workbook extends XmlFile {
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

    this.RootNode.addNamespace(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "r"
    );

    this.initializeView();

    this.sheets = new XmlNode("sheets");
    this.RootNode.child(this.sheets);
    this.TotalSheet = 0;
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
  public TotalSheet: number;

  /**
   * Index of active tab
   */
  public ActiveTab: XmlAttribute;

  /**
   * Add a new sheet
   * @param sheet - The sheet to add
   */
  public addSheet(sheet: Sheet) {
    this.sheets.child(
      new XmlNode("sheet", [
        new XmlAttribute("r:id", sheet.RId),
        new XmlAttribute("sheetId", sheet.Id.toString(10)),
        new XmlAttribute("name", sheet.Name)
      ])
    );
    this.TotalSheet++;
  }

  /**
   * Creates a new sheet in workbook and returns
   */
  public createSheet(sheetName?: string) {
    let sheet = new Sheet(this.sheets.Children.length, sheetName);
    this.addSheet(sheet);
    return sheet;
  }

  /**
   * Initilize workbook view
   */
  private initializeView() {
    this.bookViews = new XmlNode("bookViews");
    this.ActiveTab = new XmlAttribute("activeTab", "0");

    this.bookViews.child(new XmlNode("workbookView", [this.ActiveTab]));

    this.RootNode.child(this.bookViews);
  }
}

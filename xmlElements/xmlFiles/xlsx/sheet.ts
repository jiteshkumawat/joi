import { XmlFile } from "../../base/xmlFile";
import { XmlRootNode } from "../../base/xmlRootNode";
import { XmlNode } from "../../base/xmlNode";

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
   * The Identity
   */
  public Id: number;

  /**
   * Sheet Data node
   */
  private sheetData: XmlNode;
}

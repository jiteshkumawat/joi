import { XmlNode } from "../../base/xmlNode";
import { XmlAttribute } from "../../base/xmlAttribute";

/**
 * The Sheet Data node
 */
export class RowNode extends XmlNode {
  constructor(public Index: number) {
    super("row", [new XmlAttribute("r", Index.toString(10))]);
  }

  public getCell(r: string): XmlNode {
    return this.children.find(
      cell => cell.name === "c" && cell.attribute("r").value === r
    );
  }

  public addCell(r: string): XmlNode {
    let cell = this.getCell(r);
    if (!cell) {
      cell = new XmlNode("c", [
        new XmlAttribute("r", r),
        new XmlAttribute("t", "inlineStr")
      ]);
      this.child(cell);
    }

    return cell;
  }
}

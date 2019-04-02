import { XmlFile } from "../base/xmlFile";
import { XmlAttribute } from "../base/xmlAttribute";
import { XmlRootNode } from "../base/xmlRootNode";
import { XmlNode } from "../base/xmlNode";

/**
 * Define a new relationship file
 */
export class Relationships extends XmlFile {
  /**
   * Creates new instance of relationship file
   * @param fileName - The file name
   * @param filePath - The file path
   */
  constructor(fileName?: string, filePath?: string) {
    super(
      new XmlRootNode(
        "Relationships",
        "http://schemas.openxmlformats.org/package/2006/relationships"
      ),
      fileName || ".rels",
      filePath || "_rels"
    );

    this.Id = 1;
  }

  /**
   * The identity incrementer
   */
  private Id: number;

  /**
   * Add new relationship in root node
   * @param target - The target string
   * @param type - The type string
   * @param id - The identity number
   */
  public addRelationship(target: string, type: string, id?: number) {
    if (!id) {
      id = this.Id++;
    }

    const node = new XmlNode("Relationship", [
      new XmlAttribute("Target", target),
      new XmlAttribute("Type", type),
      new XmlAttribute("Id", "rId" + id.toString(10))
    ]);
    this.RootNode.addChild(node);
    return "rId" + id;
  }
}

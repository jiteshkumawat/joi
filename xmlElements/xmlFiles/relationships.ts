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
   * @param {string} fileName - The file name
   * @param {string} filePath - The file path
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

    this.id = 1;
  }

  /**
   * The identity incrementer
   */
  private id: number;

  /**
   * Add new relationship in root node
   * @param {string} target - The target string
   * @param {string} type - The type string
   * @param {number} id - The identity number
   * @returns {string} - The relationship identifier
   */
  public addRelationship(target: string, type: string, id?: number): string {
    if (!id) {
      id = this.id++;
    }

    const node = new XmlNode("Relationship", [
      new XmlAttribute("Target", target),
      new XmlAttribute("Type", type),
      new XmlAttribute("Id", "rId" + id.toString(10))
    ]);
    this.rootNode.child(node);
    return "rId" + id;
  }
}

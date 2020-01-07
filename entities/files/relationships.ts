import { Xml } from "../base/xml";
import { Attribute } from "../base/attribute";
import { Node } from "../base/node";
import { XmlParser } from "../../util/parser";

/**
 * Relationship file
 */
export class Relationships extends Xml {
  /**
   * Creates new instance of relationship file
   * @param {string} fileName - The file name
   * @param {string} filePath - The file path
   */
  constructor(fileName?: string, filePath?: string) {
    super(
      new Node(
        "Relationships",
        [],
        true,
        "",
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
  public addRelationship(
    target: string,
    type: string,
    id?: number | string
  ): string {
    if (typeof id === "string") {
      id = parseInt(id.match(/\d+/)[0], 10);
    }

    if (!id) {
      id = this.id++;
    } else {
      this.id = id + 1;
    }

    const node = new Node(
      "Relationship",
      [
        new Attribute(
          "Id",
          "rId" + id.toString(10),
          true,
          this.defaultNamespace
        ),
        new Attribute("Type", type, true, this.defaultNamespace),
        new Attribute("Target", target, true, this.defaultNamespace)
      ],
      true,
      this.defaultNamespace
    );
    this.rootNode.child(node);
    return "rId" + id;
  }

  /**
   * Update Id
   */
  public updateId() {
    let maxId = 1;
    this.rootNode.children.forEach(node => {
      let id = parseInt(node.attribute("Id").value.replace("rId", ""), 10);
      if (id > maxId) {
        maxId = id;
      }
    });
    this.id = maxId + 1;
  }

  /**
   * Get Relationship attribute
   * @param relationship - Relationship string
   */
  public getByRelationship(relationship: string): Node {
    return this.rootNode.children.find(rel => {
      if (rel.namespace === this.defaultNamespace) {
        let attr = rel.attribute("Type", this.defaultNamespace);
        return attr.value === relationship;
      }
    });
  }

  /**
   * Get Relationship by Id
   * @param rId - Relationship Id
   */
  public getById(rId: string): Node {
    return this.rootNode.children.find(rel => {
      let attr = rel.attribute("Id", this.defaultNamespace);
      return attr.value === rId;
    });
  }

  /**
   * Load a file
   * @param zip - JS Zip file
   * @returns {Relationships}: - The Relationship object
   */
  public static async load(
    content: string,
    fileName: string,
    filePath?: string
  ): Promise<Relationships> {
    let relationships = new Relationships();
    await XmlParser.parse(
      content,
      relationships,
      "http://schemas.openxmlformats.org/package/2006/relationships"
    );
    relationships.filePath = filePath || "";
    relationships.fileName = fileName;
    relationships.updateId();
    return relationships;
  }
}

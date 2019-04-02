import { XmlAttribute } from "./xmlAttribute";

/**
 * Define a new node of an xml file
 */
export class XmlNode {
  /**
   * Creates new instance of XML Node
   * @param name - The Node Name
   * @param attributes - The Attribute Collection
   */
  constructor(name: string, attributes?: XmlAttribute[]) {
    this.Name = name;
    this.Attributes = attributes || [];
    this.ChildNodes = [];
  }
  /**
   * The Node name
   */
  public Name: string;

  /**
   * The Attributes collection
   */
  public Attributes: XmlAttribute[];

  /**
   * The Child nodes collection
   */
  public ChildNodes: XmlNode[];

  /**
   * Add new attribute to node
   * @param attribute - The new attribute to add
   * @returns - The newly added attribute
   */
  public addAttribute(attribute: XmlAttribute) {
    this.Attributes.push(attribute);
    return attribute;
  }

  /**
   * Add new child to node
   * @param node - The new child node to add
   * @returns - The newly added node
   */
  public addChild(node: XmlNode) {
    this.ChildNodes.push(node);
    return node;
  }

  /**
   * Get string representation of a node
   * @returns - String representation (<Node Attributes/>)
   */
  public toString(): string {
    let attributes = "",
      childString = "";
    this.Attributes.forEach(attribute => {
      attributes += " " + attribute.toString();
    });

    this.ChildNodes.forEach(childNode => {
      childString += childNode.toString();
    });

    if (!childString) {
      return "<" + this.Name + attributes + "/>";
    } else {
      return (
        "<" +
        this.Name +
        attributes +
        ">" +
        childString +
        "</" +
        this.Name +
        ">"
      );
    }
  }
}

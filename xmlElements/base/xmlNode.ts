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
    this.Children = [];
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
  public Children: XmlNode[];

  /**
   * Add new child to node
   * @param node - The new child node to add
   * @returns - The newly added node
   */
  public addChild(node: XmlNode) {
    this.Children.push(node);
    return node;
  }

  /**
   * Get or adds Attributes of node
   * @param attribute - Attribute name or instance. Pass string value to search attribute, and XmlAttribute to add / update.
   * @returns - The Xml Attribute
   */
  public attribute(attribute: string | XmlAttribute): XmlAttribute {
    if (typeof attribute === "string") {
      return this.getAttribute(attribute);
    } else {
      return this.addAttribute(attribute);
    }
  }

  /**
   * Get string representation of a node
   * @returns - String representation (<Node Attributes/>)
   */
  public toString(): string {
    if (!this.Name) {
      return "";
    }

    let attributes = "",
      childString = "";
    this.Attributes.forEach(attribute => {
      attributes = " " + attribute.toString() + attributes;
    });
    this.Children.forEach(childNode => {
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

  /**
   * Add new attribute to node
   * @param attribute - The new attribute to add
   * @returns - The newly added attribute
   */
  private addAttribute(attribute: XmlAttribute) {
    let savedAttr = this.getAttribute(attribute.Name);
    if (savedAttr) {
      savedAttr.Value = attribute.Value;
      return savedAttr;
    }
    this.Attributes.push(attribute);
    return attribute;
  }

  /**
   * Get Attribute of node
   * @param name - Name of Attribute
   * @returns - The Xml Attribute
   */
  private getAttribute(name: string): XmlAttribute {
    let attribute: XmlAttribute = null;
    this.Attributes.forEach(a => {
      if (a.Name === name) {
        attribute = a;
        return a;
      }
    });

    return attribute;
  }
}

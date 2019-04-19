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
   * Add or get child of node
   * @param node - The new child node to add
   * @returns - The newly added node
   */
  public child(node: string | XmlNode) {
    if (typeof node === "string") {
      return this.getChild(node);
    } else {
      return this.addChild(node);
    }
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

  /**
   * Add new child to node
   * @param node - The new child node to add
   * @returns - The newly added node
   */
  private addChild(node: XmlNode) {
    this.Children.push(node);
    return node;
  }

  /**
   * Search for a child node
   * @param name - The child node name
   * @returns - The child node
   */
  private getChild(name: string): XmlNode {
    let child: XmlNode = null;
    this.Children.forEach(a => {
      if (a.Name === name) {
        child = a;
        return a;
      }
    });

    return child;
  }
}

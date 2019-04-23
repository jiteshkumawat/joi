import { XmlAttribute } from "./xmlAttribute";

/**
 * Define a new node of an xml file
 */
export class XmlNode {
  /**
   * Creates new instance of XML Node
   * @param {string} name - The Node Name
   * @param {XmlAttribute[]} attributes - The Attribute Collection
   */
  constructor(public name: string, public attributes: XmlAttribute[] = []) {
    this.children = [];
  }

  /**
   * The Child nodes collection
   */
  public children: XmlNode[];

  public value: string;

  /**
   * Add or get child of node
   * @param {string | XmlNode} node - The new child node to add
   * @returns {XmlNode} - The newly added node
   */
  public child(node: string | XmlNode): XmlNode {
    if (typeof node === "string") {
      return this.getChild(node);
    } else {
      return this.addChild(node);
    }
  }

  /**
   * Get or adds Attributes of node
   * @param {string | XmlAttribute} attribute - Attribute name or instance. Pass string value to search attribute, and XmlAttribute to add / update.
   * @returns {XmlAttribute} - The Xml Attribute
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
   * @returns {string} - String representation (<Node Attributes/>)
   */
  public toString(): string {
    if (!this.name) {
      return "";
    }

    let attributes = "",
      childString = "";
    this.attributes.forEach(attribute => {
      attributes = " " + attribute.toString() + attributes;
    });
    this.children.forEach(childNode => {
      childString += childNode.toString();
    });

    if (!childString) {
      if (!this.value) {
        return "<" + this.name + attributes + "/>";
      } else {
        return (
          "<" +
          this.name +
          attributes +
          ">" +
          this.value +
          "</" +
          this.name +
          ">"
        );
      }
    } else {
      return (
        "<" +
        this.name +
        attributes +
        ">" +
        childString +
        "</" +
        this.name +
        ">"
      );
    }
  }

  /**
   * Add new attribute to node
   * @param {XmlAttribute} attribute - The new attribute to add
   * @returns {XmlAttribute} - The newly added attribute
   */
  private addAttribute(attribute: XmlAttribute): XmlAttribute {
    let savedAttr = this.getAttribute(attribute.name);
    if (savedAttr) {
      savedAttr.value = attribute.value;
      return savedAttr;
    }
    this.attributes.push(attribute);
    return attribute;
  }

  /**
   * Get Attribute of node
   * @param {string} name - Name of Attribute
   * @returns {XmlAttribute} - The Xml Attribute
   */
  private getAttribute(name: string): XmlAttribute {
    let attribute: XmlAttribute = null;
    this.attributes.forEach(a => {
      if (a.name === name) {
        attribute = a;
        return a;
      }
    });

    return attribute;
  }

  /**
   * Add new child to node
   * @param {XmlNode} node - The new child node to add
   * @returns {XmlNode} - The newly added node
   */
  private addChild(node: XmlNode): XmlNode {
    this.children.push(node);
    return node;
  }

  /**
   * Search for a child node
   * @param {string} name - The child node name
   * @returns {XmlNode} - The child node
   */
  private getChild(name: string): XmlNode {
    let child: XmlNode = null;
    this.children.forEach(a => {
      if (a.name === name) {
        child = a;
        return a;
      }
    });

    return child;
  }
}

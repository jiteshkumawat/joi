import { XmlNode } from "./xmlNode";
import { XmlAttribute } from "./xmlAttribute";

/**
 * Define a new root node of an xml file
 */
export class XmlRootNode extends XmlNode {
  /**
   * Creates new instance of XML Root Node
   * @param {string} name - The Node Name
   * @param {string} namespace - The Namespace of root node
   * @param {XmlAttribute[]} attributes - The Attribute Collection
   */
  constructor(name: string, namespace?: string, attributes?: XmlAttribute[]) {
    super(name, attributes);
    this.namespaces = [];
    if (namespace) {
      this.namespaces.push(new XmlAttribute("xmlns", namespace));
    }
  }

  /**
   * The Namespace of root node
   */
  public namespaces: XmlAttribute[];

  /**
   * Add a new namespace in root node
   * @param {string} namespace - The Namespace string
   * @param {string} prefix - The prefix string
   * @returns {XmlAttribute} - The namespace attribute
   */
  public addNamespace(namespace: string, prefix?: string) {
    prefix = prefix ? ":" + prefix : "";
    let namespaceAttr = new XmlAttribute("xmlns" + prefix, namespace);
    this.namespaces.push(namespaceAttr);
    return namespaceAttr;
  }
  /**
   * Get string representation of a root node
   * @returns {string} - String representation (<Node Namespace Attributes/>)
   */
  public toString() {
    let attributes = "",
      childString = "",
      namespace = "";

    this.namespaces.forEach(ns => {
      namespace += " " + ns.toString();
    });

    this.attributes.forEach(attribute => {
      attributes += " " + attribute.toString();
    });

    this.children.forEach(childNode => {
      childString += childNode.toString();
    });

    if (!childString) {
      return "<" + this.name + namespace + attributes + "/>";
    } else {
      return (
        "<" +
        this.name +
        namespace +
        attributes +
        ">" +
        childString +
        "</" +
        this.name +
        ">"
      );
    }
  }
}

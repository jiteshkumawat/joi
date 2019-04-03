import { XmlNode } from "./xmlNode";
import { XmlAttribute } from "./xmlAttribute";

/**
 * Define a new root node of an xml file
 */
export class XmlRootNode extends XmlNode {
  /**
   * Creates new instance of XML Root Node
   * @param name - The Node Name
   * @param namespace - The Namespace of root node
   * @param attributes - The Attribute Collection
   */
  constructor(name: string, namespace?: string, attributes?: XmlAttribute[]) {
    super(name, attributes);
    this.Namespaces = [];
    if (namespace) {
      this.Namespaces.push(new XmlAttribute("xmlns", namespace));
    }
  }

  /**
   * The Namespace of root node
   */
  public Namespaces: XmlAttribute[];

  /**
   * Add a new namespace in root node
   * @param namespace - The Namespace string
   * @param prefix - The prefix string
   */
  public addNamespace(namespace: string, prefix?: string) {
    prefix = prefix ? ":" + prefix : "";
    let namespaceAttr = new XmlAttribute("xmlns" + prefix, namespace);
    this.Namespaces.push(namespaceAttr);
    return namespaceAttr;
  }
  /**
   * Get string representation of a root node
   * @returns - String representation (<Node Namespace Attributes/>)
   */
  public toString() {
    let attributes = "",
      childString = "",
      namespace = "";

    this.Namespaces.forEach(ns => {
      namespace += " " + ns.toString();
    });

    this.Attributes.forEach(attribute => {
      attributes += " " + attribute.toString();
    });

    this.Children.forEach(childNode => {
      childString += childNode.toString();
    });

    if (!childString) {
      return "<" + this.Name + namespace + attributes + "/>";
    } else {
      return (
        "<" +
        this.Name +
        namespace +
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

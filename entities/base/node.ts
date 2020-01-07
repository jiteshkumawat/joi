import { Attribute } from "./attribute";

/**
 * Xml Node
 */
export class Node {
  /**
   * Creates new instance of XML Node
   * @param {string} name - The node name
   * @param {Attribute[]} attributes - The attribute collection
   */
  constructor(
    public name: string,
    public attributes: Attribute[] = [],
    public isActive: boolean = true,
    public namespace: string = "",
    public xmlns: string = ""
  ) {
    this.children = [];
    this.namespaces = {};
    if (xmlns) {
      this.namespaces[xmlns] = "";
      let namespaceAttr = new Attribute("xmlns", xmlns);
      this.attributes.push(namespaceAttr);
    }
  }

  /**
   * The Namespace of root node
   */
  public namespaces: any;

  /**
   * The child nodes collection
   */
  public children: Node[];

  /**
   * The value of xml node
   */
  public value: string;

  /**
   * Adds a new namespace in root node
   * @param {string} namespace - The namespace string
   * @param {string} prefix - The prefix string
   * @returns {Attribute} - The namespace attribute
   */
  public addNamespace(namespace: string, prefix?: string): Attribute {
    this.namespaces[namespace] = prefix;
    prefix = prefix ? ":" + prefix : "";
    let namespaceAttr = new Attribute("xmlns" + prefix, namespace);
    this.addAttribute(namespaceAttr);
    return namespaceAttr;
  }

  /**
   * Gets or adds a child of node
   * @param {Node | string} node - The node or node name to get or add. Use string value to search child and node value to append.
   * @param {string} namespace - The namespace of node
   * @returns {Node} - The child node
   */
  public child(node: string | Node, namespace?: string): Node {
    if (typeof node === "string") {
      return this.getChild(namespace ? namespace + ":" + node : node);
    } else {
      return this.addChild(node);
    }
  }

  /**
   * Gets or adds Attributes of node
   * @param {Attribute | string} attribute - The attribute or attribute name to get or add. Use string value to search attribute and attribute value to append.
   * @param {string} namespace - The namespace
   * @returns {Attribute} - The xml attribute
   */
  public attribute(
    attribute: string | Attribute,
    namespace?: string
  ): Attribute {
    if (typeof attribute === "string") {
      if (namespace) {
        attribute = namespace + ":" + attribute;
      }
      return this.getAttribute(attribute);
    } else {
      return this.addAttribute(attribute);
    }
  }

  /**
   * Get saved attribute in a node
   * @param attribute - Attribute string or entity
   */
  public getAttribute(attribute: string | Attribute): Attribute {
    let savedAttribute: Attribute = null,
      attrName = typeof attribute === "string" ? attribute : attribute.name,
      attrNamespace = typeof attribute === "string" ? "" : attribute.namespace;
    if (
      typeof attribute === "string" &&
      attribute.indexOf(":") > 0 &&
      !attribute.startsWith("xmlns:")
    ) {
      let attrValues = attribute.split(":");
      attrName = attrValues[1];
      attrNamespace = attrValues[0];
    }

    this.attributes.forEach(a => {
      if (
        a.name.toLowerCase() === attrName.toLowerCase() &&
        a.namespace === attrNamespace
      ) {
        savedAttribute = a;
        return a;
      }
    });

    return savedAttribute;
  }

  /**
   * Gets string for node
   * @returns {string} - Node string (<Node Attributes><Child/></Node>)
   */
  public toString(): string {
    if (!this.name || !this.isActive) {
      return "";
    }

    const nodeName = this.namespace
      ? this.namespace + ":" + this.name
      : this.name;

    let attributes = "",
      childString = "",
      xmlns = "";
    this.attributes.forEach(attribute => {
      if (attribute.name.startsWith("xmlns")) {
        xmlns = xmlns + " " + attribute.toString();
      } else {
        attributes = attributes + " " + attribute.toString();
      }
    });
    this.children.forEach(childNode => {
      childString += childNode.toString();
    });

    if (!childString) {
      if (!this.value) {
        return "<" + nodeName + xmlns + attributes + "/>";
      } else {
        return (
          "<" +
          nodeName +
          xmlns +
          attributes +
          ">" +
          this.value +
          "</" +
          nodeName +
          ">"
        );
      }
    } else {
      return (
        "<" +
        nodeName +
        xmlns +
        attributes +
        ">" +
        childString +
        "</" +
        nodeName +
        ">"
      );
    }
  }

  private addAttribute(attribute: Attribute): Attribute {
    let savedAttr = this.getAttribute(attribute);
    if (savedAttr) {
      savedAttr.value = attribute.value;
      return savedAttr;
    }
    this.attributes.push(attribute);
    return attribute;
  }

  private addChild(node: Node): Node {
    this.children.push(node);
    return node;
  }

  private getChild(name: string): Node {
    let child: Node = null,
      nodeName = name,
      nodeNamespace = "";
    if (name.indexOf(":") > 0) {
      const nodeNameAttr = name.split(":");
      nodeName = nodeNameAttr[1];
      nodeNamespace = nodeNameAttr[0];
    }
    this.children.forEach(a => {
      if (a.name === nodeName && a.namespace === nodeNamespace) {
        child = a;
        return a;
      }
    });

    return child;
  }
}

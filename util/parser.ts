import { Xml } from "../entities/base/xml";
import { Attribute } from "../entities/base/attribute";
import { Node } from "../entities/base/node";

/**
 * Xml Parser
 */
export class XmlParser {
  /**
   * Parse xml string to Xml object
   * @param content - The xml content
   * @param file - The Xml file
   * @param defaultNamespace - Default name space
   * @returns {Promise<Xml>} - Promise to resolve Xml file
   */
  public static parse(
    content: string,
    file: Xml,
    defaultNamespace?: string
  ): Promise<Xml> {
    if (typeof window !== "undefined") {
      return this.parseForBrowser(content, file, defaultNamespace);
    } else {
      return this.parseForNodeJS(content, file, defaultNamespace);
    }
  }

  private static parseForBrowser(
    content: string,
    file: Xml,
    defaultNamespace?: string
  ): Promise<Xml> {
    let parser = new window.DOMParser();
    let parsedXml = parser.parseFromString(content, "text/xml");

    let node = parsedXml.children[0];
    let rootNode = this.createNodeForBrowser(node, false);
    file.rootNode = rootNode;
    file.defaultNamespace = file.rootNode.namespaces[defaultNamespace];
    return Promise.resolve(file);
  }

  private static createNodeForBrowser(node: Element, isChild: boolean): Node {
    let xmlNode,
      nodeNameParams,
      nodeName = node.tagName,
      nodeNamespace = "";
    if (node.tagName.indexOf(":") > 0) {
      nodeNameParams = node.tagName.split(":");
      nodeName = nodeNameParams[1];
      nodeNamespace = nodeNameParams[0];
    }

    xmlNode = new Node(nodeName, [], true, nodeNamespace);
    this.addNameSpaceForBrowser(node, xmlNode);

    for (let i = 0; i < node.attributes.length; i++) {
      let attr = node.attributes[i],
        attrName = attr.name,
        attrNamespace = "";
      if (attr.name.indexOf(":") > 0) {
        let attrParams = attr.name.split(":");
        attrName = attrParams[1];
        attrNamespace = attrParams[0];
      }
      xmlNode.attribute(
        new Attribute(attrName, attr.value, true, attrNamespace)
      );
    }

    for (let j = 0; j < node.children.length; j++) {
      let child = this.createNodeForBrowser(node.children[j], true);
      xmlNode.child(child);
    }

    if (node.textContent) {
      xmlNode.value = node.textContent;
    }

    return xmlNode;
  }

  private static addNameSpaceForBrowser(node: Element, parsedNode: Node) {
    parsedNode.namespaces = {};
    for (let i = 0; i < node.attributes.length; i++) {
      let attr = node.attributes[i];
      if (attr.name.startsWith("xmlns")) {
        parsedNode.namespaces[attr.value] = attr.name.split(":")[1] || "";
      }
    }
  }

  private static parseForNodeJS(
    content: string,
    file: Xml,
    defaultNamespace?: string
  ): Promise<Xml> {
    var xml2js = require("xml2js"),
      self = this;
    return xml2js
      .parseStringPromise(content, {
        preserveChildrenOrder: true,
        explicitArray: true,
        explicitChildren: true
      })
      .then(function(parsedXml: any) {
        let rootNode: Node;
        for (let node in parsedXml) {
          rootNode = self.createNodeForNodeJS(node, parsedXml, false);
          file.rootNode = rootNode;
          file.defaultNamespace = file.rootNode.namespaces[defaultNamespace];
        }
        return file;
      });
  }

  private static createNodeForNodeJS(
    nodeName: string,
    node: any,
    isChild: boolean
  ): Node {
    let xmlNode: any;
    let nodeNameParams,
      _nodeName = nodeName,
      nodeNamespace = "";
    if (nodeName.indexOf(":") > 0) {
      nodeNameParams = nodeName.split(":");
      _nodeName = nodeNameParams[1];
      nodeNamespace = nodeNameParams[0];
    }

    xmlNode = new Node(_nodeName, [], true, nodeNamespace);
    this.addNameSpaceForNodeJS(nodeName, node, xmlNode);

    if (node[nodeName] && node[nodeName].$) {
      for (let attr in node[nodeName].$) {
        if (!attr.startsWith("xmlns")) {
          let attrName = attr,
            attrNamespace = "";
          if (attr.indexOf(":") > 0) {
            let attrParams = attr.split(":");
            attrName = attrParams[1];
            attrNamespace = attrParams[0];
          }
          xmlNode.attribute(
            new Attribute(attrName, node[nodeName].$[attr], true, attrNamespace)
          );
        }
      }
    }

    if (node[nodeName] && node[nodeName]._) {
      xmlNode.value = node[nodeName]._;
    } else {
      let self = this;
      if (node[nodeName] && node[nodeName]["$$"]) {
        node[nodeName]["$$"].forEach((child: any) => {
          let childName = child["#name"];
          let cNode: any = {};
          cNode[childName] = child;
          let childNode = self.createNodeForNodeJS(childName, cNode, true);
          xmlNode.child(childNode);
        });
      }
    }

    return xmlNode;
  }

  private static addNameSpaceForNodeJS(
    nodeName: string,
    node: any,
    rootNode: Node
  ) {
    rootNode.namespaces = {};
    if (node[nodeName] && node[nodeName].$) {
      for (let attr in node[nodeName].$) {
        if (attr.startsWith("xmlns")) {
          rootNode.namespaces[node[nodeName].$[attr]] =
            attr.split(":")[1] || "";
        }
      }
    }
  }
}

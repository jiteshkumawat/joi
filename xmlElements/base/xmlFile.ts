import { XmlDocumentation } from "./documentationNode";
import { XmlRootNode } from "./xmlRootNode";
import { XmlNode } from "./xmlNode";

/**
 * Define a new xml file
 */
export class XmlFile {
  /**
   * Creates new instance of xml file
   * @param {XmlRootNode} rootNode - The root node of xml
   * @param {string} fileName - The file name of xml
   * @param {string} filePath - The file path of xml
   */
  constructor(
    public rootNode: XmlRootNode = null,
    public fileName: string = "",
    public filePath: string = ""
  ) {
    this.documentation = new XmlDocumentation();
  }

  /**
   * The Documentation node
   */
  public documentation: XmlDocumentation;

  /**
   * Add a new node to root node, or defines a new root node
   * @param {XmlNode} node - The new xml node
   * @returns {XmlNode} - The newly added node
   */
  public addNode(node: XmlNode): XmlNode {
    if (this.rootNode) {
      this.rootNode.child(node);
    } else {
      this.rootNode = node as XmlRootNode;
    }
    return node;
  }

  /**
   * Get string representation of xml file
   * @returns {string} - The string content of file
   */
  public toString(): string {
    const documentation = this.documentation.toString();
    const rootNode = this.rootNode ? this.rootNode.toString() : "";
    return documentation + rootNode;
  }

  /**
   * Save the xml file
   * @param zipFile - JSZip instance to save file
   * @returns - The saved JSZip instance
   */
  public saveFile(zipFile: any) {
    const content = this.toString();
    let path: any;
    if (this.filePath) {
      path = zipFile.folder(this.filePath);
    }

    (path || zipFile).file(this.fileName, content);

    return zipFile;
  }
}

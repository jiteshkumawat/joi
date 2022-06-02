import { DocumentationNode } from "./documentationNode";
import { Node } from "./node";
/**
 * Xml file
 */
export class Xml {
  /**
   * Creates new instance of xml file
   * @param {Node} rootNode - The root node of xml
   * @param {string} fileName - The file name of xml
   * @param {string} filePath - The file path of xml
   */
  constructor(
    public rootNode: Node = null,
    public fileName: string = "",
    public filePath: string = ""
  ) {
    this.documentation = new DocumentationNode();
    this.defaultNamespace = "";
  }

  /**
   * The Documentation node
   */
  public documentation: DocumentationNode;

  /**
   * Adds a new node to root node or file
   * @param {Node} node - The new xml node
   * @returns {Node} - The newly added node
   */
  public addNode(node: Node): Node {
    if (this.rootNode) {
      this.rootNode.child(node);
    } else {
      this.rootNode = node;
    }
    return node;
  }

  /**
   * Gets string for xml file
   * @returns {string} - File content
   */
  public toString(): string {
    const documentation = this.documentation.toString();
    const rootNode = this.rootNode ? this.rootNode.toString() : "";
    return documentation + rootNode;
  }

  /**
   * Saves xml file
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

  /**
   * Default Namespace of file
   */
  public defaultNamespace: string;
}

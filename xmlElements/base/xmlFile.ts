import { XmlDocumentation } from "./documentationNode";
import { XmlRootNode } from "./xmlRootNode";

/**
 * Define a new xml file
 */
export class XmlFile {
  /**
   * Creates new instance of xml file
   * @param rootNode - The root node of xml
   * @param fileName - The file name of xml
   * @param filePath - The file path of xml
   */
  constructor(rootNode?: XmlRootNode, fileName?: string, filePath?: string) {
    this.Documentation = new XmlDocumentation();
    this.RootNode = rootNode || null;
    this.FileName = fileName || "";
    this.FilePath = filePath || "";
  }

  /**
   * The Documentation node
   */
  public Documentation: XmlDocumentation;

  /**
   * The Root node
   */
  public RootNode: XmlRootNode;

  /**
   * The File Name
   */
  public FileName: string;

  /**
   * The File Path
   */
  public FilePath: string;

  /**
   * Add a new node to root node, or defines a new root node
   * @param node - The new xml node
   * @returns - The newly added node
   */
  public addNode(node: XmlRootNode) {
    if (this.RootNode) {
      this.RootNode.child(node);
    } else {
      this.RootNode = node;
    }
    return node;
  }

  /**
   * Get string representation of xml file
   * @returns - The string content of file
   */
  public toString() {
    const documentation = this.Documentation.toString();
    const rootNode = this.RootNode ? this.RootNode.toString() : "";
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
    if (this.FilePath) {
      path = zipFile.folder(this.FilePath);
    }

    (path || zipFile).file(this.FileName, content);

    return zipFile;
  }
}

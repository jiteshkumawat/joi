import { Xml } from "./xml";
import { Node } from "./node";

export class FileBase extends Xml {
  /**
   * Sequential Array of names of child of Root Node
   */
  protected RootChildNodes: string[] = [];

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
    super(rootNode, fileName, filePath);
  }

  /**
   * Get Index of child node of Root Node
   * @param node - Child node name to get
   * @returns {number} - Possible index of child node to add
   */
  protected getRootChildIndex(node: string): number {
    if (node === this.RootChildNodes[0] || this.rootNode.children.length === 0) {
      return 0;
    }
    let i = this.RootChildNodes.indexOf(node);

    while (i > 0) {
      i--;
      let n = this.RootChildNodes[i];
      if (this.rootNode.child(n)) {
        i++;
        break;
      }
    }

    return i;
  }

  /**
   * Add child node to root node
   * @param childName - Child node name to add
   * @param namespace - Namespace of node
   * @returns {{new: boolean, node: Node}} - Details of inserted node
   */
  protected addRootChild(
    childName: string,
    namespace?: string
  ): { new: Boolean; node: Node } {
    let savedChild = this.rootNode.child(
      childName,
      namespace || this.defaultNamespace
    );

    if (!savedChild) {
      let index = this.getRootChildIndex(childName);
      savedChild = new Node(
        childName,
        [],
        true,
        namespace || this.defaultNamespace
      );
      this.rootNode.children.splice(index, 0, savedChild);
      return { new: true, node: savedChild };
    }

    return { new: false, node: savedChild };
  }
}

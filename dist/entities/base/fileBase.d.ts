import { Xml } from "./xml";
import { Node } from "./node";
export declare class FileBase extends Xml {
    rootNode: Node;
    fileName: string;
    filePath: string;
    /**
     * Sequential Array of names of child of Root Node
     */
    protected RootChildNodes: string[];
    /**
     * Creates new instance of xml file
     * @param {Node} rootNode - The root node of xml
     * @param {string} fileName - The file name of xml
     * @param {string} filePath - The file path of xml
     */
    constructor(rootNode?: Node, fileName?: string, filePath?: string);
    /**
     * Get Index of child node of Root Node
     * @param node - Child node name to get
     * @returns {number} - Possible index of child node to add
     */
    protected getRootChildIndex(node: string): number;
    /**
     * Add child node to root node
     * @param childName - Child node name to add
     * @param namespace - Namespace of node
     * @returns {{new: boolean, node: Node}} - Details of inserted node
     */
    protected addRootChild(childName: string, namespace?: string): {
        new: Boolean;
        node: Node;
    };
}

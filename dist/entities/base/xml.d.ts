import { DocumentationNode } from "./documentationNode";
import { Node } from "./node";
/**
 * Xml file
 */
export declare class Xml {
    rootNode: Node;
    fileName: string;
    filePath: string;
    /**
     * Creates new instance of xml file
     * @param {Node} rootNode - The root node of xml
     * @param {string} fileName - The file name of xml
     * @param {string} filePath - The file path of xml
     */
    constructor(rootNode?: Node, fileName?: string, filePath?: string);
    /**
     * The Documentation node
     */
    documentation: DocumentationNode;
    /**
     * Adds a new node to root node or file
     * @param {Node} node - The new xml node
     * @returns {Node} - The newly added node
     */
    addNode(node: Node): Node;
    /**
     * Gets string for xml file
     * @returns {string} - File content
     */
    toString(): string;
    /**
     * Saves xml file
     * @param zipFile - JSZip instance to save file
     * @returns - The saved JSZip instance
     */
    saveFile(zipFile: any): any;
    /**
     * Default Namespace of file
     */
    defaultNamespace: string;
}

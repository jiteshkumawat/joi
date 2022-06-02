import { Attribute } from "./attribute";
/**
 * Xml Node
 */
export declare class Node {
    name: string;
    attributes: Attribute[];
    isActive: boolean;
    namespace: string;
    /**
     * Creates new instance of XML Node
     * @param {string} name - The node name
     * @param {Attribute[]} attributes - The attribute collection
     */
    constructor(name: string, attributes?: Attribute[], isActive?: boolean, namespace?: string, xmlns?: string);
    /**
     * The Namespace of root node
     */
    namespaces: any;
    private parent;
    private _children;
    /**
     * The child nodes collection
     */
    readonly children: Node[];
    /**
     * The value of xml node
     */
    value: string;
    /**
     * Adds a new namespace in root node
     * @param {string} namespace - The namespace string
     * @param {string} prefix - The prefix string
     * @returns {Attribute} - The namespace attribute
     */
    addNamespace(namespace: string, prefix?: string): Attribute;
    /**
     * Get prefix using namespace, which can be used on node.
     * Eg. For Relationship Prefix.
     * Input: http://schemas.openxmlformats.org/officeDocument/2006/relationships.
     * Possible Output: r
     * @param namespace - The namespace string
     */
    getNamespacePrefix(namespace: string): string;
    /**
     * Gets or adds a child of node
     * @param {Node | string} node - The node or node name to get or add. Use string value to search child and node value to append.
     * @param {string} namespace - The namespace of node
     * @param {number} index - The child index
     * @returns {Node} - The child node
     */
    child(node: string | Node, namespace?: string, index?: number): Node;
    /**
     * Gets or adds Attributes of node
     * @param {Attribute | string} attribute - The attribute or attribute name to get or add. Use string value to search attribute and attribute value to append.
     * @param {string} namespace - The namespace
     * @returns {Attribute} - The xml attribute
     */
    attribute(attribute: string | Attribute, namespace?: string): Attribute;
    /**
     * Get saved attribute in a node
     * @param attribute - Attribute string or entity
     */
    getAttribute(attribute: string | Attribute): Attribute;
    /**
     * Gets string for node
     * @returns {string} - Node string (<Node Attributes><Child/></Node>)
     */
    toString(): string;
    /**
     * Convert Node to JSON
     */
    toJSON(): any;
    private addAttribute;
    private addChild;
    private getChild;
}

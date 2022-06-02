import { Xml } from "../base/xml";
import { Node } from "../base/node";
/**
 * Relationship file
 */
export declare class Relationships extends Xml {
    /**
     * Creates new instance of relationship file
     * @param {string} fileName - The file name
     * @param {string} filePath - The file path
     */
    constructor(fileName?: string, filePath?: string);
    /**
     * The identity incrementer
     */
    private id;
    /**
     * Add new relationship in root node
     * @param {string} target - The target string
     * @param {string} type - The type string
     * @param {number} id - The identity number
     * @returns {string} - The relationship identifier
     */
    addRelationship(target: string, type: string, id?: number | string): string;
    /**
     * Update Id
     */
    updateId(): void;
    /**
     * Get Relationship attribute
     * @param relationship - Relationship string
     */
    getByRelationship(relationship: string): Node;
    /**
     * Get Relationship by Id
     * @param rId - Relationship Id
     */
    getById(rId: string): Node;
    /**
     * Load a file
     * @param zip - JS Zip file
     * @returns {Relationships}: - The Relationship object
     */
    static load(content: string, fileName: string, filePath?: string): Promise<Relationships>;
}

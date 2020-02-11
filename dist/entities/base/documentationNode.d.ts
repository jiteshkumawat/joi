/**
 * Documentation Node
 */
export declare class DocumentationNode {
    version: string;
    encoding: string;
    standalone: boolean;
    /**
     * Creates new instance of Documentation Node
     * @param {string} version - The version of xml
     * @param {string} encoding - The encoding of xml
     * @param {boolean} standalone - Determine xml is standalone or not
     */
    constructor(version?: string, encoding?: string, standalone?: boolean);
    /**
     * Get string for node
     * @returns {string} - Node string (<?xml Attributes?>)
     */
    toString(): string;
}

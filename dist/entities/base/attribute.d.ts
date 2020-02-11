/**
 * Xml Attribute
 */
export declare class Attribute {
    name: string;
    value: string;
    isActive: boolean;
    namespace: string;
    /**
     * Creates new instance of an xml attribute
     * @param {string} name - The name of attribute
     * @param {string} value - The value of attribute
     * @param {boolean} state - The state of attribute
     */
    constructor(name: string, value?: string, isActive?: boolean, namespace?: string);
    /**
     * Gets string for attribute
     * @returns {string} - Attribute string (Name="Value")
     */
    toString(): string;
}

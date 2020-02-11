import { Xml } from "../entities/base/xml";
/**
 * Xml Parser
 */
export declare class XmlParser {
    /**
     * Parse xml string to Xml object
     * @param content - The xml content
     * @param file - The Xml file
     * @param defaultNamespace - Default name space
     * @returns {Promise<Xml>} - Promise to resolve Xml file
     */
    static parse(content: string, file: Xml, defaultNamespace?: string): Promise<Xml>;
    private static parseForBrowser;
    private static createNodeForBrowser;
    private static addNameSpaceForBrowser;
    private static parseForNodeJS;
    private static createNodeForNodeJS;
    private static addNameSpaceForNodeJS;
}

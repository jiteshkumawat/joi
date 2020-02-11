import { Xml } from "../../base/xml";
/**
 * Define new Shared string file
 */
export declare class SharedStringsFile extends Xml {
    /**
     * Total count of shared strings
     */
    private countAttribute;
    /**
     * Total unique count of shared strings
     */
    private uniqueCountAttribute;
    /**
     * Initialize new workbook file
     */
    constructor();
    /**
     * Add a new shared string in workbook
     * @param {string} value - The shared string
     * @returns { index: number; value: string } - The shared string index
     */
    add(value: string): {
        index: number;
        value: string;
    };
    /**
     * Get the shared string index
     * @param {string} value - The shared string
     * @returns {number} - The shared string index
     */
    get(value: string | number): {
        index: number;
        value: string;
    };
    /**
     * Total count of shared string used
     * @param count - Total count of shared strings used
     */
    setCount(count: number): void;
    /**
     * Add count
     */
    addCount(): number;
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<SharedStringsFile>}: - The Promise resolving Shared string file
     */
    static load(content: string, fileName: string, filePath?: string): Promise<SharedStringsFile>;
    private resetCount;
}

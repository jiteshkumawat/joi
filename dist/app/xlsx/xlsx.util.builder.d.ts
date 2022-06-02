import { Xlsx } from "./xlsx.util";
export declare class XlsxBuilder {
    /**
     * Create an instance of Xlsx Workbook file
     * @param fileName - Workbook file name
     * @returns {Xlsx} - Workbook file (Xlsx)
     */
    static default(fileName?: string): Xlsx;
    /**
     * Create Xlsx from existing file
     * @param file - The oxml file
     * @param options - Options to load file
     * @param fileName - The file name
     * @param callback - Method to execute after creating Xlsx from this file
     */
    static create(file: any, options?: any, fileName?: string, callback?: Function): Promise<Xlsx>;
    private static getFileName;
    /**
     * Initialize content types
     */
    private static initContentTypes;
    /**
     * Bind Event Listeners on Bus
     */
    private static bindListeners;
    /**
     * Initialize relationships
     */
    private static initRels;
    private static loadContentTypes;
    private static loadRelationships;
}

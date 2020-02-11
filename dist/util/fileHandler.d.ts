import { Xml } from "../entities/base/xml";
import { Relationships } from "../entities/files/relationships";
/**
 * File type in Oxml
 */
export declare enum FileType {
    /**
     * Content Types file
     */
    ContentTypes = 0,
    /**
     * Relationships file
     */
    Relationships = 1,
    /**
     * Workbook file
     */
    Workbook = 2,
    /**
     * Worksheet file
     */
    Worksheet = 3,
    /**
     * Shared strings file
     */
    SharedStrings = 4,
    /**
     * Xml file. For any other type
     */
    Xml = 5
}
/**
 * Adapter class representing JSZip file
 */
export declare class FileAdapter {
    /**
     * File Name without extention and path
     */
    fileName: string;
    /**
     * File Name with extention
     */
    fileNameWithExtention: string;
    /**
     * File path without file name
     */
    filePath: string;
    /**
     * File extention
     */
    fileExtention: string;
    /**
     * Complete file path and name with extention
     */
    completeName: string;
    /**
     * File processed and Xml created
     */
    processed: boolean;
    /**
     * File Content in string
     */
    fileContent: string;
    /**
     * File Type
     */
    fileType: FileType;
    /**
     * File's Relationship file
     */
    relationsFile?: Relationships;
    /**
     * The Xml processed of file
     */
    xmlFile?: Xml;
    /**
     * Get Relationship file for a path
     * @param filePath - File Path
     * @param files - Files collection
     * @param relExtention - Relationships extention
     */
    static getRelationshipFile(filePath: string, files: FileAdapter[], relExtention: string): FileAdapter;
}
/**
 * JSZip Adapter class
 */
export declare class JSZipAdapter {
    /**
     * Creates a new js zip instance and saves file
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for Save complete
     */
    static saveFile(files: Xml[], fileName: string, callback: Function): void;
    /**
     * Load open xml file
     * @param file - The file as String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
     * @param options - The options to load the file
     * @param callback - The callback method
     */
    static loadFile(file: any, options?: object): Promise<any>;
    /**
     * Extract content from JSZip file
     * @param zip - JSZip file
     */
    static extract(zip: any): Promise<FileAdapter[]>;
    /**
     * Save file for Browsers
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for save complete
     */
    private static saveForBrowser;
    /**
     * Save files for node
     * @param files - The collection of files
     * @param fileName - The file name
     * @param callback - The callback for save complete
     */
    private static saveForNode;
    private static loadForBrowser;
    private static loadForNodeJS;
}

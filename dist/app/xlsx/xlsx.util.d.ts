import { Xml } from "../../entities/base/xml";
import { WorkbookUtility } from "./workbook.util";
import { Sheet } from "./sheet";
/**
 * Define a new xlsx / excel file
 */
export declare class Xlsx {
    /**
     * Initialize a new xlsx / excel file
     * @param fileName - The file name
     */
    constructor(fileName: string, files: Xml[], workbookUtility: WorkbookUtility);
    /**
     * The File name
     */
    fileName: string;
    /**
     * Download file
     * @param {string} fileName - The file name to download
     * @param {Function} callback - Callback for download complete
     */
    download: (fileName?: string, callback?: Function) => any;
    /**
     * Adds a new sheet to workbook
     * @param {string} name - The Sheet Name
     */
    sheet: (name?: string) => Sheet;
    /**
     * Load oxml file
     * @param file - The oxml file in String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
     * @param options - The options to load the file
     * @param fileName - The file name
     * @param callback = The callback
     * @returns {Promise<Xlsx>} - Promise to load xlsx file
     */
    static load(file: any, options?: any, fileName?: string, callback?: Function): Promise<Xlsx>;
    toJSON(): {
        fileName: string;
    };
}

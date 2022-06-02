import { JSZipAdapter } from "../../util/fileHandler";
import { Xml } from "../../entities/base/xml";
import { WorkbookUtility } from "./workbook.util";
import { XlsxBuilder } from "./xlsx.util.builder";
import { Sheet } from "./sheet";
/**
 * Define a new xlsx / excel file
 */
export class Xlsx {
  /**
   * Initialize a new xlsx / excel file
   * @param fileName - The file name
   */
  constructor(
    fileName: string,
    files: Xml[],
    workbookUtility: WorkbookUtility
  ) {
    this.fileName = fileName;

    /**
     * Download file
     * @param {string} fileName - The file name to download
     * @param {Function} callback - Callback for download complete
     */
    this.download = (fn?: string, callback?: Function) => {
      fn = (fn && fn.trim()) || this.fileName;
      return JSZipAdapter.saveFile(files, fn, callback);
    };

    /**
     * Adds a new sheet to workbook
     * @param {string} name - The Sheet Name
     */
    this.sheet = (name?: string): Sheet => {
      return workbookUtility.sheet(name) as Sheet;
    };
  }

  /**
   * The File name
   */
  public fileName: string;

  /**
   * Download file
   * @param {string} fileName - The file name to download
   * @param {Function} callback - Callback for download complete
   */
  public download: (fileName?: string, callback?: Function) => any;

  /**
   * Adds a new sheet to workbook
   * @param {string} name - The Sheet Name
   */
  public sheet: (name?: string) => Sheet;

  /**
   * Load oxml file
   * @param file - The oxml file in String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
   * @param options - The options to load the file
   * @param fileName - The file name
   * @param callback = The callback
   * @returns {Promise<Xlsx>} - Promise to load xlsx file
   */
  public static load(
    file: any,
    options?: any,
    fileName?: string,
    callback?: Function
  ): Promise<Xlsx> {
    return XlsxBuilder.create(file, options, fileName, callback);
  }

  public toJSON(){
    return {fileName: this.fileName};
  }
}

import { Xml } from "../entities/base/xml";
import { Relationships } from "../entities/files/relationships";

declare let JSZip: any;
declare let saveAs: any;

/**
 * File type in Oxml
 */
export enum FileType {
  /**
   * Content Types file
   */
  ContentTypes,

  /**
   * Relationships file
   */
  Relationships,

  /**
   * Workbook file
   */
  Workbook,

  /**
   * Worksheet file
   */
  Worksheet,

  /**
   * Shared strings file
   */
  SharedStrings,

  /**
   * Xml file. For any other type
   */
  Xml
}

/**
 * Adapter class representing JSZip file
 */
export class FileAdapter {
  /**
   * File Name without extention and path
   */
  public fileName: string;

  /**
   * File Name with extention
   */
  public fileNameWithExtention: string;

  /**
   * File path without file name
   */
  public filePath: string;

  /**
   * File extention
   */
  public fileExtention: string;

  /**
   * Complete file path and name with extention
   */
  public completeName: string;

  /**
   * File processed and Xml created
   */
  public processed: boolean;

  /**
   * File Content in string
   */
  public fileContent: string;

  /**
   * File Type
   */
  public fileType: FileType;

  /**
   * File's Relationship file
   */
  public relationsFile?: Relationships;

  /**
   * The Xml processed of file
   */
  public xmlFile?: Xml;

  /**
   * Get Relationship file for a path
   * @param filePath - File Path
   * @param files - Files collection
   * @param relExtention - Relationships extention
   */
  public static getRelationshipFile(
    filePath: string,
    files: FileAdapter[],
    relExtention: string
  ): FileAdapter {
    let relFile = files.find(
      fl =>
        fl.filePath === filePath + "/_rels" && fl.fileExtention === relExtention
    );

    if (!relFile && filePath) {
      filePath = filePath.substring(0, filePath.indexOf("/"));
      relFile = this.getRelationshipFile(filePath, files, relExtention);
    }

    return relFile;
  }
}

/**
 * JSZip Adapter class
 */
export class JSZipAdapter {
  /**
   * Creates a new js zip instance and saves file
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for Save complete
   */
  public static saveFile(files: Xml[], fileName: string, callback: Function) {
    if (typeof window !== "undefined") {
      this.saveForBrowser(files, fileName, callback);
    } else {
      this.saveForNode(files, fileName, callback);
    }
  }

  /**
   * Load open xml file
   * @param file - The file as String/Array of bytes/ArrayBuffer/Uint8Array/Buffer/Blob/Promise
   * @param options - The options to load the file
   * @param callback - The callback method
   */
  public static loadFile(file: any, options?: object): Promise<any> {
    if (typeof window !== "undefined") {
      return this.loadForBrowser(file, options);
    } else {
      return this.loadForNodeJS(file, options);
    }
  }

  /**
   * Extract content from JSZip file
   * @param zip - JSZip file
   */
  public static async extract(zip: any): Promise<FileAdapter[]> {
    let filesPromises: Promise<void>[] = [];
    let apapters: FileAdapter[] = [];
    for (let file in zip.files) {
      filesPromises.push(
        zip
          .file(file)
          .async("string")
          .then(function(fileContent: string) {
            let fileAdapter = new FileAdapter();
            fileAdapter.completeName = file;
            fileAdapter.fileName = file.substring(
              file.lastIndexOf("/") + 1,
              file.lastIndexOf(".")
            );
            fileAdapter.fileNameWithExtention = file.substring(
              file.lastIndexOf("/") + 1
            );
            fileAdapter.filePath = file.substring(0, file.lastIndexOf("/"));
            fileAdapter.fileExtention = file.substring(
              file.lastIndexOf(".") + 1
            );
            fileAdapter.processed = false;
            fileAdapter.fileContent = fileContent;
            fileAdapter.fileType = FileType.Xml;
            apapters.push(fileAdapter);
          })
      );
    }

    await Promise.all(filesPromises);
    return Promise.resolve(apapters);
  }

  /**
   * Save file for Browsers
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for save complete
   */
  private static saveForBrowser(
    files: Xml[],
    fileName: string,
    callback?: Function
  ) {
    try {
      let zip = new JSZip();
      files.forEach(file => {
        file.saveFile(zip);
      });

      return zip.generateAsync({ type: "blob" }).then(function(content: any) {
        try {
          if (typeof saveAs !== "undefined") {
            return saveAs(content, fileName);
          }
          var url = window.URL.createObjectURL(content);
          var element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", fileName);

          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);

          if (callback) {
            callback(zip);
          } else {
            return zip;
          }
        } catch (err) {
          if (callback) {
            callback(null, "Err: Not able to create file object.");
          } else {
            throw err;
          }
        }
      });
    } catch (err) {
      if (callback) {
        callback("Err: Not able to create workbook.");
        console.error(err);
      } else {
        throw err;
      }
    }
  }

  /**
   * Save files for node
   * @param files - The collection of files
   * @param fileName - The file name
   * @param callback - The callback for save complete
   */
  private static saveForNode(
    files: Xml[],
    fileName: string,
    callback?: Function
  ) {
    try {
      let jsZip = require("jszip");
      let zip = new jsZip();
      let fs = require("fs");

      files.forEach(file => {
        file.saveFile(zip);
      });

      if (callback) {
        zip
          .generateNodeStream({ type: "nodebuffer", streamFiles: true })
          .pipe(fs.createWriteStream(fileName))
          .then(callback());
      } else {
        return zip
          .generateNodeStream({ type: "nodebuffer", streamFiles: true })
          .pipe(fs.createWriteStream(fileName));
      }
    } catch (err) {
      if (callback) {
        callback("Err: Not able to create workbook.");
        console.error(err);
      } else {
        return Promise.reject(err);
      }
    }
  }

  private static loadForBrowser(file: any, options?: object): Promise<any> {
    let zip = new JSZip();
    return zip.loadAsync(file, options);
  }

  private static loadForNodeJS(file: any, options?: object): Promise<any> {
    let zip = require("jszip");
    return zip.loadAsync(file, options);
  }
}

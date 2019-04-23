import { ContentTypes } from "../../xmlElements/xmlFiles/contentTypes";
import { Relationships } from "../../xmlElements/xmlFiles/relationships";
import { XmlFile } from "../../xmlElements/base/xmlFile";
import { FileHandler } from "../../shared/fileHandler";
import { EventBus } from "../../shared/eventBus";
import { WorkbookUtility } from "./workbookUtility";
import { SheetUtility } from "./sheetUtility";

/**
 * Define a new xlsx / excel file
 */
export class Xlsx {
  /**
   * Initialize a new xlsx / excel file
   * @param fileName - The file name
   */
  constructor(fileName?: string) {
    let files: XmlFile[] = [];
    const contentTypes = this.initContentTypes(files);
    this.initRels(files);
    this.fileName = (fileName && fileName.trim()) || "Document.xlsx";
    const fileHandler = new FileHandler();
    const eventBus = new EventBus();
    this.bindListeners(contentTypes, files, eventBus);
    const workbookUtility = new WorkbookUtility(eventBus);

    /**
     * Download the file
     * @param {string} fileName - The file name to download
     * @param {Function} callback - Callback for download complete
     */
    this.download = (fn?: string, callback?: Function) => {
      fn = (fn && fn.trim()) || this.fileName;
      if (fn) {
        if (!fn.endsWith(".xlsx")) {
          fn += ".xlsx";
        }

        return fileHandler.saveFile(files, fn, callback);
      }
    };

    /**
     * Adds a new sheet to workbook
     * @param {string} name - The Sheet Name
     */
    this.sheet = (name?: string): SheetUtility => {
      return workbookUtility.sheet(name) as SheetUtility;
    };
  }

  /**
   * The File name
   */
  public fileName: string;

  /**
   * Download the file
   * @param {string} fileName - The file name to download
   * @param {Function} callback - Callback for download complete
   */
  public download: (fileName: string, callback: Function) => any;

  /**
   * Adds a new sheet to workbook
   * @param {string} name - The Sheet Name
   */
  public sheet: (name?: string) => SheetUtility;

  /**
   * Initialize content types
   */
  private initContentTypes(files: XmlFile[]) {
    let contentTypes = new ContentTypes();
    files.push(contentTypes);
    contentTypes.addDefault(
      "application/vnd.openxmlformats-package.relationships+xml",
      "rels"
    );
    contentTypes.addDefault("application/xml", "xml");
    contentTypes.addOverride(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      "/workbook/workbook.xml"
    );
    return contentTypes;
  }

  /**
   * Initialize relationships
   */
  private initRels(files: XmlFile[]) {
    let relationships = new Relationships();
    files.push(relationships);
    relationships.addRelationship(
      "workbook/workbook.xml",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
    );

    return relationships;
  }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners(
    contentTypes: ContentTypes,
    files: XmlFile[],
    eventBus: EventBus
  ) {
    eventBus.startListening("addFile", (file: XmlFile) => {
      files.push(file);
    });

    eventBus.startListening(
      "addContentType",
      (type: string, contentType: string, arg: string) => {
        if (type.toLowerCase() === "default") {
          contentTypes.addDefault(contentType, arg);
        } else {
          contentTypes.addOverride(contentType, arg);
        }
      }
    );
  }
}

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
    this.files = [];
    this.initContentTypes();
    this.initRels();
    this.FileName = (fileName && fileName.trim()) || "Document.xlsx";
    this.fileHandler = new FileHandler();
    this.eventBus = new EventBus();
    this.bindListeners();
    this.workbookUtility = new WorkbookUtility(this.eventBus);
  }

  /**
   * The File name
   */
  public FileName: string;

  /**
   * The Content types collection
   */
  private contentTypes: ContentTypes;

  /**
   * The relationships collection
   */
  private relationships: Relationships;

  /**
   * The files in compressed xlsx
   */
  private files: XmlFile[];

  /**
   * The File Handler
   */
  private fileHandler: FileHandler;

  /**
   * The Event Bus
   */
  private eventBus: EventBus;

  /**
   * The Workbook Utility Instance
   */
  private workbookUtility: WorkbookUtility;

  /**
   * Download the file
   * @param fileName - The file name to download
   * @param callback - Callback for download complete
   */
  public download(fileName?: string, callback?: Function) {
    fileName = (fileName && fileName.trim()) || this.FileName;
    if (fileName) {
      if (!fileName.endsWith(".xlsx")) {
        fileName += ".xlsx";
      }

      return this.fileHandler.saveFile(this.files, fileName, callback);
    }
  }

  /**
   * Adds a new sheet to workbook
   * @param name - The Sheet Name
   * @returns {SheetUtility} - The Sheet instance
   */
  public sheet(name?: string): SheetUtility {
    return this.workbookUtility.sheet(name);
  }

  /**
   * Initialize content types
   */
  private initContentTypes() {
    this.contentTypes = new ContentTypes();
    this.files.push(this.contentTypes);
    this.contentTypes.addDefault(
      "application/vnd.openxmlformats-package.relationships+xml",
      "rels"
    );
    this.contentTypes.addDefault("application/xml", "xml");
    this.contentTypes.addOverride(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      "/workbook/workbook.xml"
    );
  }

  /**
   * Initialize relationships
   */
  private initRels() {
    this.relationships = new Relationships();
    this.files.push(this.relationships);
    this.relationships.addRelationship(
      "workbook/workbook.xml",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
    );
  }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners() {
    this.eventBus.startListening("addFile", (file: XmlFile) => {
      this.files.push(file);
    });

    this.eventBus.startListening(
      "addContentType",
      (type: string, contentType: string, arg: string) => {
        if (type.toLowerCase() === "default") {
          this.contentTypes.addDefault(contentType, arg);
        } else {
          this.contentTypes.addOverride(contentType, arg);
        }
      }
    );
  }
}

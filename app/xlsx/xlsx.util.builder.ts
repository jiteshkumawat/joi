import { Xml } from "../../entities/base/xml";
import { ContentTypes } from "../../entities/files/contentTypes";
import { JSZipAdapter, FileAdapter } from "../../util/fileHandler";
import { EventBus } from "../../util/eventBus";
import { WorkbookUtility } from "./workbook.util";
import { Relationships } from "../../entities/files/relationships";
import { Xlsx } from "./xlsx.util";
import { WorkbookUtilityBuilder } from "./workbook.util.builder";

export class XlsxBuilder {
  /**
   * Create an instance of Xlsx Workbook file
   * @param fileName - Workbook file name
   * @returns {Xlsx} - Workbook file (Xlsx)
   */
  public static default(fileName?: string): Xlsx {
    let files: Xml[] = [];
    let contentTypes: ContentTypes;
    const eventBus = new EventBus();
    fileName = this.getFileName(fileName);
    contentTypes = this.initContentTypes(files, eventBus);
    this.bindListeners(files, eventBus);
    let workbookUtility = WorkbookUtilityBuilder.default(eventBus);
    this.initRels(files, contentTypes);

    return new Xlsx(fileName, files, workbookUtility);
  }

  /**
   * Create Xlsx from existing file
   * @param file - The oxml file
   * @param options - Options to load file
   * @param fileName - The file name
   * @param callback - Method to execute after creating Xlsx from this file
   */
  public static async create(
    file: any,
    options?: any,
    fileName?: string,
    callback?: Function
  ) {
    let files: Xml[] = [];
    const eventBus = new EventBus();
    fileName = this.getFileName(fileName);
    let workbookUtility: WorkbookUtility;
    let contentTypes: ContentTypes;
    let self = this;

    const zipFile = await JSZipAdapter.loadFile(file, options);
    const fileAdapters = await JSZipAdapter.extract(zipFile);

    const _contentTypes = await self.loadContentTypes(fileAdapters, files, eventBus);
    contentTypes = _contentTypes;
    self.bindListeners(files, eventBus);
    workbookUtility = await WorkbookUtilityBuilder.create(eventBus, fileAdapters, _contentTypes);
    await self.loadRelationships(fileAdapters, files, contentTypes);

    var xlsx = new Xlsx(fileName, files, workbookUtility);
    if (callback) {
      callback(xlsx);
    }
    return xlsx;
  }

  private static getFileName(fileName?: string) {
    fileName = (fileName && fileName.trim()) || "Document.xlsx";
    if (!fileName.endsWith(".xlsx")) {
      fileName = fileName + ".xlsx";
    }
    return fileName;
  }

  /**
   * Initialize content types
   */
  private static initContentTypes(files: Xml[], eventBus: EventBus) {
    let contentTypes = new ContentTypes(eventBus);
    files.push(contentTypes);
    contentTypes.addDefault(
      "application/vnd.openxmlformats-package.relationships+xml",
      "rels"
    );
    contentTypes.addDefault("application/xml", "xml");
    return contentTypes;
  }

  /**
   * Bind Event Listeners on Bus
   */
  private static bindListeners(
    files: Xml[],
    eventBus: EventBus
  ) {
    eventBus.stopListening("addFile");
    eventBus.startListening("addFile", (file: Xml) => {
      files.push(file);
    });
  }

  /**
   * Initialize relationships
   */
  private static initRels(files: Xml[], contentTypes: ContentTypes) {
    let relationships = new Relationships(
      "." +
        contentTypes.defaults[
          "application/vnd.openxmlformats-package.relationships+xml"
        ]
    );
    files.push(relationships);
    relationships.addRelationship(
      contentTypes.overrides[
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
      ].replace(/^[\/]+|[\/]+$/g, ""),
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
    );

    return relationships;
  }

  private static async loadContentTypes(
    files: FileAdapter[],
    xmls: Xml[],
    eventBus: EventBus
  ): Promise<ContentTypes> {
    const contentTypesFile = files.find(
      file => file.fileName === "[Content_Types]"
    );
    const contentTypes = await ContentTypes.load(contentTypesFile, eventBus);
    xmls.push(contentTypes);
    return contentTypes;
  }

  private static async loadRelationships(
    files: FileAdapter[],
    xmls: Xml[],
    contentTypes: ContentTypes
  ): Promise<Relationships> {
    let relExtention =
      contentTypes.defaults[
        "application/vnd.openxmlformats-package.relationships+xml"
      ];
    const relationsFile = files.find(
      file => file.completeName === "_rels/." + relExtention
    );

    const relation = await Relationships.load(
      relationsFile.fileContent,
      relationsFile.fileNameWithExtention,
      relationsFile.filePath
    );
    xmls.push(relation);
    relationsFile.processed = true;
    relationsFile.xmlFile = relation;
    return relation;
  }
}

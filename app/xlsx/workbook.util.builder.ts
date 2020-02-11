import { EventBus } from "../../util/eventBus";
import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { Relationships } from "../../entities/files/relationships";
import { SharedStringsFile } from "../../entities/xlsx/files/sharedStringsFile";
import { WorkbookUtility } from "./workbook.util";
import { FileAdapter } from "../../util/fileHandler";
import { ContentTypes } from "../../entities/files/contentTypes";
import { SheetBuilder } from "./sheet.builder";
import { Constants } from "../../util/constants";

/**
 * Builder class for Workbook Utility
 */
export class WorkbookUtilityBuilder {
  /**
   * Create default workbook utility
   * @param eventBus - Event Bus
   */
  public static default(eventBus: EventBus) {
    let workbook: WorkbookFile;
    let relations: Relationships;
    let sharedStringFile: SharedStringsFile;

    workbook = new WorkbookFile(eventBus);
    eventBus.trigger(
      Constants.Events.AddContentType,
      "Override",
      Constants.ContentTypes.Workbook,
      "/workbook/workbook.xml"
    );
    eventBus.trigger(Constants.Events.AddFile, workbook);
    relations = new Relationships("workbook.xml.rels", "workbook/_rels");
    eventBus.trigger(Constants.Events.AddFile, relations);

    const workbookUtility = new WorkbookUtility(
      eventBus,
      workbook,
      relations,
      sharedStringFile
    );

    return workbookUtility;
  }

  /**
   * Create a Workbook Utility from existing file
   * @param eventBus - Event bus
   * @param files - File adapter collection
   * @param contentTypes - Content types file
   */
  public static async create(
    eventBus: EventBus,
    files: FileAdapter[],
    contentTypes: ContentTypes
  ) {
    const workbookFileAdapter = this.getWorkbookFileAdapter(
      contentTypes,
      files
    );

    let relationshipFile = await this.loadRelationshipsFile(
      workbookFileAdapter,
      files,
      contentTypes,
      eventBus
    );

    let saredStringsFile = await this.loadSharedStringsFile(
      relationshipFile,
      files,
      workbookFileAdapter
    );

    let workbookFile = await WorkbookFile.load(
      eventBus,
      workbookFileAdapter.fileContent,
      workbookFileAdapter.fileName,
      workbookFileAdapter.filePath
    );

    eventBus.trigger(Constants.Events.AddFile, workbookFile);

    await this.loadSheets(
      workbookFile,
      workbookFileAdapter,
      relationshipFile,
      files,
      eventBus
    );

    const workbookUtility = new WorkbookUtility(
      eventBus,
      workbookFile,
      relationshipFile,
      saredStringsFile
    );

    return workbookUtility;
  }

  private static getWorkbookFileAdapter(
    contentTypes: ContentTypes,
    files: FileAdapter[]
  ): FileAdapter {
    let workbookContentType: string =
      contentTypes.overrides[Constants.ContentTypes.Workbook];

    if (workbookContentType.startsWith("/")) {
      workbookContentType = workbookContentType.substring(1);
    }

    const workbookFile = files.find(
      fl => fl.completeName === workbookContentType
    );

    return workbookFile;
  }

  private static async loadRelationshipsFile(
    workbookFile: FileAdapter,
    files: FileAdapter[],
    contentTypes: ContentTypes,
    eventBus: EventBus
  ): Promise<Relationships> {
    let relationsFile = FileAdapter.getRelationshipFile(
      workbookFile.filePath,
      files,
      contentTypes.defaults[Constants.ContentTypes.Relationship]
    );

    let relation: Relationships;

    // TODO else
    if (!relationsFile.processed) {
      relation = await Relationships.load(
        relationsFile.fileContent,
        relationsFile.fileNameWithExtention,
        relationsFile.filePath
      );
      eventBus.trigger(Constants.Events.AddFile, relation);
      relationsFile.processed = true;
      relationsFile.xmlFile = relation;
    }
    return relation;
  }

  private static async loadSharedStringsFile(
    relation: Relationships,
    files: FileAdapter[],
    workbookFile: FileAdapter
  ): Promise<SharedStringsFile> {
    let sharedStringRel = relation.getByRelationship(Constants.Relationships.SharedString);

    let saredStrings: SharedStringsFile;

    if (sharedStringRel) {
      const sharedStringRelValue = sharedStringRel.attribute(
        "Target",
        relation.defaultNamespace
      ).value;
      // Load Shared string file
      let sharedStringFile = files.find(
        fl =>
          fl.filePath ===
          workbookFile.filePath +
            sharedStringRelValue.substring(
              0,
              sharedStringRelValue.lastIndexOf("/")
            )
      );

      if (!sharedStringFile.processed) {
        saredStrings = await SharedStringsFile.load(
          sharedStringFile.fileContent,
          sharedStringFile.fileName,
          sharedStringFile.filePath
        );
      }
    }

    return saredStrings;
  }

  private static async loadSheets(
    workbookFileXml: WorkbookFile,
    workbookFile: FileAdapter,
    relation: Relationships,
    files: FileAdapter[],
    eventBus: EventBus
  ) {
    const relationshipNamespace = workbookFileXml.sheets.getNamespacePrefix(
      Constants.Namespace.Relationships
    );

    workbookFileXml.sheets.children.forEach(sheetNode => {
      const rId = sheetNode.attribute("Id", relationshipNamespace).value;
      const relationNode = relation.getById(rId);
      const sheetId = sheetNode.attribute(
        "sheetId",
        workbookFileXml.defaultNamespace
      ).value;
      const sheetName = sheetNode.attribute(
        "name",
        workbookFileXml.defaultNamespace
      ).value;
      const filePath =
        workbookFile.filePath +
        "/" +
        relationNode.attribute("Target", relation.defaultNamespace).value;

      const file = files.find(
        f => f.filePath + "/" + f.fileNameWithExtention === filePath
      );
      if (!file.processed) {
        SheetBuilder.create(
          file,
          eventBus,
          workbookFileXml,
          parseInt(sheetId),
          sheetName
        );
      }
    });
  }
}

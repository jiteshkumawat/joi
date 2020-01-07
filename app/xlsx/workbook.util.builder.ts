import { EventBus } from "../../util/eventBus";
import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { Relationships } from "../../entities/files/relationships";
import { SharedStringsFile } from "../../entities/xlsx/files/sharedStringsFile";
import { WorkbookUtility } from "./workbook.util";
import { FileAdapter } from "../../util/fileHandler";
import { ContentTypes } from "../../entities/files/contentTypes";
import { SheetBuilder } from "./sheet.builder";

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
      "addContentType",
      "Override",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      "/workbook/workbook.xml"
    );
    eventBus.trigger("addFile", workbook);
    relations = new Relationships("workbook.xml.rels", "workbook/_rels");
    eventBus.trigger("addFile", relations);

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
    let workbookContentType: string =
      contentTypes.overrides[
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"
      ];
    if (workbookContentType.startsWith("/")) {
      workbookContentType = workbookContentType.substring(1);
    }

    const workbookFile = files.find(
      fl => fl.completeName === workbookContentType
    );

    let relationsFile = FileAdapter.getRelationshipFile(
      workbookFile.filePath,
      files,
      contentTypes.defaults[
        "application/vnd.openxmlformats-package.relationships+xml"
      ]
    );

    let relation: Relationships;

    if (!relationsFile.processed) {
      relation = await Relationships.load(
        relationsFile.fileContent,
        relationsFile.fileNameWithExtention,
        relationsFile.filePath
      );
      eventBus.trigger("addFile", relation);
      relationsFile.processed = true;
      relationsFile.xmlFile = relation;
    }

    let sharedStringRel = relation.getByRelationship(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"
    );

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

    let workbookFileXml = await WorkbookFile.load(
      eventBus,
      workbookFile.fileContent,
      workbookFile.fileName,
      workbookFile.filePath
    );

    eventBus.trigger("addFile", workbookFileXml);

    workbookFileXml.sheets.children.forEach(sheetNode => {
      const rId = sheetNode.getAttribute("r:Id").value;
      const relationNode = relation.getById(rId);
      const filePath = relationNode.attribute(
        "Target",
        relation.defaultNamespace
      ).value;

      // const file = files.find(
      //   f => f.filePath + "/" + f.fileNameWithExtention === filePath
      // );
      // if (!file.processed) {
      // }
    });

    const workbookUtility = new WorkbookUtility(
      eventBus,
      workbookFileXml,
      relation,
      saredStrings
    );

    return workbookUtility;
  }
}

import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { EventBus } from "../../util/eventBus";
import { Sheet } from "./sheet";
import { SheetFile } from "../../entities/xlsx/files/sheetFile";
import { FileAdapter } from "../../util/fileHandler";
import { Constants } from "../../util/constants";

export class SheetBuilder {
  public static default(
    workbookFile: WorkbookFile,
    eventBus: EventBus,
    name?: string
  ) {
    let sheetFile = workbookFile.createSheet(name);
    let completeFilePath = "/" + sheetFile.filePath + "/" + sheetFile.fileName,
      relPath = "sheets/" + sheetFile.fileName;

    eventBus.trigger(
      Constants.Events.AddContentType,
      "Override",
      Constants.ContentTypes.Worksheet,
      completeFilePath
    );

    eventBus.trigger(
      Constants.Events.AddWorkbookRelation,
      relPath,
      Constants.Relationships.Worksheet,
      function(rId: string) {
        eventBus.trigger(Constants.Events.SetSheetRelationId, sheetFile.id, rId);
      }
    );

    const sheet = new Sheet(sheetFile, eventBus, workbookFile);

    eventBus.trigger(Constants.Events.SetSheetWorkbookView, sheetFile.id);

    return sheet;
  }

  public static async create(
    file: FileAdapter,
    eventBus: EventBus,
    workbookFile: WorkbookFile,
    id: number,
    name: string
  ) {
    file.processed = true;
    let sheetFile = await SheetFile.load(
      file.fileContent,
      file.fileName,
      file.filePath,
      id,
      name
    );
    return new Sheet(sheetFile, eventBus, workbookFile);
  }
}

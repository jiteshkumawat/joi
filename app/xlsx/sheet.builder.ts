import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { EventBus } from "../../util/eventBus";
import { Sheet } from "./sheet";
import { SheetFile } from "../../entities/xlsx/files/sheetFile";

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
      "addContentType",
      "Override",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      completeFilePath
    );

    eventBus.trigger(
      "addWorkbookRelation",
      relPath,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      function(rId: string) {
        eventBus.trigger("setSheetRelationId", sheetFile.id, rId);
      }
    );
    return new Sheet(sheetFile, eventBus, workbookFile);
  }

  public static async create(
    content: string,
    eventBus: EventBus,
    workbookFile: WorkbookFile,
    fileName: string,
    filePath: string,
    id: number,
    name: string
  ) {
    let sheetFile = await SheetFile.load(content, fileName, filePath, id, name);
    return new Sheet(sheetFile, eventBus, workbookFile);
  }
}

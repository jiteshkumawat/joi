import { Workbook } from "../../xmlElements/xmlFiles/xlsx/workbook";
import { EventBus } from "../../shared/eventBus";
import { Sheet } from "../../xmlElements/xmlFiles/xlsx/sheet";
import { Relationships } from "../../xmlElements/xmlFiles/relationships";

/**
 * Utility class for workbook
 */
export class WorkbookUtility {
  /**
   * Instanciate new workbook utility
   * @param eventBus - Event Bus Instance
   */
  constructor(private eventBus: EventBus) {
    this.workbook = new Workbook();
    this.eventBus.trigger("addFile", this.workbook);
    this.relations = new Relationships("workbook.xml.rels", "workbook/_rels");
    this.eventBus.trigger("addFile", this.relations);
  }

  /**
   * The Workbook
   */
  private workbook: Workbook;

  /**
   * The relationship file
   */
  private relations: Relationships;

  /**
   * Intantiate new sheet in workbook
   * @param name - Sheet name
   * @returns The sheet instance
   */
  public sheet(name?: string) {
    let sheet = new Sheet(this.workbook.TotalSheet + 1, name);
    this.workbook.addSheet(sheet);

    this.eventBus.trigger("addFile", sheet);
    this.eventBus.trigger(
      "addContentType",
      "Override",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      "/" + sheet.FilePath + "/" + sheet.FileName
    );

    this.relations.addRelationship(
      "sheets/" + sheet.FileName,
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      sheet.Id
    );
    return sheet;
  }
}

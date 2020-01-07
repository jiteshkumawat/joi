import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { EventBus } from "../../util/eventBus";
import { Relationships } from "../../entities/files/relationships";
import { SharedStringsFile } from "../../entities/xlsx/files/sharedStringsFile";
import { SheetBuilder } from "./sheet.builder";
import { Sheet } from "./sheet";

/**
 * Utility class for workbook
 */
export class WorkbookUtility {
  /**
   * Instanciate new workbook utility
   * @param eventBus - Event Bus Instance
   */
  constructor(
    eventBus: EventBus,
    workbook: WorkbookFile,
    relations: Relationships,
    sharedStringFile: SharedStringsFile
  ) {
    this.bindListeners(workbook, relations, eventBus);

    /**
     * Intantiate new sheet in workbook
     * @param {string} name - Sheet name
     * @returns - The sheet instance
     */
    this.sheet = (name?: string): Sheet => {
      let sheet = SheetBuilder.default(workbook, eventBus, name);
      return sheet;
    };

    /**
     * Add / Get shared string in workbook
     * @param {string} value - The shared string
     * @returns {number} - Shared string id
     */
    this.sharedString = (
      value: string | number
    ): { index: number; value: string } => {
      if (!sharedStringFile) {
        sharedStringFile = new SharedStringsFile();
        eventBus.trigger("addFile", sharedStringFile);
        relations.addRelationship(
          "sharedstrings.xml",
          "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"
        );
        eventBus.trigger(
          "addContentType",
          "Override",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
          "/workbook/sharedstrings.xml"
        );
      }

      if (typeof value === "string") {
        sharedStringFile.addCount();
        return sharedStringFile.add(value);
      } else {
        return sharedStringFile.get(value);
      }
    };
  }

  /**
   * Intantiate new sheet in workbook
   * @param {string} name - Sheet name
   * @returns - The sheet instance
   */
  public sheet: (name?: string) => Sheet;

  /**
   * Add / Get shared string in workbook
   * @param {string} value - The shared string
   * @returns {number} - Shared string id
   */
  public sharedString: (
    value: string | number
  ) => { index: number; value: string };

  // public static load(
  //   eventBus: EventBus,
  //   loadedFiles: IWorkbookUtilityContainer
  // ) {
  //   return new WorkbookUtility(eventBus, loadedFiles);
  // }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners(
    workbook: WorkbookFile,
    relations: Relationships,
    eventBus: EventBus
  ) {
    eventBus.startListening(
      "addWorkbookRelation",
      (target: string, type: string, callback: Function) => {
        let rId = relations.addRelationship(target, type);
        if (callback) {
          callback(rId);
        }
      }
    );

    // eventBus.startListening("activateTab", (tabNumber: number) => {
    //   workbook.activeTab.value = tabNumber.toString(10);
    // });

    eventBus.startListening(
      "sharedString",
      (value: string | number, callback?: Function) => {
        const sharedStringIndex = this.sharedString(value);
        if (callback) {
          callback(sharedStringIndex);
        }
      }
    );
  }
}

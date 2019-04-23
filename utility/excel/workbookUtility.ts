import { WorkbookFile } from "../../xmlElements/xmlFiles/xlsx/workbookFile";
import { EventBus } from "../../shared/eventBus";
import { Relationships } from "../../xmlElements/xmlFiles/relationships";
import { SheetUtility } from "./sheetUtility";

/**
 * Utility class for workbook
 */
export class WorkbookUtility {
  /**
   * Instanciate new workbook utility
   * @param eventBus - Event Bus Instance
   */
  constructor(eventBus: EventBus) {
    const workbook = new WorkbookFile();
    eventBus.trigger("addFile", workbook);
    const relations = new Relationships("workbook.xml.rels", "workbook/_rels");
    eventBus.trigger("addFile", relations);
    this.bindListeners(workbook, relations, eventBus);

    /**
     * Intantiate new sheet in workbook
     * @param {string} name - Sheet name
     * @returns - The sheet instance
     */
    this.sheet = (name?: string): SheetUtility => {
      let sheetUtility = new SheetUtility(workbook, eventBus, name);
      return sheetUtility;
    };
  }

  /**
   * Intantiate new sheet in workbook
   * @param {string} name - Sheet name
   * @returns - The sheet instance
   */
  public sheet: (name?: string) => SheetUtility;

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
      (target: string, type: string, id: number) => {
        relations.addRelationship(target, type, id);
      }
    );

    eventBus.startListening("activateTab", (tabNumber: number) => {
      workbook.activeTab.value = tabNumber.toString(10);
    });
  }
}

import { Workbook } from "../../xmlElements/xmlFiles/xlsx/workbook";
import { EventBus } from "../../shared/eventBus";
import { Sheet } from "../../xmlElements/xmlFiles/xlsx/sheet";
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
  constructor(private eventBus: EventBus) {
    this.workbook = new Workbook();
    this.eventBus.trigger("addFile", this.workbook);
    this.relations = new Relationships("workbook.xml.rels", "workbook/_rels");
    this.eventBus.trigger("addFile", this.relations);
    this.bindListeners();
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
    let sheetUtility = new SheetUtility(this.workbook, this.eventBus, name);
    return sheetUtility;
  }

  /**
   * Bind Event Listeners on Bus
   */
  private bindListeners() {
    this.eventBus.startListening(
      "addWorkbookRelation",
      (target: string, type: string, id: number) => {
        this.relations.addRelationship(target, type, id);
      }
    );

    this.eventBus.startListening("activateTab", (tabNumber: number) => {
      this.workbook.ActiveTab.Value = tabNumber.toString(10);
    });
  }
}

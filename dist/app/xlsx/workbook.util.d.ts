import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { EventBus } from "../../util/eventBus";
import { Relationships } from "../../entities/files/relationships";
import { SharedStringsFile } from "../../entities/xlsx/files/sharedStringsFile";
import { Sheet } from "./sheet";
/**
 * Utility class for workbook
 */
export declare class WorkbookUtility {
    /**
     * Instanciate new workbook utility
     * @param eventBus - Event Bus Instance
     */
    constructor(eventBus: EventBus, workbook: WorkbookFile, relations: Relationships, sharedStringFile: SharedStringsFile);
    /**
     * Intantiate new sheet in workbook
     * @param {string} name - Sheet name
     * @returns - The sheet instance
     */
    sheet: (name?: string) => Sheet;
    /**
     * Add / Get shared string in workbook
     * @param {string} value - The shared string
     * @returns {number} - Shared string id
     */
    sharedString: (value: string | number) => {
        index: number;
        value: string;
    };
    /**
     * Bind Event Listeners on Bus
     */
    private bindListeners;
}

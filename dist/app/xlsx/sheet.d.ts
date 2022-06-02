import { SheetFile } from "../../entities/xlsx/files/sheetFile";
import { EventBus } from "../../util/eventBus";
import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
/**
 * Define a new worksheet file
 */
export declare class Sheet {
    constructor(sheetFile: SheetFile, eventBus: EventBus, workbookFile: WorkbookFile);
    /**
     * Configure Sheet Properties
     * @param properties - Sheet Properties JSON
     * @returns {Sheet} - Sheet Object
     */
    configure: (properties: {
        showGridLines?: boolean;
        showFormula?: boolean;
        showRowColHeaders?: boolean;
        showRuler?: boolean;
        showZeros?: boolean;
        tabSelected?: boolean;
    }) => Sheet;
    /**
     * Get if sheetFile is active
     * @returns {string} - True if sheetFile is active
     */
    name: boolean;
    toJSON(): {
        name: boolean;
    };
    private defineNameProperty;
    private configureInternal;
}

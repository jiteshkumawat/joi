import { Node } from "../../base/node";
import { SheetFile } from "./sheetFile";
import { EventBus } from "../../../util/eventBus";
import { FileBase } from "../../base/fileBase";
/**
 * Define new workbook file
 */
export declare class WorkbookFile extends FileBase {
    /**
     * Initialize new workbook file
     * @param fileName - The file name
     * @param filePath - The file path
     * @param isLoad - The file
     */
    constructor(eventBus: EventBus, fileName?: string, filePath?: string, isLoad?: boolean);
    /**
     * The Workbook Properties
     */
    private bookViews;
    /**
     * Workbook View collection
     */
    private workbookViews;
    /**
     * The Worksheets node
     */
    sheets: Node;
    /**
     * Creates a new sheet in workbook and returns
     * @param {string} rId = The relation Id
     * @param {string} sheetName - The sheet name
     * @returns {SheetFile} - The sheet instance
     */
    createSheet(sheetName?: string): SheetFile;
    /**
     * Update Sheet Name
     * @param sheetName - Sheet Name
     * @param sheetId - Sheet Index
     */
    updateSheetName(sheetName: string, sheetId: number): void;
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<WorkbookFile>}: - The Promise resolving Workbook File
     */
    static load(eventBus: EventBus, content: string, fileName: string, filePath?: string): Promise<WorkbookFile>;
    /**
     * Load file internal
     */
    private loadInternal;
    /**
     * Bind Listeners
     * @param eventBus - Event Bus
     */
    private bindListeners;
    /**
     * Initilize workbook view
     */
    private initializeView;
    /**
     * Add a new sheet
     * @param {SheetFile} sheet - The sheet to add
     */
    private addSheet;
}

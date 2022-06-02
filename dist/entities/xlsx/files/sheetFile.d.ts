import { FileBase } from "../../base/fileBase";
export declare class SheetFile extends FileBase {
    /**
     * Initialize new Sheet file
     * @param id - Sheet Id. Reffered in workbook file.
     * @param name - Sheet Name. Reffered in workbook file.
     */
    constructor(id: number, name: string, isLoad?: boolean);
    /**
     * The Sheet Id. Defined in Workbook file.
     */
    id: number;
    /**
     * The Name of Sheet. Defined in Workbook file.
     */
    name: string;
    /**
     * Get Show Formula attribute value
     */
    /**
    * Set Show Formula attribute value
    */
    showFormula: boolean;
    /**
     * Get Show Grid Lines attribute value
     */
    /**
    * Set Show Grid Lines attribute value
    */
    showGridLines: boolean;
    /**
     * Get Show Row Col Headers attribute value
     */
    /**
    * Set Show Row Col Headers attribute value
    */
    showRowColHeaders: boolean;
    /**
     * Get Show Ruler attribute value
     */
    /**
    * Set Show Ruler attribute value
    */
    showRuler: boolean;
    /**
     * Get Show Zeros attribute value
     */
    /**
    * Set Show Zeros attribute value
    */
    showZeros: boolean;
    /**
     * Get Tab Selected attribute value
     */
    /**
    * Set Tab Selected attribute value
    */
    tabSelected: boolean;
    /**
     * Load a file
     * @param content - File Content
     * @param fileName - File Name
     * @param filePath - File Path
     * @returns {Promise<SheetFile>}: - The Promise resolving Workbook File
     */
    static load(content: string, fileName: string, filePath: string, id: number, name: string): Promise<SheetFile>;
    private sheetViews;
    private sheetView;
    private sheetData;
    private createSheetViews;
    private createSheetView;
    private getSheetViewBoolAttr;
    private setSheetViewBoolAttr;
}

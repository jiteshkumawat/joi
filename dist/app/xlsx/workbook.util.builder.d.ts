import { EventBus } from "../../util/eventBus";
import { WorkbookUtility } from "./workbook.util";
import { FileAdapter } from "../../util/fileHandler";
import { ContentTypes } from "../../entities/files/contentTypes";
/**
 * Builder class for Workbook Utility
 */
export declare class WorkbookUtilityBuilder {
    /**
     * Create default workbook utility
     * @param eventBus - Event Bus
     */
    static default(eventBus: EventBus): WorkbookUtility;
    /**
     * Create a Workbook Utility from existing file
     * @param eventBus - Event bus
     * @param files - File adapter collection
     * @param contentTypes - Content types file
     * @async
     */
    static create(eventBus: EventBus, files: FileAdapter[], contentTypes: ContentTypes): Promise<WorkbookUtility>;
    private static getWorkbookFileAdapter;
    private static loadRelationshipsFile;
    private static loadSharedStringsFile;
    private static loadSheets;
}

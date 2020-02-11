import { WorkbookFile } from "../../entities/xlsx/files/workbookFile";
import { EventBus } from "../../util/eventBus";
import { Sheet } from "./sheet";
import { FileAdapter } from "../../util/fileHandler";
export declare class SheetBuilder {
    static default(workbookFile: WorkbookFile, eventBus: EventBus, name?: string): Sheet;
    static create(file: FileAdapter, eventBus: EventBus, workbookFile: WorkbookFile, id: number, name: string): Promise<Sheet>;
}

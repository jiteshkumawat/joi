import { Xlsx as XlsxClass } from "./xlsx/xlsx.util";
export declare const xlsx: {
    (fileName?: string): XlsxClass;
    load: (file: any, options?: any, fileName?: string, callback?: (xlsxFile: XlsxClass) => any) => Promise<XlsxClass>;
};

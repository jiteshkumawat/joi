import { XlsxBuilder } from "./xlsx/xlsx.util.builder";
import { Xlsx as XlsxClass } from "./xlsx/xlsx.util";

/**
 * Create new Xlsx file
 * @param fileName - The Xlsx File Name
 * @returns {XlsxClass} - The Xlsx File
 */
const _xlsx = (fileName?: string): XlsxClass => {
  return XlsxBuilder.default(fileName);
};

/**
 * Load existing Xlsx file
 * @param file - The JSZip File object
 * @param options - The Options to load JSZip file
 * @param fileName - The File Name to save
 * @param callback - The load complete fallback
 * @returns {Promise<XlsxClass>}
 */
const load = (
  file: any,
  options?: any,
  fileName?: string,
  callback?: Function
): Promise<XlsxClass> => {
  return XlsxClass.load(file, options, fileName, callback);
};

_xlsx.load = load

export const xlsx = _xlsx;

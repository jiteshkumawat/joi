import { Xlsx } from "./xlsx/xlsx.util";
import { XlsxBuilder } from "./xlsx/xlsx.util.builder";

const xlsx = (fileName?: string): Xlsx => {
  return XlsxBuilder.default(fileName);
};

xlsx.load = (
  file: any,
  options?: any,
  fileName?: string,
  callback?: Function
): Promise<Xlsx> => {
  return Xlsx.load(file, options, fileName, callback);
};

export const joi = {
  xlsx: xlsx
};

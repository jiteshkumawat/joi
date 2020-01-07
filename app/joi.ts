import { XlsxBuilder } from "./xlsx/xlsx.util.builder";
import { Xlsx } from "./xlsx/xlsx.util";

const xlsx = (fileName?: string) => {
  return XlsxBuilder.default(fileName);
};

xlsx.load = (
  file: any,
  options?: any,
  fileName?: string,
  callback?: Function
) => {
  return Xlsx.load(file, options, fileName, callback);
};

export const joi = {
  xlsx: xlsx
};

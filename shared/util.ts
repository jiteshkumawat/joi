import { stringify } from "querystring";

/**
 * Utility class with static methods to use
 */
export class Util {
  // /**
  //  * Generate new GUID
  //  * @returns - The GUID value
  //  */
  // public static guid() {
  //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
  //     var r = (Math.random() * 16) | 0,
  //       v = c == "x" ? r : (r & 0x3) | 0x8;
  //     return v.toString(16);
  //   });
  // }

  /**
   * Test if passed value is valid cell
   * @param value - Value to test
   * @returns - True if passed value is valid cell
   */
  public static isCellString(value: string) {
    // Test values having atmost three characters and at most 7 digits starting with non zero
    let isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
    if (isValid) {
      const { column, row, columnNumber } = this.getCellColumnRow(value);
      isValid =
        this.isValidColumnNumber(columnNumber) && this.isValidRowNumber(row);
    }
    return isValid;
  }

  /**
   * Test if passed value is valid cell range string
   * @param value - Value to test
   * @returns - True if passed value is range string
   */
  public static isCellRangeString(value: string) {
    let isValid =
      value.indexOf(":") > 1 &&
      value.lastIndexOf(":") === value.indexOf(":") &&
      value.indexOf(":") < value.length - 2;
    if (isValid) {
      const cells = value.split(":");
      isValid = this.isCellString(cells[0]) && this.isCellString(cells[1]);
    }
    return isValid;
  }

  /**
   * Get the column and row of cell
   * @param value - Cell string representation
   * @returns - The column, row and columnNumber details of passed cell string
   */
  public static getCellColumnRow(value: string) {
    const column = value.match(/^[A-Z]{1,3}/)[0];
    const row = parseInt(value.match(/\d{1,7}$/)[0], 10);
    const letter3 = (column.charCodeAt(2) || 64) - 64;
    const letter2 = (column.charCodeAt(1) || 64) - 64;
    const letter1 = (column.charCodeAt(0) || 64) - 64;
    return {
      column,
      row,
      columnNumber: 676 * letter3 + 26 * letter2 + letter1
    };
  }

  /**
   * Convert column number to alphabetic representation
   * @param value - Column index to convert to string
   * @returns - The string representation of column
   */
  public static toColumnString(value: number) {
    // 'A' char code starts from 65
    return String.fromCharCode(64 + value);
  }

  /**
   * Test if value is valid row number
   * @param {number} value - The row number
   * @returns {boolean} - True if value is valid row
   */
  public static isValidRowNumber(value: number): boolean {
    return value && value > 0 && value <= 1048576;
  }

  /**
   * Test if value is valid column number
   * @param {number} value - The column number
   * @returns {boolean} - True if value is valid column
   */
  public static isValidColumnNumber(value: number): boolean {
    return value && value > 0 && value <= 16384;
  }
}

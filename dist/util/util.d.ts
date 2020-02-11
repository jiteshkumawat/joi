/**
 * Utility class with static methods to use
 */
export declare class Util {
    /**
     * Test if passed value is valid cell
     * @param value - Value to test
     * @returns - True if passed value is valid cell
     */
    static isCellString(value: string): boolean;
    /**
     * Test if passed value is valid cell range string
     * @param value - Value to test
     * @returns - True if passed value is range string
     */
    static isCellRangeString(value: string): boolean;
    /**
     * Get the column and row of cell
     * @param value - Cell string representation
     * @returns - The column, row and columnNumber details of passed cell string
     */
    static getCellColumnRow(value: string): {
        column: string;
        row: number;
        columnNumber: number;
    };
    /**
     * Convert column number to alphabetic representation
     * @param value - Column index to convert to string
     * @returns - The string representation of column
     */
    static toColumnString(value: number): string;
    /**
     * Test if value is valid row number
     * @param {number} value - The row number
     * @returns {boolean} - True if value is valid row
     */
    static isValidRowNumber(value: number): boolean;
    /**
     * Test if value is valid column number
     * @param {number} value - The column number
     * @returns {boolean} - True if value is valid column
     */
    static isValidColumnNumber(value: number): boolean;
}

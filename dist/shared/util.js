"use strict";
exports.__esModule = true;
/**
 * Utility class with static methods to use
 */
var Util = /** @class */ (function () {
    function Util() {
    }
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
    Util.isCellString = function (value) {
        // Test values having atmost three characters and at most 7 digits starting with non zero
        var isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
        if (isValid) {
            var _a = this.getCellColumnRow(value), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
            isValid = columnNumber <= 16384 && row <= 1048576;
        }
        return isValid;
    };
    /**
     * Test if passed value is valid cell range string
     * @param value - Value to test
     * @returns - True if passed value is range string
     */
    Util.isCellRangeString = function (value) {
        var isValid = value.indexOf(":") > 1 &&
            value.lastIndexOf(":") === value.indexOf(":") &&
            value.indexOf(":") < value.length - 2;
        if (isValid) {
            var cells = value.split(":");
            isValid = this.isCellString(cells[0]) && this.isCellString(cells[1]);
        }
        return isValid;
    };
    /**
     * Get the column and row of cell
     * @param value - Cell string representation
     * @returns - The column, row and columnNumber details of passed cell string
     */
    Util.getCellColumnRow = function (value) {
        var column = value.match(/^[A-Z]{1,3}/)[0];
        var row = parseInt(value.match(/\d{1,7}$/)[0], 10);
        var letter3 = (column.charCodeAt(2) || 64) - 64;
        var letter2 = (column.charCodeAt(1) || 64) - 64;
        var letter1 = (column.charCodeAt(0) || 64) - 64;
        return {
            column: column,
            row: row,
            columnNumber: 676 * letter3 + 26 * letter2 + letter1
        };
    };
    /**
     * Convert column number to alphabetic representation
     * @param value - Column index to convert to string
     * @returns - The string representation of column
     */
    Util.toColumnString = function (value) {
        // 'A' char code starts from 65
        return String.fromCharCode(64 + value);
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map
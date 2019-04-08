"use strict";
exports.__esModule = true;
var Util = (function () {
    function Util() {
    }
    Util.isCellString = function (value) {
        var isValid = /^[A-Z]{1,3}[1-9]\d{0,6}$/.test(value);
        if (isValid) {
            var _a = this.getCellColumnRow(value), column = _a.column, row = _a.row, columnNumber = _a.columnNumber;
            isValid = columnNumber <= 16384 && row <= 1048576;
        }
        return isValid;
    };
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
    Util.toColumnString = function (value) {
        return String.fromCharCode(64 + value);
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map
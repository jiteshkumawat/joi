"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var xmlFile_1 = require("../../base/xmlFile");
var xmlRootNode_1 = require("../../base/xmlRootNode");
var xmlNode_1 = require("../../base/xmlNode");
var Sheet = (function (_super) {
    __extends(Sheet, _super);
    function Sheet(index, name) {
        var _this = this;
        index = index || 1;
        _this = _super.call(this, new xmlRootNode_1.XmlRootNode("worksheet", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "sheet" + index + ".xml", "workbook/sheets") || this;
        _this.RId = "rId" + index.toString(10);
        _this.Id = index;
        _this.Name = name || "Sheet" + index.toString(10);
        _this.sheetData = new xmlNode_1.XmlNode("sheetData");
        _this.RootNode.addChild(_this.sheetData);
        return _this;
    }
    return Sheet;
}(xmlFile_1.XmlFile));
exports.Sheet = Sheet;
//# sourceMappingURL=sheet.js.map
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
var xmlFile_1 = require("../base/xmlFile");
var xmlRootNode_1 = require("../base/xmlRootNode");
var xmlNode_1 = require("../base/xmlNode");
var Workbook = (function (_super) {
    __extends(Workbook, _super);
    function Workbook() {
        var _this = _super.call(this, new xmlRootNode_1.XmlRootNode("workbook", "http://schemas.openxmlformats.org/spreadsheetml/2006/main"), "workbook.xml", "workbook") || this;
        _this.Sheets = new xmlNode_1.XmlNode("sheets");
        _this.RootNode.addChild(_this.Sheets);
        return _this;
    }
    return Workbook;
}(xmlFile_1.XmlFile));
exports.Workbook = Workbook;
//# sourceMappingURL=workbook.js.map
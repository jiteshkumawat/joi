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
Object.defineProperty(exports, "__esModule", { value: true });
var xmlNode_1 = require("../../base/xmlNode");
var xmlAttribute_1 = require("../../base/xmlAttribute");
/**
 * The Sheet Data node
 */
var RowNode = /** @class */ (function (_super) {
    __extends(RowNode, _super);
    function RowNode(Index) {
        var _this = _super.call(this, "row", [new xmlAttribute_1.XmlAttribute("r", Index.toString(10))]) || this;
        _this.Index = Index;
        return _this;
    }
    RowNode.prototype.getCell = function (r) {
        return this.children.find(function (cell) { return cell.name === "c" && cell.attribute("r").value === r; });
    };
    RowNode.prototype.addCell = function (r) {
        var cell = this.getCell(r);
        if (!cell) {
            cell = new xmlNode_1.XmlNode("c", [
                new xmlAttribute_1.XmlAttribute("r", r),
                new xmlAttribute_1.XmlAttribute("t", "inlineStr")
            ]);
            this.child(cell);
        }
        return cell;
    };
    return RowNode;
}(xmlNode_1.XmlNode));
exports.RowNode = RowNode;
//# sourceMappingURL=rowNode.js.map
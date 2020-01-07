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
var node_1 = require("../../base/node");
var attribute_1 = require("../../base/attribute");
/**
 * The Sheet Data node
 */
var RowNode = /** @class */ (function (_super) {
    __extends(RowNode, _super);
    /**
     * Creates a new instance of Row in sheet
     * @param index - The row index
     */
    function RowNode(index) {
        var _this = _super.call(this, "row") || this;
        _this.index = index;
        return _this;
    }
    Object.defineProperty(RowNode.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
            this.attribute(new attribute_1.Attribute("r", value.toString()));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets cell by cell index
     * @param r - The cell index
     * @returns {Node} - The nodes array
     */
    RowNode.prototype.getCell = function (r) {
        return this.children.find(function (cell) { return cell.name === "c" && cell.attribute("r").value === r; });
    };
    /**
     * Adds or gets cell by cell index
     * @param r - The cell index
     * @returns {Node} - The cell node
     */
    RowNode.prototype.cell = function (r) {
        var cell = this.getCell(r);
        if (!cell) {
            cell = new node_1.Node("c", [
                new attribute_1.Attribute("r", r),
                new attribute_1.Attribute("t", "inlineStr")
            ]);
            this.child(cell);
        }
        return cell;
    };
    return RowNode;
}(node_1.Node));
exports.RowNode = RowNode;
//# sourceMappingURL=rowNode.js.map
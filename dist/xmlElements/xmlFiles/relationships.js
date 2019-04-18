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
var xmlAttribute_1 = require("../base/xmlAttribute");
var xmlRootNode_1 = require("../base/xmlRootNode");
var xmlNode_1 = require("../base/xmlNode");
/**
 * Define a new relationship file
 */
var Relationships = /** @class */ (function (_super) {
    __extends(Relationships, _super);
    /**
     * Creates new instance of relationship file
     * @param fileName - The file name
     * @param filePath - The file path
     */
    function Relationships(fileName, filePath) {
        var _this = _super.call(this, new xmlRootNode_1.XmlRootNode("Relationships", "http://schemas.openxmlformats.org/package/2006/relationships"), fileName || ".rels", filePath || "_rels") || this;
        _this.Id = 1;
        return _this;
    }
    /**
     * Add new relationship in root node
     * @param target - The target string
     * @param type - The type string
     * @param id - The identity number
     */
    Relationships.prototype.addRelationship = function (target, type, id) {
        if (!id) {
            id = this.Id++;
        }
        var node = new xmlNode_1.XmlNode("Relationship", [
            new xmlAttribute_1.XmlAttribute("Target", target),
            new xmlAttribute_1.XmlAttribute("Type", type),
            new xmlAttribute_1.XmlAttribute("Id", "rId" + id.toString(10))
        ]);
        this.RootNode.child(node);
        return "rId" + id;
    };
    return Relationships;
}(xmlFile_1.XmlFile));
exports.Relationships = Relationships;
//# sourceMappingURL=relationships.js.map
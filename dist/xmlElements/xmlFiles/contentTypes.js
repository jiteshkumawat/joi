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
var xmlFile_1 = require("../base/xmlFile");
var xmlRootNode_1 = require("../base/xmlRootNode");
var xmlNode_1 = require("../base/xmlNode");
var xmlAttribute_1 = require("../base/xmlAttribute");
/**
 * Define a new content types file
 */
var ContentTypes = /** @class */ (function (_super) {
    __extends(ContentTypes, _super);
    /**
     * Creates new instance of content types
     */
    function ContentTypes() {
        return _super.call(this, new xmlRootNode_1.XmlRootNode("Types", "http://schemas.openxmlformats.org/package/2006/content-types"), "[Content_Types].xml") || this;
    }
    /**
     * Add a new default node
     * @param {string} contentType - The content type string
     * @param {string} extension - The extension string
     * @returns {XmlNode} - The default node
     */
    ContentTypes.prototype.addDefault = function (contentType, extension) {
        var defaultNode = new xmlNode_1.XmlNode("Default", [
            new xmlAttribute_1.XmlAttribute("ContentType", contentType),
            new xmlAttribute_1.XmlAttribute("Extension", extension)
        ]);
        this.rootNode.child(defaultNode);
        return defaultNode;
    };
    /**
     * Add a new override node
     * @param {string} contentType - The content type string
     * @param {string} partName - The part name string
     * @returns {XmlNode} - The override node
     */
    ContentTypes.prototype.addOverride = function (contentType, partName) {
        var overrideNode = new xmlNode_1.XmlNode("Override", [
            new xmlAttribute_1.XmlAttribute("ContentType", contentType),
            new xmlAttribute_1.XmlAttribute("PartName", partName)
        ]);
        this.rootNode.child(overrideNode);
        return overrideNode;
    };
    return ContentTypes;
}(xmlFile_1.XmlFile));
exports.ContentTypes = ContentTypes;
//# sourceMappingURL=contentTypes.js.map
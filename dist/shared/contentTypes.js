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
var xmlAttribute_1 = require("../base/xmlAttribute");
var ContentTypes = (function (_super) {
    __extends(ContentTypes, _super);
    function ContentTypes() {
        return _super.call(this, new xmlRootNode_1.XmlRootNode("Types", "http://schemas.openxmlformats.org/package/2006/content-types"), "[Content_Types].xml") || this;
    }
    ContentTypes.prototype.addDefault = function (contentType, extension) {
        var defaultNode = new xmlNode_1.XmlNode("Default", [
            new xmlAttribute_1.XmlAttribute("ContentType", contentType),
            new xmlAttribute_1.XmlAttribute("Extension", extension)
        ]);
        this.RootNode.addChild(defaultNode);
        return defaultNode;
    };
    ContentTypes.prototype.addOverride = function (contentType, partName) {
        var overrideNode = new xmlNode_1.XmlNode("Default", [
            new xmlAttribute_1.XmlAttribute("ContentType", contentType),
            new xmlAttribute_1.XmlAttribute("PartName", partName)
        ]);
        this.RootNode.addChild(overrideNode);
        return overrideNode;
    };
    return ContentTypes;
}(xmlFile_1.XmlFile));
exports.ContentTypes = ContentTypes;
//# sourceMappingURL=contentTypes.js.map